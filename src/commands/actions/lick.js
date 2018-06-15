import Promise from 'bluebird';

import { setUserAction } from '../../redis';
import { cleanName } from '../../helpers';


function lick(client, evt) {
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

      const licks = [
        `gets up close to ${receivers} and licks them! \ud83d\udc45`,
        `softly licks ${receivers}! <:lick:457179730626478080>`,
        `licks ${receivers}! \ud83d\udc45`,
        `sticks out their tongue and licks ${receivers}! <:lick:457179730626478080>`,
        `slowly licks ${receivers}! \ud83d\udc45`,
        `licklicklicks ${receivers}! <:lick:457179730626478080>`,
        `puts their tongue on ${receivers} and gives them some licks! \ud83d\udc45`,
        `applies their tongue to ${receivers}! <:lick:457179730626478080>`,
        `gives a lick to ${receivers}! \ud83d\udc45`,
        `licks ${receivers}'s cheek! <:lick:457179730626478080>`,
        `licks ${receivers}'s nose! \ud83d\udc45`,
        `gives ${receivers} some soft licks! <:lick:457179730626478080>`,
        `slurp-licks ${receivers} <:lick:457179730626478080>`,
        `applies wet sloppy licks to ${receivers}.. ew, you're all wet! <:lick:457179730626478080>`
      ];

      const rand = Math.floor(Math.random() * licks.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_licks');
        }
      });

      return Promise.resolve(`**${authorName}** ${licks[rand]}`);
    }
  }
  return Promise.resolve(`**${authorName}** tries to lick their own elbows.. that looks kinda stupid :l`);
}

export default {
  lick
};

export const help = {
  lick: { parameters: '@User' }
};
