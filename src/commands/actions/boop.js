import Promise from 'bluebird';

import { setUserAction } from '../../redis';


function boop(client, evt) {
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

      const boops = [
        `jumps on ${receivers} and boops them! \uD83D\uDC49 **boop!**`,
        `walks up to ${receivers} and boops them! \uD83D\uDC49 **boop!**`,
        `boops ${receivers}! \uD83D\uDC49 **boop!**`,
        `gives ${receivers} a quick boop~ \uD83D\uDC49 **boop!**`,
        `sneakily boops ${receivers} \uD83D\uDC49 **boop!**`,
        `runs around ${receivers} and boops them multiple times! \uD83D\uDC49 **boop!**`,
        `walks up behind ${receivers}, taps them on the back and the moment they turn around-- \uD83D\uDC49 **boop!**`,
        `quickly boops ${receivers} on the nose \uD83D\uDC49 **boop!**`,
        `gives ${receivers} a noseboop! \uD83D\uDC49 **boop!**`,
        `boops ${receivers} \uD83D\uDC49 **boop!**`,
        `teasingly boops ${receivers} on the nose \uD83D\uDC49 **boop!**`,
        `smiles and boops ${receivers}! \uD83D\uDC49 **boop!**`,
        `softly boops ${receivers} \uD83D\uDC49 **boop!**`
      ];

      const rand = Math.floor(Math.random() * boops.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_boops');
        }
      });

      return Promise.resolve(`**${authorName}** ${boops[rand]}`);
    }
  }
  return Promise.resolve(`**${authorName}** boops themselves! 'o'`);
}

export default {
  boop
};

export const help = {
  boop: { parameters: '@User' }
};
