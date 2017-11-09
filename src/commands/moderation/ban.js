function ban(client, evt, suffix) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139  Use this command in a server!`});

  if (!evt.message.author.permissionsFor(evt.message.guild).General.BAN_MEMBERS) {
    let embed = { color: 16763981, description: `\u26A0  You do not have permissions to ban members!` };
    return evt.message.channel.sendMessage('', false, embed);
  }

  if (evt.message.mentions.length === 1) {
    let user = evt.message.mentions[0].memberOf(evt.message.guild);
    if (user.id === client.User.id) return;
    user.ban(7).then(() => {
      let embed = { color: 7844437, description: `\u2705  Banned ${user.username}#${user.discriminator}!` };
      evt.message.channel.sendMessage('', false, embed);
    })
    .catch(err => {
      let error = JSON.parse(err.response.error.text);
      let embed = { color: 16763981, description: `\u26A0  Something went wrong: ${error.message}` };
      evt.message.channel.sendMessage('', false, embed);
    });
  }
}

export default {
  ban
};

export const help = {
  ban: { parameters: '@User' }
};
