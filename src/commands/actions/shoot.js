import Promise from 'bluebird';

import { setUserAction } from '../../redis';
import { cleanName } from '../../helpers';


function shoot(client, evt) {
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

      const shoots = [
        `grabs their pistol and empties the chambers at ${receivers}, sayonara! :scream:<:shoot:457179730525945856>`,
        `grabs their pistol and takes aim at ${receivers}, "any last words?!" :scream:<:shoot:457179730525945856>`,
        `holds their pistol and points it at ${receivers}, pulling back the trigger. :scream:<:shoot:457179730525945856>`,
        `fires their <:shoot:457179730525945856> at ${receivers} :scream:<:shoot:457179730525945856>!`,
        `fires their <:shoot:457179730525945856> at ${receivers}, but every shot misses...`,
        `just shot ${receivers} :scream:!`,
        `just shot at ${receivers}, RIP :scream:<:shoot:457179730525945856>`,
        `just shot at ${receivers}, but completely missed...`,
        `takes out their shotgun and pumps ${receivers} full of lead <:shoot:457179730525945856>`,
        `takes out their shotgun but forgot the ammo.. ${receivers} live(s) another day`,
        `grabs their <:shoot:457179730525945856> and shoots ${receivers} dead. Unless they use Apple in which case they are very wet.`,
        `pulls out an AK and rapidly mows down ${receivers}. :skull::urn:`,
        `pulls out their <:shoot:457179730525945856> and fires some rounds into the legs of ${receivers}`,
        `pulls out their MP7 and shoots at ${receivers}. Bloody!`,
        `pulls out their gun but forgot they don't even own a gun... whoops.`,
        `takes aim with their finger and fires some imaginary bullets at ${receivers}`,
        `no-scopes ${receivers} <:shoot:457179730525945856>`,
        `shot ${receivers} with their sniper from a bedroom window <:shoot:457179730525945856>`,
        `hey ${receivers}.. it's high noon <:shoot:457179730525945856>`,
        `just shot ${receivers} in the chest with their pistol <:shoot:457179730525945856>`,
        `just shot ${receivers} THROUGH THE HEART AND YOU'RE TO BLAME. DARLIN' YOU GIVE LOOOOVE A BAD NAME! <:shoot:457179730525945856>`
      ];

      const rand = Math.floor(Math.random() * shoots.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_shots');
        }
      });

      return Promise.resolve(`**${authorName}** ${shoots[rand]}`);
    }
  }
  return evt.message.channel.sendMessage(`**${authorName}** shoots themselves! :dizzy_face:<:shoot:457179730525945856> R.I.P. Press [F] to pay respects.`)
  .then(message => { message.addReaction('\ud83c\uddeb'); });
}

export default {
  shoot
};

export const help = {
  shoot: { parameters: '@User' }
};
