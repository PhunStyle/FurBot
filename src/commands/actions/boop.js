import Promise from 'bluebird';

import { setUserAction } from '../../redis';
import { cleanName } from '../../helpers';


function boop(client, evt) {
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

      const boops = [
        `jumps on ${receivers} and boops them! <:boop:457182422962929676> **boop!**`,
        `walks up to ${receivers} and boops them! <:boop:457182422962929676> **boop!**`,
        `boops ${receivers}! <:boop:457182422962929676> **boop!**`,
        `gives ${receivers} a quick boop~ <:boop:457182422962929676> **boop!**`,
        `sneakily boops ${receivers} <:boop:457182422962929676> **boop!**`,
        `runs around ${receivers} and boops them multiple times! <:boop:457182422962929676> **boop!**`,
        `walks up behind ${receivers}, taps them on the back and the moment they turn around-- <:boop:457182422962929676> **boop!**`,
        `quickly boops ${receivers} on the nose <:boop:457182422962929676> **boop!**`,
        `gives ${receivers} a noseboop! <:boop:457182422962929676> **boop!**`,
        `boops ${receivers} <:boop:457182422962929676> **boop!**`,
        `teasingly boops ${receivers} on the nose <:boop:457182422962929676> **boop!**`,
        `smiles and boops ${receivers}! <:boop:457182422962929676> **boop!**`,
        `softly boops ${receivers} <:boop:457182422962929676> **boop!**`,
        `leans over towards ${receivers} and gives them a couple of boops! <:boop:457182422962929676> **boop!**`,
        `deployed their booping device to boop ${receivers} multiple times! <:boop:457182422962929676> **boop!**`,
        `softly boops ${receivers} on the cheek! <:boop:457182422962929676> **boop!**`
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
