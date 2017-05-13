import T from '../../translate';

import { setBlackListChannel, getBlackListChannel, delBlackListChannel } from '../../redis';
import { subCommands as helpText } from '../help';

const patt = new RegExp(/[A-Za-z0-9.,_ ]+/i);

// function setNSFW(client, evt, suffix) {
//   if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139  Use this command in a server!`});
//   let userPerms = evt.message.author.permissionsFor(evt.message.channel);
//   if (evt.message.author.can(userPerms.General.MANAGE_CHANNELS, evt.message.channel)) {
//     return getNSFWChannel(evt.message.channel_id).then(value => {
//       if (value === 'false') {
//         return setNSFWChannel(evt.message.channel_id, 'true')
//         .then(() => evt.message.channel.sendMessage('', false, {color: 7844437, description: `\u2705  NSFW is now **enabled** in this channel!`}));
//       }
//       return setNSFWChannel(evt.message.channel_id, 'false')
//         .then(() => evt.message.channel.sendMessage('', false, {color: 7844437, description: `\u274E  NSFW is now **disabled** in this channel!`}));
//     });
//   }
//   return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  You do not have the "Manage Channels" permission.`});
// }

function setBlackList(client, evt, suffix, lang) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139  Use this command in a server!`});
  let userPerms = evt.message.author.permissionsFor(evt.message.channel);
  if (!suffix) return evt.message.channel.sendMessage(`${T('blacklist_usage')}`);
  if (evt.message.author.can(userPerms.General.MANAGE_CHANNELS, evt.message.channel)) {
    let result = patt.test(suffix);
    if (!result) {
      return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  Can't save this blacklist! (Contains illegal characters).\nSupported characters: \`A-Z | 0-9 | , | _ | .\``});
    }
    if (suffix.length > 300) {
      return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  Can't save this blacklist! (Too long). Maximum length: \`300\``});
    }
    let blacklist = suffix;
    return setBlackListChannel(evt.message.channel_id, blacklist)
    .then(() => evt.message.channel.sendMessage('', false, {color: 7844437, description: `\u2705  You have set a new blacklist for this channel: \`\`\`${suffix}\`\`\``}));
  }
  return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  You do not have the "Manage Channels" permission.`});
}

function getBlackList(client, evt, suffix, lang) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139  Use this command in a server!`});
  return getBlackListChannel(evt.message.channel_id)
  .then(value => evt.message.channel.sendMessage('', false, {color: 7844437, description: `\u2705  This is the current blacklist for this channel:\n\`\`\`${value}\`\`\``}));
}

function addBlackList(client, evt, suffix, lang) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139  Use this command in a server!`});
  let userPerms = evt.message.author.permissionsFor(evt.message.channel);
  if (!suffix) return evt.message.channel.sendMessage(`${T('blacklist_usage_add')}`);
  if (evt.message.author.can(userPerms.General.MANAGE_CHANNELS, evt.message.channel)) {
    return getBlackListChannel(evt.message.channel_id).then(value => {
      let result = patt.test(suffix);
      if (!result) {
        return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  Can't save this blacklist! (Contains illegal characters).\nSupported characters: \`A-Z | 0-9 | , | _ | .\``});
      }
      if (!value) {
        value = '';
      }
      if (value.length > 0) {
        suffix += ', ';
      }
      if (value.length + suffix.length > 300) {
        return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  Can't save this blacklist! (Too long). Maximum length: \`300\``});
      }
      suffix += value;
      let blacklist = suffix;
      return setBlackListChannel(evt.message.channel_id, blacklist)
      .then(() => evt.message.channel.sendMessage('', false, {color: 7844437, description: `\u2705  You have added an item to the blacklist for this channel:\n\`\`\`${suffix}\`\`\``}));
    });
  }
  return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  You do not have the "Manage Channels" permission.`});
}

function delBlackList(client, evt, suffix, lang) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139  Use this command in a server!`});
  let userPerms = evt.message.author.permissionsFor(evt.message.channel);
  if (evt.message.author.can(userPerms.General.MANAGE_CHANNELS, evt.message.channel)) {
    return delBlackListChannel(evt.message.channel_id)
    .then(value => evt.message.channel.sendMessage('', false, {color: 7844437, description: `\u274E  You have deleted the blacklist for this channel.`}));
  }
  return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  You do not have the "Manage Channels" permission.`});
}

export default {
  blacklist: (client, evt, suffix, lang) => {
    const split_suffix = suffix.split(' ');
    const cmd = split_suffix[0];
    split_suffix.shift();
    suffix = split_suffix.join(' ');
    if (cmd === 'set') return setBlackList(client, evt, suffix);
    if (cmd === 'add') return addBlackList(client, evt, suffix);
    if (cmd === 'get') return getBlackList(client, evt, suffix);
    if (cmd === 'del') return delBlackList(client, evt, suffix);
    return helpText(client, evt, 'blacklist', lang);
  }
};

export const help = {
  blacklist: {
    header_text: 'blacklist_header_text',
    subcommands: [
      {name: 'set'},
      {name: 'add'},
      {name: 'get'},
      {name: 'del'}
    ]
  }
};
