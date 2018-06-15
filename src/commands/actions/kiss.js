import Promise from 'bluebird';

import { setUserAction } from '../../redis';
import { cleanName } from '../../helpers';


function kiss(client, evt) {
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

      const kisses = [
        `jumps on ${receivers} and smooches them! <:kiss:457179730349654018>`,
        `walks up to ${receivers} and kisses them! <:kiss:457179730349654018>`,
        `kisses ${receivers}! <:kiss:457179730349654018>`,
        `gives ${receivers} a quick kiss~ <:kiss:457179730349654018>`,
        `gives ${receivers} a little smooch <:kiss:457179730349654018>`,
        `gives ${receivers} a kiss! <:kiss:457179730349654018>`,
        `smooches ${receivers}! <:kiss:457179730349654018>`,
        `awkwardly kisses ${receivers} <:kiss:457179730349654018>`,
        `gives multiple kisses to ${receivers}! <:kiss:457179730349654018>`,
        `shyly walks up to ${receivers} and gives them a quick kiss~ <:kiss:457179730349654018>`,
        `gives ${receivers} a big smooch! <:kiss:457179730349654018>`,
        `lovingly smooches ${receivers}! <:kiss:457179730349654018>`,
        `happily kisses ${receivers} <:kiss:457179730349654018>`,
        `kisses ${receivers} on the nose <:kiss:457179730349654018>`,
        `smiles and kisses ${receivers}! <:kiss:457179730349654018>`,
        `smiles and gives ${receivers} a little kiss! <:kiss:457179730349654018>`,
        `gladly kisses ${receivers}! <:kiss:457179730349654018>`,
        `blushes and gives ${receivers} a quick kiss! <:kiss:457179730349654018>`,
        `blushes and kisses ${receivers}! <:kiss:457179730349654018>`,
        `completely covers ${receivers} in kisses! <:kiss:457179730349654018>`,
        `hangs some mistletoe over the head of ${receivers} and smooches them <:kiss:457179730349654018>`,
        `shouts "Gimme some sugar baby!" and kisses ${receivers} <:kiss:457179730349654018>`
      ];

      const rand = Math.floor(Math.random() * kisses.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_kisses');
        }
      });

      return Promise.resolve(`**${authorName}** ${kisses[rand]}`);
    }
  }
  return Promise.resolve(`**${authorName}** walks up to a mirror and kisses themselves! How odd..`);
}

export default {
  kiss
};

export const help = {
  kiss: { parameters: '@User' }
};
