import Promise from 'bluebird';


function prune(client, evt, suffix, lang) {
  if (evt.message.channel.isPrivate) return Promise.resolve('\u2139  |  Use this command in a server!');
  let userPerms = evt.message.author.permissionsFor(evt.message.channel);
  if (evt.message.author.can(userPerms.Text.MANAGE_MESSAGES, evt.message.channel)) {
    var prunePromises = client.Messages.forChannel(evt.message.channel.id);
    Promise.all(prunePromises) // with Promise
    .then(function(messageArray) {
      messageArray.reverse();
      var cleanArray = messageArray.filter(msg => { return msg.deleted === false; });
      var i;
      if (!suffix) suffix = 2;
      if (suffix >= cleanArray.length) suffix = cleanArray.length;
      var maxLength = parseInt(suffix, 10);
      var messageIdArray = [];
      for (i = maxLength - 1; i >= 0; i--) {
        messageIdArray.push(cleanArray[i].id);
      }
      client.Messages.deleteMessages(messageIdArray, evt.message.channel.id);
    });
    return Promise.resolve(evt.message.channel.sendMessage('\u2705  |  Deleted!'));
  }
}

export default {
  delete: prune,
  delet: prune,
  del: prune,
  remove: prune,
  prune
};
