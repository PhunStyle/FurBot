import Promise from 'bluebird';

import { setUserAction } from '../../redis';


function hug(client, evt) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139 Use this command in a server!`});

  let receiverArray = [];

  if (evt.message.mentions.length !== 0) {
    evt.message.mentions.map(user => {
      let guildUser = user.memberOf(evt.message.guild);
      if (user !== evt.message.author && !user.bot) receiverArray.push(guildUser.name);
    });

    if (receiverArray.length !== 0) {
      let receivers = receiverArray.join(' and ');

      const hugs = [
        `jumps on ${receivers} and hugs them tight! :hugging:`,
        `walks up to ${receivers} and gives them a hug! :hugging:`,
        `hugs ${receivers}! :hugging:`,
        `gives ${receivers} a warm hug~ :hugging:`,
        `cozily hugs ${receivers} :hugging:`,
        `shares a loving hug with ${receivers} :heart:!`,
        `wraps their arms around ${receivers} for a long, comfy hug! :hugging:`,
        `warmly hugs ${receivers} :hugging:`,
        `gives ${receivers} a big hug :hugging:`,
        `hugs ${receivers} tight :hugging:`,
        `spreads their arms and locks ${receivers} in a cozy hug! :hugging:`,
        `smiles and hugs ${receivers}! :hugging:`,
        `cuddles ${receivers} :hugging:`,
        `cozily cuddles with ${receivers} :hugging:`,
        `warmly cuddles up to ${receivers} :hugging:`,
        `covers ${receivers} in floof! :hugging:`,
        `soaks up ${receivers} into their fluff to keep them warm :hugging:`,
        `wraps ${receivers} in hundreds of layers of blankets and hugs them :hugging:`,
        `places ${receivers} in front of a warm campfire and hugs them :hugging:`,
        `huddles together with ${receivers} :hugging:`,
        `FREE HUGS FOR ${receivers}!! :hugging:`
      ];

      const rand = Math.floor(Math.random() * hugs.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_hugs');
        }
      });

      return Promise.resolve(evt.message.member.name + ` ${hugs[rand]}`);
    }
  }
  return Promise.resolve(evt.message.member.name + ` hugs themselves! :hugging:`);
}

export default {
  hug
};

export const help = {
  hug: { parameters: '@User' }
};
