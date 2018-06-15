import Promise from 'bluebird';

import { setUserAction } from '../../redis';
import { cleanName } from '../../helpers';


function hug(client, evt) {
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

      const hugs = [
        `jumps on ${receivers} and hugs them tight! <:hug:457179730333007874>`,
        `walks up to ${receivers} and gives them a hug! <:hug:457179730333007874>`,
        `hugs ${receivers}! <:hug:457179730333007874>`,
        `gives ${receivers} a warm hug~ <:hug:457179730333007874>`,
        `cozily hugs ${receivers} <:hug:457179730333007874>`,
        `shares a loving hug with ${receivers} :heart:!`,
        `wraps their arms around ${receivers} for a long, comfy hug! <:hug:457179730333007874>`,
        `warmly hugs ${receivers} <:hug:457179730333007874>`,
        `gives ${receivers} a big hug <:hug:457179730333007874>`,
        `hugs ${receivers} tight <:hug:457179730333007874>`,
        `spreads their arms and locks ${receivers} in a cozy hug! <:hug:457179730333007874>`,
        `smiles and hugs ${receivers}! <:hug:457179730333007874>`,
        `cuddles ${receivers} <:hug:457179730333007874>`,
        `cozily cuddles with ${receivers} <:hug:457179730333007874>`,
        `warmly cuddles up to ${receivers} <:hug:457179730333007874>`,
        `covers ${receivers} in floof! <:hug:457179730333007874>`,
        `soaks up ${receivers} into their fluff to keep them warm <:hug:457179730333007874>`,
        `wraps ${receivers} in hundreds of layers of blankets and hugs them <:hug:457179730333007874>`,
        `places ${receivers} in front of a warm campfire and hugs them <:hug:457179730333007874>`,
        `huddles together with ${receivers} <:hug:457179730333007874>`,
        `FREE HUGS FOR ${receivers}!! <:hug:457179730333007874>`
      ];

      const rand = Math.floor(Math.random() * hugs.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_hugs');
        }
      });

      return Promise.resolve(`**${authorName}** ${hugs[rand]}`);
    }
  }
  return Promise.resolve(`**${authorName}** hugs themselves! <:hug:457179730333007874>`);
}

export default {
  hug
};

export const help = {
  hug: { parameters: '@User' }
};
