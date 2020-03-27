import Promise from 'bluebird';
import Discordie from 'discordie';
import nconf from 'nconf';
import R from 'ramda';

import commands from './commands';
import datadog from './datadog';
import logger from './logger';
import sentry from './sentry';
import startExpress from './express';
import { init as initPhantom } from './phantom';

import { startPortalTimeouts, startPortalIntervals } from './portals';
import {
  getGuildPrefix,
  getGuildCooldown,
  getMessageTTL,
  setMessageTTL,
  getUserLang,
  delGuildSettings,
  subscriber,
  publisher,
  ee
} from './redis';

import { guild_blacklist } from './static';

// Init
let client;
let initialized = false;
let argv = require('minimist')(process.argv.slice(2));

const bot_prefix = nconf.get('PREFIX');

function callCmd(cmd, name, client, evt, suffix) {
  logger.cmd(name, evt, suffix);
  datadog(`cmd.${name}`, 1);

  function processEntry(entry) {
    // If string or number, send as a message
    if (R.is(String, entry) || R.is(Number, entry)) evt.message.channel.sendMessage(entry)
      .catch((err, res) => {
        err.res = res;
        sentry(err, 'discordie.sendMessage');
      });
    // If buffer, send as a file, with a default name
    if (Buffer.isBuffer(entry)) evt.message.channel.uploadFile(entry, 'file.png')
      .catch((err, res) => {
        err.res = res;
        sentry(err, 'discordie.uploadFile');
      });
    // If it's an object that contains key 'upload', send file with an optional file name
    // This works for both uploading local files and buffers
    if (R.is(Object, entry) && entry.upload) evt.message.channel.uploadFile(entry.upload, entry.filename)
      .catch((err, res) => {
        err.res = res;
        sentry(err, 'discordie.uploadFile');
      });
  }

  const user_id = evt.message.author.id;
  const start_time = new Date().getTime();

  let time = nconf.get('MESSAGE_TTL');

  if (!evt.message.channel.isPrivate) {
    getGuildCooldown(evt.message.guild.id).then(guildCooldown => {
      time = guildCooldown;
    });
  }

  getMessageTTL(user_id).then(exists => {
    // If a user is trying to spam messages above the set TTL time, then skip.
    let embed = { color: 15747399, description: `<:redTick:405749796603822080> You must wait \`${exists[1]}\` seconds before using a command again!` };
    if (exists[1] > 0) return evt.message.channel.sendMessage('', false, embed)
    .then(message => { setTimeout(() => { message.delete(); }, 5000); });

    let highCDList = ['blur', 'charcoal', 'flip', 'flop', 'greyscale', 'invert', 'magik', 'oilpaint', 'pixelate', 'pride', 'rotate'];
    let hasHighCD = (highCDList.indexOf(cmd.name) > -1);
    if (hasHighCD) time = time + 20;
    setMessageTTL(user_id, time);

    return getUserLang(user_id).then(lang => {
      const cmd_return = cmd(client, evt, suffix, lang);

      // All command returns must be a bluebird promise.
      if (cmd_return instanceof Promise) {
        return cmd_return.then(res => {
          const execution_time = new Date().getTime() - start_time;
          datadog(`cmd_execution_time.${name}`, execution_time);
          // If null, don't do anything.
          if (!res) return logger.warn(`Command ${name} didn't return anything. Suffix: ${suffix}`);
          // If it's an array, process each entry.
          if (R.is(Array, res)) return R.forEach(processEntry, res);
          // Process single entry
          processEntry(res);
        })
        .catch(err => {
          sentry(err, name);
          let embed = { color: 15747399, description: `<:redTick:405749796603822080> ${err.message}` };
          evt.message.channel.sendMessage('', false, embed);
        });
      }
    });
  })
  .catch(err => {
    sentry(err, name);
  });
}

function onMessage(evt) {
  if (!evt.message) return;
  if (client.User.id === evt.message.author.id) return;
  if (evt.message.author.bot) return;

  if (!evt.message.channel.isPrivate) {
    getGuildPrefix(evt.message.guild.id).then(guildPrefix => {
      guildPrefix = guildPrefix.toLowerCase();
      // Checks for PREFIX
      if (evt.message.content.toLowerCase().startsWith(guildPrefix)) {
        const command = evt.message.content.toLowerCase().split(' ')[0].substring(guildPrefix.length);
        const suffix = evt.message.content.substring(command.length + guildPrefix.length + 1);
        const cmd = commands[command];

        if (cmd) callCmd(cmd, command, client, evt, suffix);
        return;
      }
    });
  }

  if (evt.message.channel.isPrivate) {
    // Checks for PREFIX
    if (evt.message.content.toLowerCase().startsWith(bot_prefix)) {
      const command = evt.message.content.toLowerCase().split(' ')[0].substring(bot_prefix.length);
      const suffix = evt.message.content.substring(command.length + bot_prefix.length + 1);
      const cmd = commands[command];

      if (cmd) callCmd(cmd, command, client, evt, suffix);
      return;
    }
  }

  // Checks if bot was mentioned
  if (client.User.isMentioned(evt.message)) {
    const msg_split = evt.message.content.split(' ');

    // If bot was mentioned without a command, then skip.
    if (!msg_split[1]) return;

    const suffix = R.join(' ', R.slice(2, msg_split.length, msg_split));
    let cmd_name = msg_split[1].toLowerCase();
    if (cmd_name[0] === bot_prefix) cmd_name = cmd_name.slice(1);
    const cmd = commands[cmd_name];

    if (cmd) callCmd(cmd, cmd_name, client, evt, suffix);
    return;
  }

  // Check personal messages
  if (evt.message.channel.isPrivate) {
    // Handle invite links
    if (evt.message.content.indexOf('https://discord.gg/') > -1 || evt.message.content.indexOf('https://discordapp.com/invite/') > -1) {
      return commands.invite(client, evt, evt.message.content);
    }

    const msg_split = evt.message.content.split(' ');
    const suffix = R.join(' ', R.slice(1, msg_split.length, msg_split));
    const cmd_name = msg_split[0].toLowerCase();
    const cmd = commands[cmd_name];

    if (cmd) callCmd(cmd, cmd_name, client, evt, suffix);
    return;
  }
}

function onGuild(evt) {
  if (!evt.guild.becameAvailable) {
    let blacklistCheck = guild_blacklist.includes(evt.guild.id);
    if (blacklistCheck) {
      logger.warn('Leaving Blacklisted Guild');
      evt.guild.generalChannel.sendMessage(':warning: This guild has been blacklisted! Leaving...');
      return Promise.resolve(evt.guild.leave());
    }
  }
}

function onGuildDelete(guild) {
  delGuildSettings(guild.guildId);
  logger.warn('Guild [' + guild.guildId + '] has been deleted. Removing settings...')
}

function connect() {
  if (!nconf.get('TOKEN') || !nconf.get('CLIENT_ID')) {
    logger.error('Please setup TOKEN and CLIENT_ID in config.js to use FurBot');
    process.exit(1);
  }

  client.connect({token: nconf.get('TOKEN')});
}

function forceSetGame() {
  client.User.setGame('f.help | f.info');
}

function forceFetchUsers() {
  logger.info('Force fetching users');
  client.Users.fetchMembers();
  setTimeout(forceSetGame, 60000);
}

if (argv.shardmode && !isNaN(argv.shardid) && !isNaN(argv.shardcount)) {
  ee.on('cmd', message => {
    const { channel_name, instance, request: { cmd, suffix, lang } } = JSON.parse(message);
    if (instance === argv.shardid) return;

    // If this shard isn't ready yet, return empty object.
    if (!client || !client.bot) return publisher.publish(channel_name, JSON.stringify({shard: argv.shardid, results: {}}));

    commands[cmd](client, {}, suffix, lang, true)
      .then(results => {
        publisher.publish(channel_name, JSON.stringify({shard: argv.shardid, results}));
      });
  });
  subscriber.subscribe('cmd');
}

// Start connects to discord and starts receiving messages. It also emits to a shard pub/sub to notifiy it's booted if
export function start() {
  const discordie_options = {};
  if (argv.shardmode && !isNaN(argv.shardid) && !isNaN(argv.shardcount)) {
    discordie_options.messageCacheLimit = 200;
    discordie_options.shardCount = argv.shardcount;
    discordie_options.shardId = argv.shardid;
    logger.info(`Starting shard ${discordie_options.shardId}`);
  }

  client = new Discordie(discordie_options);

  // Listen for events on Discord
  client.Dispatcher.on('GATEWAY_READY', () => {
    logger.success(`Started successfully. Connected to ${client.Guilds.length} servers.`);
    setTimeout(forceFetchUsers, 60000);

    if (!initialized) {
      initialized = true;
      startExpress();
      initPhantom();

      // Only the last shard does portal submissions on boot
      if (argv.shardmode && !isNaN(argv.shardid) && !isNaN(argv.shardcount)) {
        if ((discordie_options.shardId + 1) === discordie_options.shardCount) startPortalTimeouts(client);
      } else {
        startPortalTimeouts(client);
      }

      client.Dispatcher.on('MESSAGE_CREATE', onMessage);
      client.Dispatcher.on('GUILD_CREATE', onGuild);
      client.Dispatcher.on('GUILD_DELETE', onGuildDelete);

      if (argv.shardmode && !isNaN(argv.shardid) && !isNaN(argv.shardcount)) {
        subscriber.subscribe('active_shard');
        publisher.publish('shard_done', discordie_options.shardId);
      }
    }
  });

  client.Dispatcher.on('DISCONNECTED', err => {
    if (err) {
      logger.warn('Disconnected. Attempting to reconnect in 15 seconds...');
      setTimeout(connect, 15000);
    }
  });

  startPortalIntervals(client);
  connect();
}
