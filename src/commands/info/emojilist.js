import Promise from 'bluebird';
import randomColor from 'randomcolor';
import converter from 'hex2dec';

function emojilist(client, evt, suffix) {
  if (evt.message.channel.isPrivate) return Promise.resolve(evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139  Use this command in a server!`}));
  let guild = evt.message.guild;
  guild.fetchEmoji().then(emoji => {
    let emojiArrayFull = [];
    let emojiArrayOne = [];
    let emojiArrayOneString;
    let emojiArrayTwo = [];
    let emojiArrayTwoString;

    let hexCode = randomColor();
    let cleanHex = hexCode.replace('#', '0x');
    let embedColor = converter.hexToDec(cleanHex);

    emoji.map(singleEmoji => {
      let format = '<:';
      if (singleEmoji.animated) { format = '<a:'; }
      emojiArrayFull.push(format + singleEmoji.name + ':' + singleEmoji.id + '>');
    });

    let emojiStringList = emojiArrayFull.join(' ');

    if (emojiStringList.length >= 2000) {
      let numberHalf = Math.ceil(emojiArrayFull.length / 2);
      emojiArrayOne = emojiArrayFull.slice(0, numberHalf);
      emojiArrayTwo = emojiArrayFull.slice(numberHalf, emojiArrayFull.length);
      emojiArrayOneString = emojiArrayOne.join(' ');
      emojiArrayTwoString = emojiArrayTwo.join(' ');
    }

    let embed = {
      color: embedColor,
      author: {
        name: `${evt.message.guild.name}'s Emojis`
      },
      description: emojiStringList
    };

    if (emojiArrayOne.length > 1) {
      embed.description = emojiArrayOneString;
      evt.message.channel.sendMessage('', false, embed);
    }

    if (emojiArrayTwo.length > 1) {
      embed.description = emojiArrayTwoString;
      return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
    }

    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  });
}

export default {
  emojilist
};

export const help = {
  emojilist: {}
};
