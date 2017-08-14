import Promise from 'bluebird';

import { setUserAction } from '../../redis';


function pet(client, evt) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139  Use this command in a server!`});

  let receiverArray = [];

  if (evt.message.mentions.length !== 0) {
    evt.message.mentions.map(user => {
      if (user !== evt.message.author && !user.bot) receiverArray.push(user.mention);
    });

    if (receiverArray.length !== 0) {
      let receivers = receiverArray.join(' and ');

      const pets = [
        `inches closer to ${receivers} and pets them! \uD83D\uDD90`,
        `softly pets ${receivers}! \uD83D\uDD90 ***petpet!***`,
        `gives soft pets to ${receivers} \uD83D\uDD90`,
        `randomly pets ${receivers}! Woah! \uD83D\uDD90`,
        `reaches out to ${receivers} and gives them a quick few pets \uD83D\uDD90`,
        `petpets ${receivers}, who's a good *<pronoun>*? You are, yes you are! \uD83D\uDD90`,
        `pets ${receivers}! \uD83D\uDD90`,
        `gently applies some pets to ${receivers}'s heads, soft! \uD83D\uDD90'`,
        `gently pets ${receivers}~ \uD83D\uDD90`,
        `walks up to ${receivers} and pets them! \uD83D\uDD90`,
        `softly pets ${receivers}'s chest(s). Fluffy and warm! \uD83D\uDD90`,
        `decides to pet ${receivers}! \uD83D\uDD90`,
        `gives a couple of quick pets to ${receivers}! \uD83D\uDD90`,
        `slides over to ${receivers} and pets them~ \uD83D\uDD90`,
        `rolls over to ${receivers} and gives them some pets and attention \uD83D\uDD90`,
        `gives ${receivers} some caressing pets! \uD83D\uDD90`
      ];

      const rand = Math.floor(Math.random() * pets.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_pets');
        }
      });

      return Promise.resolve(evt.message.author.mention + ` ${pets[rand]}`);
    }
  }
  return Promise.resolve(evt.message.author.mention + ` pets themselves! 'o'`);
}

export default {
  pet
};

export const help = {
  pet: { parameters: '@User' }
};
