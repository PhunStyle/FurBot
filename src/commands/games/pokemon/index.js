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
  let poke_reg = poke.toLowerCase();
  if (!poke_list[poke_reg]) {
    let poke_search = didyoumean(poke_reg, R.keys(poke_list));
    if (poke_search) return poke_search;
  }
  return poke_reg;
}

async function findPoke(client, evt, suffix, lang) {
  if (!suffix) return T('pokemon_usage', lang);
  const poke_reg = _verifyName(suffix);
  const poke_reg_species = poke_reg.includes('-') ? poke_reg.split('-')[0] : poke_reg;

  const searchingMessage = await evt.message.channel.sendMessage(`\uD83D\uDD0D Searching for ${poke_reg}...`);
  let pokemon;
  let species;
  try {
    [pokemon, species] = await Promise.all(P.getPokemonByName(poke_reg), P.getPokemonSpeciesByName(poke_reg_species));
  } catch (e) {
    searchingMessage.delete();
    const embed = { color: 16763981, description: `\u26A0  No results for: \`${suffix}\`` };
    return evt.message.channel.sendMessage('', false, embed);
  }
  searchingMessage.delete();
  const typesArray = pokemon.types.map(types => types.type.name);
  let flavorText = species.flavor_text_entries[1].flavor_text;
  const embed = {
    color: 13384507,
    author: {
      name: toTitleCase(pokemon.name),
      icon_url: 'http://i.imgur.com/M96kSgo.png' // eslint-disable-line camelcase
    },
    url: 'http://bulbapedia.bulbagarden.net/wiki/' + pokemon.name, // The url for the title.
    description: flavorText.replace(/\n|\r/g, ' '),
    fields: [
      { name: 'Pokedex ID:',
        value: pokemon.id,
        inline: true },
      { name: 'Weight:',
        value: `${pokemon.weight / 10} kg`,
        inline: true },
      { name: 'Height:',
        value: `${pokemon.height / 10} m`,
        inline: true },
      { name: 'Color:',
        value: toTitleCase(species.color.name),
        inline: true },
      { name: 'Shape:',
        value: toTitleCase(species.shape.name),
        inline: true },
      { name: 'Type:',
        value: `${toTitleCase(typesArray.join(' | '))}`,
        inline: true },
      { name: 'Speed:',
        value: pokemon.stats[0].base_stat,
        inline: true },
      { name: 'SP-Defense:',
        value: pokemon.stats[1].base_stat,
        inline: true },
      { name: 'SP-Attack:',
        value: pokemon.stats[2].base_stat,
        inline: true },
      { name: 'Defense:',
        value: pokemon.stats[3].base_stat,
        inline: true },
      { name: 'Attack:',
        value: pokemon.stats[4].base_stat,
        inline: true },
      { name: 'Health:',
        value: pokemon.stats[5].base_stat,
        inline: true }
    ],
    image: { url: 'http://www.pokestadium.com/sprites/xy/' + pokemon.name + '.gif' }
  };

  return evt.message.channel.sendMessage('', false, embed);
}

export default {
  pokemon: findPoke
};

export const help = {
  pokemon: { category: 'games' }
};
