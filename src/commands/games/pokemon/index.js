import Promise from 'bluebird';
import didyoumean from 'didyoumean';
import R from 'ramda';
import Pokedex from 'pokedex-promise-v2';

import { poke_list } from '../../../static';
import { toTitleCase } from '../../../helpers';
import T from '../../../translate';


const P = new Pokedex();

// Verify name of a pokemon. If pokemon is not found, do a closest string match to find it.
// If no pokemon can be matched, return the string anyway.
function _verifyName(poke) {
  const poke_reg = poke.toLowerCase();
  if (!poke_list[poke_reg]) {
    const poke_search = didyoumean(poke_reg, R.keys(poke_list));
    if (poke_search) return poke_search;
  }
  return poke_reg;
}

function findPoke(client, evt, suffix, lang) {
  if (!suffix) return Promise.resolve(T('pokemon_usage', lang));

  const poke = suffix;
  const poke_reg = _verifyName(poke);

  var PokePromises = [P.getPokemonByName(poke_reg), P.getPokemonSpeciesByName(poke_reg)];
  evt.message.channel.sendMessage(`\uD83D\uDD0D Searching for ${poke_reg}...`)
  .then(function(message) {
    setTimeout(function() {
      client.Messages.deleteMessage(message.id, evt.message.channel.id);
    }, 5000);
    return Promise.all(PokePromises);
  })
  .then(function(data) {
    let typesArray = [];
    data[0].types.forEach(types => { typesArray.push(types.type.name); });
    let flavorText = data[1].flavor_text_entries[1].flavor_text;
    let embed = {
      color: 13384507,
      author: {
        name: toTitleCase(data[0].name),
        icon_url: 'http://i.imgur.com/M96kSgo.png' // eslint-disable-line camelcase
      },
      url: 'http://bulbapedia.bulbagarden.net/wiki/' + data[0].name, // The url for the title.
      description: flavorText.replace(/\n|\r/g, ' '),
      fields: [
        { name: 'Pokedex ID:',
          value: data[0].id,
          inline: true },
        { name: 'Weight:',
          value: `${data[0].weight / 10} kg`,
          inline: true },
        { name: 'Height:',
          value: `${data[0].height / 10} m`,
          inline: true },
        { name: 'Color:',
          value: toTitleCase(data[1].color.name),
          inline: true },
        { name: 'Shape:',
          value: toTitleCase(data[1].shape.name),
          inline: true },
        { name: 'Type:',
          value: `${toTitleCase(typesArray.join(' | '))}`,
          inline: true },
        { name: 'Speed:',
          value: data[0].stats[0].base_stat,
          inline: true },
        { name: 'SP-Defense:',
          value: data[0].stats[1].base_stat,
          inline: true },
        { name: 'SP-Attack:',
          value: data[0].stats[2].base_stat,
          inline: true },
        { name: 'Defense:',
          value: data[0].stats[3].base_stat,
          inline: true },
        { name: 'Attack:',
          value: data[0].stats[4].base_stat,
          inline: true },
        { name: 'Health:',
          value: data[0].stats[5].base_stat,
          inline: true }
      ],
      image: { url: 'http://www.pokestadium.com/sprites/xy/' + data[0].name + '.gif' }
    };
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  })
  .catch(function(err) {
    if (err) {
      let embed = { color: 16763981, description: `\u26A0  No results for: \`${suffix}\`` };
      return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
    }
  });
}

export default {
  pokemon: findPoke
};

export const help = {
  pokemon: { category: 'games' }
};
