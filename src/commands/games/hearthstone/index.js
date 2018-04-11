import Promise from 'bluebird';
import nconf from 'nconf';
import Hearthstone from 'hearthstone-mashape';

import T from '../../../translate';


function cardSearch(client, evt, suffix, lang) {
  if (!nconf.get('MASHAPE_KEY')) return Promise.resolve(T('mashape_setup', lang));
  const HS = Hearthstone(nconf.get('MASHAPE_KEY'));

  if (!suffix) return Promise.resolve(T('hearthstone_usage', lang));

  let card = suffix;

  let options = {
    name: card, // Mandatory
    collectible: 1
  };

  HS.card(options, function(err, data) {
    if (err) {
      let embed = { color: 16763981, description: `\u26A0  Couldn't find this card!` };
      return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
    }

    let flavor = data[0].flavor;
    let mapObj = {
      '<i>': '*',
      '</i>': '*',
      '<b>': '**',
      '</b>': '**'
    };
    flavor = flavor.replace(/<i>|<\/i>|<b>|<\/b>/gi, function(matched) {
      return mapObj[matched];
    });

    let embed = {
      color: 5829119,
      author: {
        name: data[0].name,
        icon_url: 'https://i.imgur.com/ym5okrq.png' // eslint-disable-line camelcase
      },
      description: flavor,
      fields: [
        { name: 'Card Set:',
          value: data[0].cardSet,
          inline: true },
        { name: 'Rarity:',
          value: data[0].rarity,
          inline: true },
        { name: 'Artist:',
          value: data[0].artist,
          inline: true }
      ],
      image: { url: data[0].img }
    };

    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  });
}

export default {
  hearthstone: cardSearch,
  hs: cardSearch
};

export const help = {
  hearthstone: { category: 'games' }
};
