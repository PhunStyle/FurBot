import Promise from 'bluebird';


function prune(client, evt, suffix, lang) {
  if (evt.message.channel.isPrivate) return Promise.resolve('\u2139  |  Use this command in a server!');

  if (!evt.message.author.permissionsFor(evt.message.channel).Text.MANAGE_MESSAGES) {
    let embed = { color: 16763981, description: `\u26A0  You do not have permissions to manage messages!` };
    return evt.message.channel.sendMessage('', false, embed);
  }

  let channel = evt.message.channel;
  channel.fetchMessages().then(() => {
    let messageArray = client.Messages.forChannel(evt.message.channel).filter(msg => !msg.deleted).reverse();

    if (!suffix || isNaN(suffix)) suffix = 10;
    let pruneLength = parseInt(suffix, 10);

    if (pruneLength > 100) pruneLength = 100;
    if (pruneLength <= 0) pruneLength = 10;
    if (pruneLength >= messageArray.length) pruneLength = messageArray.length;

    let pruneArray = messageArray.slice(0, pruneLength);

    client.Messages.deleteMessages(pruneArray);

    let embed = { color: 4437377, description: '<:greenTick:405749911037018125> Deleted!' };
    return evt.message.channel.sendMessage('', false, embed)
    .then(message => { setTimeout(() => { message.delete(); }, 5000); });
  });
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
