import Promise from 'bluebird';

import { setUserAction } from '../../redis';
import { cleanName } from '../../helpers';


function bite(client, evt) {
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

      const bites = [
        `slowly gets closer to ${receivers} and bites them! <:bite:436215483230846976>`,
        `softly nibbles on the ears of ${receivers} <:bite:436215483230846976>`,
        `gently nips ${receivers} <:bite:436215483230846976>`,
        `softly nibbles ${receivers} <:bite:436215483230846976>`,
        `gives ${receivers} a couple of soft bites <:bite:436215483230846976>`,
        `gently nibbles ${receivers} <:bite:436215483230846976>`,
        `bites ${receivers} <:bite:436215483230846976>`,
        `gets all bitey with ${receivers}, run! <:bite:436215483230846976>`,
        `chomps ${receivers}! <:bite:436215483230846976>`,
        `monches on ${receivers} <:bite:436215483230846976>`,
        `munchmunchmunches on ${receivers} <:bite:436215483230846976>`,
        `slides over to ${receivers} and monches them! <:bite:436215483230846976>`,
        `sinks their teeth into ${receivers}! Ouch! <:bite:436215483230846976>`,
        `chases after ${receivers} and bites them! <:bite:436215483230846976>`,
        `pokes ${receivers} and does a soft nibble <:bite:436215483230846976>`,
        `opens wide and chomps ${receivers}.. chomp chomp.. <:bite:436215483230846976>`,
        `surprises ${receivers} with some surprise nibbles! <:bite:436215483230846976>`,
        `monches and cronches ${receivers}.. i swear this is not vore!`,
        `gives ${receivers} a firm neck-bite! <:bite:436215483230846976>`,
        `monches on the ears of ${receivers} softly! <:bite:436215483230846976>`,
        `bites ${receivers} multiple times! <:bite:436215483230846976>`,
        `can't resist to bite ${receivers}! <:bite:436215483230846976>`,
        `bites into their yummy target(s): ${receivers}  <:bite:436215483230846976>`
      ];

      const rand = Math.floor(Math.random() * bites.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_bites');
        }
      });

      return Promise.resolve(`**${authorName}** ${bites[rand]}`);
    }
  }
  return Promise.resolve(`**${authorName}** bites their own arm for no reason. What a weirdo!`);
}

export default {
  bite
};

export const help = {
  bite: { parameters: '@User' }
};
