import Promise from 'bluebird';


function prune(client, evt, suffix, lang) {
  if (evt.message.channel.isPrivate) return Promise.resolve('\u2139  |  Use this command in a server!');

  if (!evt.message.author.permissionsFor(evt.message.channel).Text.MANAGE_MESSAGES) {
    let embed = { color: 16763981, description: `\u26A0  You do not have permissions to manage messages!` };
    return evt.message.channel.sendMessage('', false, embed);
  }

  let messageArray = client.Messages.forChannel(evt.message.channel.id);
  messageArray.reverse();

  let cleanArray = messageArray.filter(msg => { return msg.deleted === false; });

  if (!suffix) suffix = 50;
  if (suffix >= cleanArray.length) suffix = cleanArray.length;
  let maxLength = parseInt(suffix, 10);
  let messageIdArray = [];

  let i;
  for (i = maxLength - 1; i >= 0; i--) {
    messageIdArray.push(cleanArray[i].id);
  }

  client.Messages.deleteMessages(messageIdArray, evt.message.channel.id);

  let embed = { color: 7844437, description: '\u2705  Deleted!' };
  return evt.message.channel.sendMessage('', false, embed)
  .then(message => { setTimeout(() => { message.delete(); }, 10000); });
}

export default {
  delete: prune,
  delet: prune,
  del: prune,
  remove: prune,
  prune
};

export const help = {
  prune: { parameters: 'number' }
};
