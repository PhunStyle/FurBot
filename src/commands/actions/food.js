import Promise from 'bluebird';

import { setUserAction } from '../../redis';
import { cleanName } from '../../helpers';


function feed(client, evt, suffix) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139 Use this command in a server!`});

  let authorName = cleanName(evt.message.author.username);

  let receiverArray = [];
  let receivers = '';

  if (evt.message.mentions.length !== 0) {
    evt.message.mentions.map(user => {
      let receiverName = cleanName(user.username);
      if (user !== evt.message.author && !user.bot) receiverArray.push(`**${receiverName}**`);
    });

    if (receiverArray.length !== 0) {

      if (receiverArray.length <= 2) {
        receivers = receiverArray.join(' and ');
      }

      if (receiverArray.length >= 3) {
        receivers = receiverArray.slice(0, -1).join(', ') + ' and ' + receiverArray[receiverArray.length-1];
      }

      const foods = [
        `gives ${receivers} a delicious \uD83C\uDF4E Mmmm!`,
        `gives ${receivers} a delicious \uD83C\uDF50 Tasty!`,
        `gives ${receivers} a delicious \uD83C\uDF4A Nom!`,
        `gives ${receivers} a delicious \uD83C\uDF4C Nice!`,
        `gives ${receivers} a delicious \uD83C\uDF49 Mmmmm!`,
        `gives ${receivers} a delicious \uD83C\uDF53 Tastes good!`,
        `gives ${receivers} a delicious \uD83C\uDF51 Yum Yum!`,
        `gives ${receivers} some delicious \uD83C\uDF52 Tasty!`,
        `gives ${receivers} a delicious \uD83C\uDF4D Woo!`,
        `shares a \uD83C\uDF54 with ${receivers}`,
        `shares some \uD83C\uDF5F with ${receivers}`,
        `hands ${receivers} some real good \uD83C\uDF2E !`,
        `prepares some tasty \uD83C\uDF63 for ${receivers}!`,
        `feeds ${receivers} some \uD83C\uDF47 like they're royalty!`,
        `has prepared some nice cold \uD83C\uDF68 for ${receivers}!`,
        `stuffs a yummy \uD83C\uDF69 in the mouth(s) of ${receivers}!`,
        `cooks some fine \uD83C\uDF5C for ${receivers}!`,
        `cooks up some \uD83C\uDF72 for ${receivers}!`,
        `has prepared some \uD83C\uDF5D for ${receivers}!`,
        `has made some nice \uD83C\uDF5B for ${receivers}!`,
        `tosses a warm slice of \uD83C\uDF55 to ${receivers}!`,
        `gives ${receivers} a delicious \uD83D\uDC1B ..what? Ew!`,
        `gives ${receivers} a delicious \uD83D\uDC1E ..what? Yuck!`,
        `stuffs a gross, big, crawly \uD83D\uDD77 in the mouth(s) of ${receivers}. Yum!`
      ];

      if (suffix && suffix.split(' ')[0] === 'yum') foods.splice(21, 3);

      const rand = Math.floor(Math.random() * foods.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_foods');
        }
      });

      return Promise.resolve(`**${authorName}** ${foods[rand]}`);
    }
  }
  return Promise.resolve(`**${authorName}** eats all the food themselves... How greedy!! :angry:`);
}

export default {
  feed
};

export const help = {
  feed: { parameters: ['yum', '@User'] }
};
