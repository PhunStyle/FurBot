import Promise from 'bluebird';
import nconf from 'nconf';
import R from 'ramda';
import { toTitleCase } from '../../helpers';


function emojilist(client, evt, suffix) {
  if (evt.message.channel.isPrivate) return Promise.resolve(evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139  Use this command in a server!`}));
  let guild = evt.message.guild;
  guild.fetchEmoji().then(emoji => {
    let emojiArray = [];
    emoji.map(list => {
      emojiArray.push('<:' + list.name + ':' + list.id + '>');
    })
    let emojiOutput = emojiArray.join(' ');

    let embed = {
      color: 3901635,
      author: {
        name: `${evt.message.guild.name}'s Emojis`,
      },
      description: emojiOutput,
    };

    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  })



}

export default {
  emojilist
};

export const help = {
  emojilist: {}
};
