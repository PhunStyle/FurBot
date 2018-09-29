import Promise from 'bluebird';
import nconf from 'nconf';
import R from 'ramda';

import { getShardsCmdResults } from '../../redis';
import package_file from '../../../package.json';

let argv = require('minimist')(process.argv.slice(2));


function botinfo(client, evt, suffix, lang, json) {
  const server_count = {guilds: client.Guilds.length, channels: client.Channels.length, users: client.Users.length};
  const client_id = nconf.get('CLIENT_ID');
  const bot_version = package_file.version;
  const bot_avatar = client.User.getAvatarURL({format: 'png', size: 256, preferAnimated: false});

  if (argv.shardmode && !isNaN(argv.shardid) && !isNaN(argv.shardcount) && !json) {
    return getShardsCmdResults('servers')
      .then(R.append({results: server_count}))
      .then(R.pluck('results'))
      .filter(results => !R.isEmpty(results))
      .reduce((sum, res) => R.zipObj(R.keys(res), R.map(key => sum[key] + res[key], R.keys(res))))
      .then(res => {
        const uptimeh = Math.floor(process.uptime() / (60 * 60));
        const uptimem = Math.floor(process.uptime() % (60 * 60) / 60);
        const uptimes = Math.floor(process.uptime() % 60);
        let embed = {
          color: 2455143,
          author: {
            name: `FurBot Info`,
            icon_url: bot_avatar // eslint-disable-line camelcase
          },
          description: `Hey there! These are my stats, to see all of my commands use \`${nconf.get('PREFIX')}help\``,
          fields: [
            { name: '\uD83D\uDD75\uD83C\uDFFC Owner:',
              value: 'Phun#0001',
              inline: true },
            { name: '\uD83E\uDD16 Version:',
              value: `FurBot ${bot_version}`,
              inline: true },
            { name: '\uD83D\uDCDA Library:',
              value: 'Discordie^0.11.0',
              inline: true },
            { name: '\uD83D\uDEE1 Guilds:',
              value: `${res.guilds}`,
              inline: true },
            { name: '\uD83D\uDCD4 Channels:',
              value: `${res.channels}`,
              inline: true },
            { name: '\uD83D\uDC65 Users:',
              value: `${res.users}`,
              inline: true },
            { name: '\uD83D\uDCEC Invite:',
              value: `[Click Here](https://discordapp.com/oauth2/authorize?&client_id=${client_id}&scope=bot&permissions=403041495)`,
              inline: true },
            { name: '\uD83D\uDCB5 Patreon:',
              value: `[Click Here](https://www.patreon.com/bePatron?u=5578447)`,
              inline: true },
            { name: '\uD83D\uDEAA FurBot Server:',
              value: `[Click Here](https://discord.gg/H7W49Ps)`,
              inline: true }
          ]
        };
        let embedShard = {
          color: 2455143,
          author: {
            name: `Shard Info`,
            icon_url: bot_avatar // eslint-disable-line camelcase
          },
          fields: [
            { name: '\uD83D\uDEE1 Guilds:',
              value: `${server_count.guilds}`,
              inline: true },
            { name: '\uD83D\uDCD4 Channels:',
              value: `${server_count.channels}`,
              inline: true },
            { name: '\uD83D\uDC65 Users:',
              value: `${server_count.users}`,
              inline: true },
            { name: '\uD83D\uDC8E Shard ID:',
              value: `Shard ${argv.shardid} of ${argv.shardcount}`,
              inline: true },
            { name: '\uD83E\uDD16 Shard Uptime:',
              value: `${uptimeh}h ${uptimem}m ${uptimes}s`,
              inline: true },
            { name: '\u200C',
              value: '\u200C',
              inline: true }
          ]
        };
        Promise.resolve(evt.message.channel.sendMessage('', false, embed));
        return Promise.resolve(evt.message.channel.sendMessage('', false, embedShard));
      });
  }
  if (json) return Promise.resolve(server_count);

  let embedNoShard = {
    color: 2455143,
    author: {
      name: `FurBot Info`,
      icon_url: bot_avatar // eslint-disable-line camelcase
    },
    description: `Hey there! These are my stats, to see all of my commands use \`${nconf.get('PREFIX')}help\``,
    fields: [
      { name: '\uD83D\uDD75\uD83C\uDFFC Owner:',
        value: 'Phun#0001',
        inline: true },
      { name: '\uD83E\uDD16 Version:',
        value: `FurBot ${bot_version}`,
        inline: true },
      { name: '\uD83D\uDCDA Library:',
        value: 'Discordie^0.11.0',
        inline: true },
      { name: '\uD83D\uDEE1 Guilds:',
        value: `${server_count.guilds}`,
        inline: true },
      { name: '\uD83D\uDCD4 Channels:',
        value: `${server_count.channels}`,
        inline: true },
      { name: '\uD83D\uDC65 Users:',
        value: `${server_count.users}`,
        inline: true },
      { name: '\uD83D\uDCEC Invite:',
        value: `[Click Here](https://discordapp.com/oauth2/authorize?&client_id=${client_id}&scope=bot&permissions=403041495)`,
        inline: true },
      { name: '\uD83D\uDCB5 Patreon:',
        value: `[Click Here](https://www.patreon.com/bePatron?u=5578447)`,
        inline: true },
      { name: '\uD83D\uDEAA FurBot Server:',
        value: `[Click Here](https://discord.gg/H7W49Ps)`,
        inline: true }
    ]
  };

  return Promise.resolve(evt.message.channel.sendMessage('', false, embedNoShard));
}

export default {
  info: botinfo,
  servers: botinfo,
  statistics: botinfo
};

// export const help = {info: {}};
