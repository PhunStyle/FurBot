import Promise from 'bluebird';

import { setUserAction } from '../../redis';
import { cleanName } from '../../helpers';


function meow(client, evt) {
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

      const meows = [
        `meows at ${receivers}!`,
        `softly meows into the ears of ${receivers}!`,
        `lets out a few short meows at ${receivers}!`,
        `scoots over to ${receivers} and meows at them!`,
        `meow meows at ${receivers}!`,
        `purrs and meows at ${receivers}!`,
        `pokes ${receivers} and meows at them!`,
        `meows a whole lot at ${receivers}!`,
        `casually meows at ${receivers}!`,
        `tries to get the attention of ${receivers} by meowing!`,
        `meows at ${receivers} from a distance!`,
        `lets out a soft meow at ${receivers}!`,
        `happily meows at ${receivers}!`,
        `meows a couple of times at ${receivers}!`,
        `meows softly at ${receivers}!`,
        `wants attention so they meow at ${receivers}!`,
        `meows once at ${receivers}!`,
        `curls up on top of ${receivers} and meows contently!`,
        `continually meows at ${receivers}!`,
        `doesn't stop meowing at ${receivers}!`,
        `lets out an adorable meow at ${receivers}!`
      ];

      const rand = Math.floor(Math.random() * meows.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_meows');
        }
      });

      return Promise.resolve(`**${authorName}** ${meows[rand]}`);
    }
  }

  const selfmeows = [
    `meows out loud!`,
    `meows for attention!`,
    `meows to make their presence known!`,
    `meows at everyone!`,
    `meows happily!`,
    `meows loudly!`,
    `meows at their mirror image!`,
    `meows at their own tail!`,
    `meows softly!`,
    `meow meow meows!`,
    `meows: OH LONG JOHNSON!`
  ];

  const randself = Math.floor(Math.random() * selfmeows.length);

  return Promise.resolve(`**${authorName}** ${selfmeows[randself]}`);
}

export default {
  meow
};

export const help = {
  meow: { parameters: '@User' }
};
