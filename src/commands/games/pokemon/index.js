import Promise from 'bluebird';
import R from 'ramda';
import T from '../../../translate';
import Pokedex from 'pokedex-promise-v2'
import { getOrdinal, numberWithCommas, secondDec, toTitleCase } from '../../../helpers';

const P = new Pokedex();

function findPoke(client, evt, suffix, lang) {
  if (!suffix) return Promise.resolve(T('pokemon_usage', lang));
  suffix = suffix.toLowerCase();
  var PokePromises = [P.getPokemonByName(suffix), P.getPokemonSpeciesByName(suffix)];
  evt.message.channel.sendMessage(`\uD83D\uDD0D Searching for ${suffix}...`)
  .then(function(message) {
    setTimeout(function() {
        client.Messages.deleteMessage(message.id, evt.message.channel.id);
    }, 5000);
    return Promise.all(PokePromises)
  })
  .then(function(data) {
    let typesArray = [];
    let typesData = data[0].types.forEach(types => {typesArray.push(types.type.name)});
    let flavorText = data[1].flavor_text_entries[1].flavor_text;
    let embed = {
      color: 13384507,
      author: {
        name: toTitleCase(data[0].name),
        icon_url: data[0].sprites.front_default // eslint-disable-line camelcase
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
    }
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  })
  .catch(function(err){
    return Promise.resolve(evt.message.channel.sendMessage(`\u26A0  |  No results for: \`${suffix}\``))
  })
}

export default {
  pokemon: findPoke
};

export const help = {
  pokemon: {
    category: 'games'
  }
};
