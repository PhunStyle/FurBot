import Promise from 'bluebird';

import { setUserAction } from '../../redis';
import { cleanName } from '../../helpers';


function slap(client, evt) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139 Use this command in a server!`});

  let authorName = cleanName(evt.message.member.name);

  let receiverArray = [];
  let receivers = '';

  if (evt.message.mentions.length !== 0) {
    evt.message.mentions.map(user => {
      let receiverName = cleanName(user.memberOf(evt.message.guild).name);
      if (user !== evt.message.author && !user.bot) receiverArray.push(`**${receiverName}**`);
    });

    if (receiverArray.length !== 0) {

      if (receiverArray.length <= 2) {
        receivers = receiverArray.join(' and ');
      }

      if (receiverArray.length >= 3) {
        receivers = receiverArray.slice(0, -1).join(', ') + ' and ' + receiverArray[receiverArray.length-1];
      }

      const slaps = [
        `slaps ${receivers}! <:slap:457184074247700490><:dizzy:457184074336043028>`,
        `smacked ${receivers}! <:slap:457184074247700490><:dizzy:457184074336043028>`,
        `just slapped ${receivers}! <:slap:457184074247700490><:dizzy:457184074336043028>`,
        `walks up to ${receivers} and slaps them in the face <:slap:457184074247700490><:dizzy:457184074336043028>`,
        `bitch slaps ${receivers}! <:slap:457184074247700490><:dizzy:457184074336043028>`,
        `smacks ${receivers} hard, ouch! <:slap:457184074247700490><:dizzy:457184074336043028>`,
        `beats some sense into ${receivers} <:slap:457184074247700490><:dizzy:457184074336043028>`,
        `sends out slaps to ${receivers} <:slap:457184074247700490><:dizzy:457184074336043028>`,
        `slaps ${receivers} hard, leaving a red mark! <:slap:457184074247700490><:dizzy:457184074336043028>`,
        `slappity slap slap slaps ${receivers} <:slap:457184074247700490><:dizzy:457184074336043028>`,
        `gives ${receivers} a real good slappin'! <:slap:457184074247700490><:dizzy:457184074336043028>`,
        `whacks ${receivers} real good! <:slap:457184074247700490><:dizzy:457184074336043028>`,
        `do the slappy to ${receivers} <:slap:457184074247700490><:dizzy:457184074336043028>`,
        `starts a SLAP FIGHT! ${receivers}, get ready to get SLAPPED! <:slap:457184074247700490><:dizzy:457184074336043028>`
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
