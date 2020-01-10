import Promise from 'bluebird';

import { setUserAction } from '../../redis';
import { cleanName } from '../../helpers';


function poke(client, evt) {
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

      const pokes = [
        `sneaks up behind ${receivers} and pokes them! <:poke:494105957752897537>`,
        `secretly pokes ${receivers} <:poke:494105957752897537>`,
        `pokes ${receivers} in their sides! <:poke:494105957752897537>`,
        `walks up to ${receivers} and gives em a poke <:poke:494105957752897537>`,
        `pokes ${receivers}.. then pokes them again! <:poke:494105957752897537>`,
        `quickly pokes ${receivers}! <:poke:494105957752897537>`,
        `pokepokepokes ${receivers}! <:poke:494105957752897537>`,
        `leans over to ${receivers} and gives 'em a little poke! <:poke:494105957752897537>`,
        `pokes ${receivers} with a stick.. mm, pointy! <:poke:494105957752897537>`,
        `almost pokes ${receivers} in the eye but manages to recover! <:poke:494105957752897537>`,
        `softly pokes ${receivers} in their tum <:poke:494105957752897537>`,
        `pokes ${receivers} in the neck! <:poke:494105957752897537>`,
        `pokes ${receivers} on their shoulder, hewwo? <:poke:494105957752897537>`,
        `pokes ${receivers} on the cheek, but which cheek.. <:poke:494105957752897537>`,
        `sticks out their arm and rapidly pokes their target(s): ${receivers} !!! <:poke:494105957752897537>`,
        `pokes ${receivers} a couple of times.. hey wake up! <:poke:494105957752897537>`,
        `pokes ${receivers} with a random carrot they found on the sidewalk! <:poke:494105957752897537>`,
        `pokes ${receivers} with beans.. BEANS!!! <:poke:494105957752897537>`
      ];

      const rand = Math.floor(Math.random() * pokes.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_pokes');
        }
      });

      return Promise.resolve(`**${authorName}** ${pokes[rand]}`);
    }
  }
  return Promise.resolve(`**${authorName}** pokes their own face. <:poke:494105957752897537>`);
}

export default {
  poke
};

export const help = {
  poke: { parameters: '@User' }
};
