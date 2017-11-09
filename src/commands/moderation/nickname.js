function nickname(client, evt, suffix) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139  Use this command in a server!`});

  if (!evt.message.author.permissionsFor(evt.message.guild).General.MANAGE_NICKNAMES) {
    let embed = { color: 16763981, description: `\u26A0  You do not have permissions to nickname other members!` };
    return evt.message.channel.sendMessage('', false, embed);
  }

  let suffixArray = suffix.split(' ');
  if (suffixArray.length < 2) {
    let embed = { color: 16763981, description: `\u26A0  Something went wrong. Make sure you use the command correctly!` };
    return evt.message.channel.sendMessage('', false, embed);
  }
  let newNick = suffixArray[1];

  if (evt.message.mentions.length === 1) {
    let user = evt.message.mentions[0].memberOf(evt.message.guild);

    user.setNickname(newNick).then(() => {
      let embed = { color: 7844437, description: `\u2705  Set a new nickname for ${user.username}#${user.discriminator}!` };
      return evt.message.channel.sendMessage('', false, embed);
    })
    .catch(err => {
      let error = JSON.parse(err.response.error.text);
      let embed = { color: 16763981, description: `\u26A0  Something went wrong: ${error.message}` };
      return evt.message.channel.sendMessage('', false, embed);
    });
  }
  return;
}

export default {
  nickname
};

export const help = {
  nickname: { parameters: '@User' }
};
