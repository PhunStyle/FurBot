import Promise from 'bluebird';

import { setUserAction } from '../../redis';


function shoot(client, evt) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139  Use this command in a server!`});

  let receiverArray = [];

  if (evt.message.mentions.length !== 0) {
    evt.message.mentions.map(user => {
      if (user !== evt.message.author && !user.bot) receiverArray.push(user.mention);
    });

    if (receiverArray.length !== 0) {
      let receivers = receiverArray.join(' and ');

      const shoots = [
        `grabs their pistol and empties the chambers at ${receivers}, sayonara! :scream::gun:`,
        `grabs their pistol and takes aim at ${receivers}, "any last words?!" :scream::gun:`,
        `holds their pistol and points it at ${receivers}, pulling back the trigger. :scream::gun:`,
        `fires their :gun: at ${receivers} :scream::gun:!`,
        `fires their :gun: at ${receivers}, but every shot misses...`,
        `just shot ${receivers} :scream:!`,
        `just shot at ${receivers}, RIP :scream::gun:`,
        `just shot at ${receivers}, but completely missed...`,
        `takes out their shotgun and pumps ${receivers} full of lead :gun:`,
        `takes out their shotgun but forgot the ammo.. ${receivers} live(s) another day`,
        `grabs their :gun: and shoots ${receivers} dead. Unless they use Apple in which case they are very wet.`,
        `pulls out an AK and rapidly mows down ${receivers}. :skull::urn:`,
        `pulls out their :gun: and fires some rounds into the legs of ${receivers}`,
        `pulls out their MP7 and shoots at ${receivers}. Bloody!`,
        `pulls out their gun but forgot they don't even own a gun... whoops.`,
        `takes aim with their finger and fires some imaginary bullets at ${receivers}`
      ];

      const rand = Math.floor(Math.random() * shoots.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_shots');
        }
      });

      return Promise.resolve(evt.message.author.mention + ` ${shoots[rand]}`);
    }
  }
  return Promise.resolve(evt.message.author.mention + ` shoots themselves! :dizzy_face::gun: R.I.P. Press [F] to pay respects.`);
}

export default {
  shoot
};

export const help = {
  shoot: { parameters: '@User' }
};
