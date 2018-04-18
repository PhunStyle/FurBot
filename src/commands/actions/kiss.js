import Promise from 'bluebird';

import { setUserAction } from '../../redis';


function kiss(client, evt) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139 Use this command in a server!`});

  var chars = { '*': '\\*', _: '\\_', '~': '\\~' };
  let authorName = evt.message.author.username.replace(/[*_~]/g, m => chars[m]);

  let receiverArray = [];

  if (evt.message.mentions.length !== 0) {
    evt.message.mentions.map(user => {
      let receiverName = user.username.replace(/[*_~]/g, m => chars[m]);
      if (user !== evt.message.author && !user.bot) receiverArray.push(`**${receiverName}**`);
    });

    if (receiverArray.length !== 0) {
      let receivers = receiverArray.join(' and ');

      const kisses = [
        `jumps on ${receivers} and smooches them! \uD83D\uDE19`,
        `walks up to ${receivers} and kisses them! \uD83D\uDE19`,
        `kisses ${receivers}! \uD83D\uDE19`,
        `gives ${receivers} a quick kiss~ \uD83D\uDE19`,
        `gives ${receivers} a little smooch \uD83D\uDE19`,
        `gives ${receivers} a kiss! \uD83D\uDE19`,
        `smooches ${receivers}! \uD83D\uDE19`,
        `awkwardly kisses ${receivers} \uD83D\uDE19`,
        `gives multiple kisses to ${receivers}! \uD83D\uDE19`,
        `shyly walks up to ${receivers} and gives them a quick kiss~ \uD83D\uDE19`,
        `gives ${receivers} a big smooch! \uD83D\uDE19`,
        `lovingly smooches ${receivers}! \uD83D\uDE19`,
        `happily kisses ${receivers} \uD83D\uDE19`,
        `kisses ${receivers} on the nose \uD83D\uDE19`,
        `smiles and kisses ${receivers}! \uD83D\uDE19`,
        `smiles and gives ${receivers} a little kiss! \uD83D\uDE19`,
        `gladly kisses ${receivers}! \uD83D\uDE19`,
        `blushes and gives ${receivers} a quick kiss! \uD83D\uDE19`,
        `blushes and kisses ${receivers}! \uD83D\uDE19`,
        `completely covers ${receivers} in kisses! \uD83D\uDE19`,
        `hangs some mistletoe over the heads of ${receivers} and smooches them \uD83D\uDE19`,
        `shouts "Gimme some sugar baby!" and kisses ${receivers} \uD83D\uDE19`
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
