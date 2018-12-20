import Promise from 'bluebird';

import { setUserAction } from '../../redis';
import { cleanName } from '../../helpers';


function pet(client, evt) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139 Use this command in a server!`});

  let authorName = cleanName(evt.message.member.name);

  let receiverArray = [];

  if (evt.message.mentions.length !== 0) {
    evt.message.mentions.map(user => {
      let receiverName = cleanName(user.memberOf(evt.message.guild).name);
      if (user !== evt.message.author && !user.bot) receiverArray.push(`**${receiverName}**`);
    });

    if (receiverArray.length !== 0) {
      let receivers = receiverArray.join(' and ');

      const pets = [
        `inches closer to ${receivers} and pets them! <:pet:457178504442806292>`,
        `softly pets ${receivers}! <:pet:457178504442806292> ***petpet!***`,
        `gives soft pets to ${receivers} <:pet:457178504442806292>`,
        `randomly pets ${receivers}! Woah! <:pet:457178504442806292>`,
        `reaches out to ${receivers} and gives them a quick few pets <:pet:457178504442806292>`,
        `petpets ${receivers}, who's a good pet? You are, yes you are! <:pet:457178504442806292>`,
        `pets ${receivers}! <:pet:457178504442806292>`,
        `gently applies some pets to ${receivers}'s heads, soft! <:pet:457178504442806292>'`,
        `gently pets ${receivers}~ <:pet:457178504442806292>`,
        `walks up to ${receivers} and pets them! <:pet:457178504442806292>`,
        `softly pets ${receivers}'s chest(s). Fluffy and warm! <:pet:457178504442806292>`,
        `decides to pet ${receivers}! <:pet:457178504442806292>`,
        `gives a couple of quick pets to ${receivers}! <:pet:457178504442806292>`,
        `slides over to ${receivers} and pets them~ <:pet:457178504442806292>`,
        `rolls over to ${receivers} and gives them some pets and attention <:pet:457178504442806292>`,
        `gives ${receivers} some caressing pets! <:pet:457178504442806292>`
      ];

      const rand = Math.floor(Math.random() * pets.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_pets');
        }
      });

      return Promise.resolve(`**${authorName}** ${pets[rand]}`);
    }
  }
  return Promise.resolve(`**${authorName}** pets themselves!? 'o'`);
}

export default {
  pet
};

export const help = {
  pet: { parameters: '@User' }
};
