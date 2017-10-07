import Promise from 'bluebird';
import randomColor from 'randomcolor';
import converter from 'hex2dec';


function avatar(client, evt, suffix) {
  if (!suffix && !evt.message.mentions.length) {
    if (!evt.message.author.avatarURL) {
      let embed = { color: 16763981, description: `\u26A0  You are naked` };
      return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
    }
    let hexCode = randomColor();
    let cleanHex = hexCode.replace('#', '0x');
    let embedColor = converter.hexToDec(cleanHex);
    let embed = {
      color: embedColor,
      author: {
        name: evt.message.author.username + '\'s Avatar'
      },
      image: { url: evt.message.author.getAvatarURL({format: 'png', size: 2048, preferAnimated: true}) }
    };
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  } else if (evt.message.mentions.length) {
    return Promise.resolve(evt.message.mentions)
      .map(user => {
        if (!user.avatarURL) {
          let embed = { color: 16763981, description: `\u26A0  ${user.username} is naked` };
          return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
        }
        let hexCode = randomColor();
        let cleanHex = hexCode.replace('#', '0x');
        let embedColor = converter.hexToDec(cleanHex);
        let embed = {
          color: embedColor,
          author: {
            name: user.username + '\'s Avatar'
          },
          image: { url: user.getAvatarURL({format: 'png', size: 2048, preferAnimated: true}) }
        };
        return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
      });
  }
}

export default {
  avatar
};

export const help = {
  avatar: { parameters: '@User' }
};
