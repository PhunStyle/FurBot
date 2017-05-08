import Promise from 'bluebird';
import nconf from 'nconf';
import R from 'ramda';

function teaminfo(client, evt, suffix, lang, json) {
  let embed = {
    color: 2455143,
    author: {
      name: `FurBot Team Info`,
      icon_url: 'https://cdn.discordapp.com/avatars/174186616422662144/e6b8c266186a60f6b947d1635c09459e.jpg' // eslint-disable-line camelcase
    },
    description: 'Here\'s the list of all the contributors and their roles! If you want to become a contributor and get your name on this list, visit `https://is.gd/bJsswG`',
    fields: [
      { name: '\uD83D\uDD75\uD83C\uDFFC Owner:',
      value: 'Phun#5241',
      inline: true },
      { name: '🐺 Co-programmer:',
      value: 'BR!MSTONE#5403',
      inline: true },
    ]
  };
  return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
}

export const help = {teaminfo: {}};
export default {
  teaminfo,
  team: teaminfo,
  infoteam: teaminfo
};
