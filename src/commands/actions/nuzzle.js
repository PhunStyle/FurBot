import Promise from 'bluebird';

import { setUserAction } from '../../redis';
import { cleanName } from '../../helpers';


function nuzzle(client, evt) {
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

      const nuzzles = [
        `gets up close to ${receivers} and nuzzles them! <:nuzzle:494097741203505152>`,
        `softly nuzzles ${receivers}! <:nuzzle:494097741203505152>`,
        `nuzzles ${receivers}! <:nuzzle:494097741203505152>`,
        `nuzzles ${receivers} softly! <:nuzzle:494097741203505152>`,
        `nuzzles ${receivers} gently! <:nuzzle:494097741203505152>`,
        `quickly nuzzles ${receivers}! <:nuzzle:494097741203505152>`,
        `sneakily nuzzles ${receivers}! <:nuzzle:494097741203505152>`,
        `slowly nuzzles ${receivers}! <:nuzzle:494097741203505152>`,
        `gets their nose up close to ${receivers} and nuzzles them! <:nuzzle:494097741203505152>`,
        `nuzzles ${receivers} cheek <:nuzzle:494097741203505152>`,
        `nuzzles ${receivers} chest <:nuzzle:494097741203505152>`,
        `softly nuzzles ${receivers} warm and close <:nuzzle:494097741203505152>`,
        `applies soft little nuzzles to ${receivers} <:nuzzle:494097741203505152>`,
        `gets up close to ${receivers} and nuzzles them! <:nuzzle:494097741203505152>`,
        `gets nice and close to ${receivers} for a soft nuzzle <:nuzzle:494097741203505152>`
      ];

      const rand = Math.floor(Math.random() * nuzzles.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_nuzzles');
        }
      });

      return Promise.resolve(`**${authorName}** ${nuzzles[rand]}`);
    }
  }
  return Promise.resolve(`**${authorName}** nuzzles a pillow.. those are also soft.. i guess :c`);
}

export default {
  nuzzle
};

export const help = {
  nuzzle: { parameters: '@User' }
};
