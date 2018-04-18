import Promise from 'bluebird';

import { setUserAction } from '../../redis';


function slap(client, evt) {
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

      const slaps = [
        `slaps ${receivers}! \ud83d\ude35\ud83d\udc4a`,
        `smacked ${receivers}! \ud83d\ude35\ud83d\udc4a`,
        `just slapped ${receivers}! \ud83d\ude35\ud83d\udc4a`,
        `walks up to ${receivers} and slaps them in the face \ud83d\ude35\ud83d\udc4a`,
        `bitch slaps ${receivers}! \ud83d\ude35\ud83d\udc4a`,
        `smacks ${receivers} hard, ouch! \ud83d\ude35\ud83d\udc4a`,
        `beats some sense into ${receivers} \ud83d\ude35\ud83d\udc4a`,
        `sends out slaps to ${receivers} \ud83d\ude35\ud83d\udc4a`,
        `slaps ${receivers} hard, leaving a red mark! \ud83d\ude35\ud83d\udc4a`,
        `slappity slap slap slaps ${receivers} \ud83d\ude35\ud83d\udc4a`,
        `gives ${receivers} a real good slappin'! \ud83d\ude35\ud83d\udc4a`,
        `whacks ${receivers} real good! \ud83d\ude35\ud83d\udc4a`,
        `do the slappy to ${receivers} \ud83d\ude35\ud83d\udc4a`,
        `starts a SLAP FIGHT! ${receivers}, get ready to get SLAPPED! \ud83d\ude35\ud83d\udc4a`
      ];

      const rand = Math.floor(Math.random() * slaps.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_slaps');
        }
      });

      return Promise.resolve(`**${authorName}** ${slaps[rand]}`);
    }
  }
  return Promise.resolve(`**${authorName}** slaps themselves..?`);
}

export default {
  slap
};

export const help = {
  slap: { parameters: '@User' }
};
