import Promise from 'bluebird';
import randomColor from 'randomcolor';
import converter from 'hex2dec';

import { getUserAction } from '../../redis';


function userStatistics(client, evt, suffix) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139  Use this command in a server!`});
  let userToCheck;
  if (!suffix) userToCheck = evt.message.author;
  if (suffix && evt.message.mentions.length >= 0) userToCheck = evt.message.mentions[0];

  getUserAction(userToCheck.id)
  .then(results => {
    if (!results) return Promise.resolve(evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0 No data found for this user :( - Go give them a hug!`}));
    let hexCode = randomColor();
    let cleanHex = hexCode.replace('#', '0x');
    let embedColor = converter.hexToDec(cleanHex);
    let embed = {
      color: embedColor,
      author: {
        name: `Actions ${userToCheck.username}#${userToCheck.discriminator} received`
      },
      description: `These are the actions you've received:\n
      \uD83C\uDF4E **Fed:** ${results.actions_foods || 0}x - <:hug:457179730333007874> **Hugged:** ${results.actions_hugs || 0}x - <:kiss:457179730349654018> **Kissed:** ${results.actions_kisses || 0}x
      <:boop:457182422962929676> **Booped:** ${results.actions_boops || 0}x - <:shoot:457179730525945856> **Shot:** ${results.actions_shots || 0}x - <:dizzy:457184074336043028> **Slapped:** ${results.actions_slaps || 0}x
      <:pet:457178504442806292> **Pet:** ${results.actions_pets || 0}x - <:lick:457179730626478080> **Licked:** ${results.actions_licks || 0}x - <:bite:436215483230846976> **Bitten:** ${results.actions_bites || 0}x
      \ud83d\udc4b **Spanked:** ${results.actions_spanks || 0}x - <:nuzzle:494097741203505152> **Nuzzled:** ${results.actions_nuzzles || 0}x - <:poke:494105957752897537> **Poked:** ${results.actions_pokes || 0}x`
    };
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  });
  return Promise.resolve(true);
}

export default {
  actioninfo: userStatistics
};

export const help = {
  actions: { parameters: '@User' }
};
