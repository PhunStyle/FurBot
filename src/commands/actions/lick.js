import Promise from 'bluebird';

import { setUserAction } from '../../redis';


function lick(client, evt) {
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

      const licks = [
        `gets up close to ${receivers} and licks them! \ud83d\udc45`,
        `softly licks ${receivers}! \ud83d\ude1d`,
        `licks ${receivers}! \ud83d\udc45`,
        `sticks out their tongue and licks ${receivers}! \ud83d\ude1d`,
        `slowly licks ${receivers}! \ud83d\udc45`,
        `licklicklicks ${receivers}! \ud83d\ude1d`,
        `puts their tongue on ${receivers} and gives them some licks! \ud83d\udc45`,
        `applies their tongue to ${receivers}! \ud83d\ude1d`,
        `gives a lick to ${receivers}! \ud83d\udc45`,
        `licks ${receivers}'s cheek! \ud83d\ude1d`,
        `licks ${receivers}'s nose! \ud83d\udc45`,
        `gives ${receivers} some soft licks! \ud83d\ude1d`,
        `slurp-licks ${receivers} \ud83d\ude1d`,
        `applies wet sloppy licks to ${receivers}.. ew, you're all wet! \ud83d\ude1d`
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
