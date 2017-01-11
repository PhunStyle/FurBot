import R from 'ramda';

import { setNSFWChannel, getNSFWChannel } from '../../redis';

function setNSFW(client, evt, suffix) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage(`\u2139  |  Use this command in a server!`);
  let userPerms = evt.message.author.permissionsFor(evt.message.channel);
  if (evt.message.author.can(userPerms.General.MANAGE_CHANNELS, evt.message.channel)) {
    return getNSFWChannel(evt.message.channel_id).then(value => {
      if (value === 'false') {
        return setNSFWChannel(evt.message.channel_id, 'true')
        .then(() => `\u2705  |  NSFW is now **enabled** in this channel!`);
      }
      return setNSFWChannel(evt.message.channel_id, 'false')
         .then(() => `\u274E  |  NSFW is now **disabled** in this channel!`);
    })
  }
  return evt.message.channel.sendMessage(`\u26A0  |  You do not have the "Manage Channels" permission.`);
}

export default {
  setnsfw: setNSFW,
  'set-nsfw': setNSFW
};
