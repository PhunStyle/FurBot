import Promise from 'bluebird';

import { setUserAction } from '../../redis';
import { cleanName } from '../../helpers';


function bark(client, evt) {
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

      const barks = [
        `barks at ${receivers}!`,
        `yips at ${receivers}!`,
        `lets out a few barks at ${receivers}!`,
        `scoots over to ${receivers} and barks at them!`,
        `bark bark barks at ${receivers}!`,
        `yaps and barks at ${receivers}!`,
        `pokes ${receivers} and barks at them!`,
        `barks loudly at ${receivers}!`,
        `barks a whole lot at ${receivers}!`,
        `casually barks at ${receivers}!`,
        `tries to get the attention of ${receivers} by barking at them!`,
        `barks at ${receivers} from a distance!`,
        `lets out a sharp bark at ${receivers}!`,
        `happily barks at ${receivers}!`,
        `barks a couple of times at ${receivers}!`,
        `boofs at ${receivers}!`,
        `wants attention so they bark at ${receivers}!`,
        `barks once at ${receivers}!`,
        `runs towards ${receivers}, barking the whole way!`,
        `continually barks at ${receivers}!`,
        `doesn't stop barking at ${receivers}!`
      ];

      const rand = Math.floor(Math.random() * barks.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_barks');
        }
      });

      return Promise.resolve(`**${authorName}** ${barks[rand]}`);
    }
  }

  const selfbarks = [
    `barks out loud!`,
    `barks for attention!`,
    `barks to make their presence known!`,
    `barks at everyone!`,
    `barks happily!`,
    `barks loudly!`,
    `barks at their mirror image!`,
    `barks at their own tail!`,
    `barks softly!`,
    `barks up the wrong tree!`
  ];

  const randself = Math.floor(Math.random() * selfbarks.length);

  return Promise.resolve(`**${authorName}** ${selfbarks[randself]}`);
}

export default {
  bark
};

export const help = {
  bark: { parameters: '@User' }
};
