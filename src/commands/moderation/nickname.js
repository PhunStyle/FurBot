function nickname(client, evt, suffix) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139  Use this command in a server!`});

  let self = false;
  let newNick;

  if (evt.message.mentions.length === 0) {
    self = true;
    newNick = suffix;
  }

  if (evt.message.mentions.length === 1 && evt.message.mentions[0].id === evt.message.author.id) {
    self = true;
    let suffixArray = suffix.split(' ');
    suffixArray.shift();
    newNick = suffixArray.join(' ');
  }

  if (evt.message.mentions.length === 1 && evt.message.mentions[0].id !== evt.message.author.id) {
    let suffixArray = suffix.split(' ');
    suffixArray.shift();
    newNick = suffixArray.join(' ');
  }

  if (self) {
    if (!evt.message.author.permissionsFor(evt.message.guild).General.CHANGE_NICKNAME) {
      let embed = { color: 16763981, description: `\u26A0  You do not have permissions to change your nickname on this server!` };
      return evt.message.channel.sendMessage('', false, embed)
      .then(message => { setTimeout(() => { message.delete(); }, 10000); });
    }
    let user = evt.message.author.memberOf(evt.message.guild);
    user.setNickname(newNick).then(() => {
      let embed = { color: 7844437, description: `\u2705  Set a new nickname for ${user.username}#${user.discriminator}!` };
      return evt.message.channel.sendMessage('', false, embed)
      .then(message => { setTimeout(() => { message.delete(); }, 10000); });
    })
    .catch(err => {
      let error = JSON.parse(err.response.error.text);
      let embed = { color: 16763981, description: `\u26A0  Something went wrong: ${error.message}` };
      return evt.message.channel.sendMessage('', false, embed);
    });
  }

  if (!self) {
    if (!evt.message.author.permissionsFor(evt.message.guild).General.MANAGE_NICKNAMES) {
      let embed = { color: 16763981, description: `\u26A0  You do not have permissions to nickname other members!` };
      return evt.message.channel.sendMessage('', false, embed)
      .then(message => { setTimeout(() => { message.delete(); }, 10000); });
    }
    let user = evt.message.mentions[0].memberOf(evt.message.guild);

    user.setNickname(newNick).then(() => {
      let embed = { color: 7844437, description: `\u2705  Set a new nickname for ${user.username}#${user.discriminator}!` };
      return evt.message.channel.sendMessage('', false, embed)
      .then(message => { setTimeout(() => { message.delete(); }, 10000); });
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
  nickname: {
    parameters: ['nickname', 'or', '@User nickname']
  }
};
