import Promise from 'bluebird';

import { setUserAction } from '../../redis';


function feed(client, evt, suffix) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139 Use this command in a server!`});

    let authorName = evt.message.member.name;
  if (authorName === '@everyone' || authorName === '@here') authorName = 'Real Funny Person';
  let receiverArray = [];

  if (evt.message.mentions.length !== 0) {
    evt.message.mentions.map(user => {
      let guildUser = user.memberOf(evt.message.guild);
      if (user !== evt.message.author && !user.bot && guildUser.name !== '@everyone' && guildUser.name !== '@here') receiverArray.push(guildUser.name);
    });

    if (receiverArray.length !== 0) {
      let receivers = receiverArray.join(' and ');

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
        `cooks some fine \uD83C\uDF5C for ${receivers}!`,
        `cooks up some \uD83C\uDF72 for ${receivers}!`,
        `has prepared some \uD83C\uDF5D for ${receivers}!`,
        `has made some nice \uD83C\uDF5B for ${receivers}!`,
        `tosses a warm slice of \uD83C\uDF55 to ${receivers}!`,
        `gives ${receivers} a delicious \uD83D\uDC1B ..what? Ew!`,
        `gives ${receivers} a delicious \uD83D\uDC1E ..what? Yuck!`,
        `stuffs a gross, big, crawly \uD83D\uDD77 in the mouth(s) of ${receivers}. Yum!`
      ];

      if (suffix && suffix.split(' ')[0] === 'yum') foods.splice(18, 3);

      const rand = Math.floor(Math.random() * foods.length);

      let action;

      switch (rand) {
        case 0:
          action = 'actions_foods_apple';
          break;
        case 1:
          action = 'actions_foods_pear';
          break;
        case 2:
          action = 'actions_foods_tangerine';
          break;
        case 3:
          action = 'actions_foods_banana';
          break;
        case 4:
          action = 'actions_foods_watermelon';
          break;
        case 5:
          action = 'actions_foods_strawberry';
          break;
        case 6:
          action = 'actions_foods_peach';
          break;
        case 7:
          action = 'actions_foods_cherry';
          break;
        case 8:
          action = 'actions_foods_pineapple';
          break;
        case 9:
          action = 'actions_foods_hamburger';
          break;
        case 10:
          action = 'actions_foods_fries';
          break;
        case 11:
          action = 'actions_foods_taco';
          break;
        case 12:
          action = 'actions_foods_sushi';
          break;
        case 13:
          action = 'actions_foods_ramen';
          break;
        case 14:
          action = 'actions_foods_stew';
          break;
        case 15:
          action = 'actions_foods_spaghetti';
          break;
        case 16:
          action = 'actions_foods_curry';
          break;
        case 17:
          action = 'actions_foods_pizza';
          break;
        case 18:
          action = 'actions_foods_bug';
          break;
        case 19:
          action = 'actions_foods_beetle';
          break;
        case 20:
          action = 'actions_foods_spider';
          break;
      }

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, action);
        }
      });

      return Promise.resolve(authorName + ` ${foods[rand]}`);
    }
  }
  return Promise.resolve(authorName + ` eats all the food themselves! How greedy! :angry:`);
}

export default {
  feed
};

export const help = {
  feed: { parameters: '@User' }
};
