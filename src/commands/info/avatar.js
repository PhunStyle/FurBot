import Promise from 'bluebird';
import R from 'ramda';


function avatar(client, evt, suffix) {
  if (!suffix && !evt.message.mentions.length) {
    if (!evt.message.author.avatarURL) return Promise.resolve(`\u26A0  |  You are naked`);
    return Promise.resolve(`Your avatar:\n${evt.message.author.avatarURL}`);
  } else if (evt.message.mentions.length) {
    return Promise.resolve(evt.message.mentions)
      .map(user => {
        if (!user.avatarURL) return `\u26A0  |  ${user.username} is naked.`;
        return `${user.username}'s avatar:\n${user.avatarURL}`;
      });
  }

  if (evt.message.channel.isPrivate) return Promise.resolve(`\u2139  |  Use this command in a server!`);
  const user = R.find(R.propEq('username', suffix))(evt.message.guild.members);
  if (!user) return;
  if (!user.avatarURL) return Promise.resolve(`\u26A0  |  ${user.username} is naked.`);
  return Promise.resolve(`${user.username}'s avatar:\n${user.avatarURL}`);
}

export const help = {
  avatar: {parameters: ['username']}
};

export default {
  avatar
};
