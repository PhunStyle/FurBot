import Promise from 'bluebird';
import R from 'ramda';

import { subCommands as helpText } from '../help';
import pug_urls from '../../static/pugs.json';

const request = Promise.promisify(require('request'));


function axolotl(client, evt, suffix) {
  let count = 1;
  if (suffix && suffix.split(' ')[0] === 'bomb') {
    count = Number(suffix.split(' ')[1]) || 5;
    if (count > 15) count = 15;
    if (count < 0) count = 5;
  }

  const options = {
    url: 'http://fur.im/axo/',
    json: true
  };

  return Promise.resolve(R.repeat('axolotl', count))
    .map(() => {
      return request(options)
        .then(R.path(['body', 'file']))
        .then(encodeURI);
    })
    .then(R.join('\n'));
}

function bun(client, evt, suffix) {
  let count = 1;
  if (suffix && suffix.split(' ')[0] === 'bomb') {
    count = Number(suffix.split(' ')[1]) || 5;
    if (count > 15) count = 15;
    if (count < 0) count = 5;
  }

  const options = {
    url: 'http://fur.im/bun/',
    json: true
  };

  return Promise.resolve(R.repeat('bun', count))
    .map(() => {
      return request(options)
        .then(R.path(['body', 'file']))
        .then(encodeURI);
    })
    .then(R.join('\n'));
}

function cat(client, evt, suffix) {
  let count = 1;
  if (suffix && suffix.split(' ')[0] === 'bomb') {
    count = Number(suffix.split(' ')[1]) || 5;
    if (count > 15) count = 15;
    if (count < 0) count = 5;
  }

  const options = {
    url: 'http://aws.random.cat/meow',
    json: true
  };

  return Promise.resolve(R.repeat('cat', count))
    .map(() => {
      return request(options)
        .then(R.path(['body', 'file']))
        .then(encodeURI);
    })
    .then(R.join('\n'));
}

function dog(client, evt, suffix) {
  let count = 1;
  if (suffix && suffix.split(' ')[0] === 'bomb') {
    count = Number(suffix.split(' ')[1]) || 5;
    if (count > 15) count = 15;
    if (count < 0) count = 5;
  }

  const options = {
    url: 'http://random.dog/woof/',
    json: true
  };

  return Promise.resolve(R.repeat('dog', count))
    .map(() => {
      return request(options)
        .then(req => {
          let result = 'http://random.dog/';
          result += req.body;
          return result;
        })
        .then(encodeURI);
    })
    .then(R.join('\n'));
}

function fox(client, evt, suffix) {
  let count = 1;
  if (suffix && suffix.split(' ')[0] === 'bomb') {
    count = Number(suffix.split(' ')[1]) || 5;
    if (count > 15) count = 15;
    if (count < 0) count = 5;
  }

  const options = {
    url: 'http://fur.im/fox/',
    json: true
  };

  return Promise.resolve(R.repeat('fox', count))
    .map(() => {
      return request(options)
        .then(R.path(['body', 'file']))
        .then(encodeURI);
    })
    .then(R.join('\n'));
}

function pug(client, evt, suffix) {
  let count = 1;
  if (suffix && suffix.split(' ')[0] === 'bomb') {
    count = Number(suffix.split(' ')[1]) || 5;
    if (count > 15) count = 15;
    if (count < 0) count = 5;
  }

  return Promise.map(R.range(0, count), () => pug_urls[Math.floor(Math.random() * pug_urls.length)])
    .then(R.join('\n'));
}

function snake(client, evt, suffix) {
  let count = 1;
  if (suffix && suffix.split(' ')[0] === 'bomb') {
    count = Number(suffix.split(' ')[1]) || 5;
    if (count > 15) count = 15;
    if (count < 0) count = 5;
  }

  const options = {
    url: 'http://fur.im/snek/',
    json: true
  };

  return Promise.resolve(R.repeat('snake', count))
    .map(() => {
      return request(options)
        .then(R.path(['body', 'file']))
        .then(encodeURI);
    })
    .then(R.join('\n'));
}

function wolf(client, evt, suffix) {
  let count = 1;
  if (suffix && suffix.split(' ')[0] === 'bomb') {
    count = Number(suffix.split(' ')[1]) || 5;
    if (count > 15) count = 15;
    if (count < 0) count = 5;
  }

  const options = {
    url: 'http://fur.im/wolf/',
    json: true
  };

  return Promise.resolve(R.repeat('wolf', count))
    .map(() => {
      return request(options)
        .then(R.path(['body', 'file']))
        .then(encodeURI);
    })
    .then(R.join('\n'));
}



function animals(client, evt, suffix, lang) {
  const split_suffix = suffix.split(' ');
  const cmd = split_suffix[0];
  split_suffix.shift();
  suffix = split_suffix.join(' ');

  if (cmd === 'axolotl') return axolotl(client, evt, suffix);
  if (cmd === 'bun') return bun(client, evt, suffix);
  if (cmd === 'cat') return cat(client, evt, suffix);
  if (cmd === 'dog') return dog(client, evt, suffix);
  if (cmd === 'fox') return fox(client, evt, suffix);
  if (cmd === 'pug') return pug(client, evt, suffix);
  if (cmd === 'snake') return snake(client, evt, suffix);
  if (cmd === 'wolf') return wolf(client, evt, suffix);
  return helpText(client, evt, 'animals', lang);
}

export default {
  animal: animals,
  animals,
  axolotl,
  axlotl: axolotl,
  axo: axolotl,
  bun,
  bunny: bun,
  rabbit: bun,
  '\ud83d\udc30': bun,
  cat,
  cats: cat,
  '\ud83d\udc31': cat,
  dog,
  dogs: dog,
  '\ud83d\udc36': dog,
  fox,
  '\ud83e\udd8a': fox,
  pug,
  pugs: pug,
  snake,
  snakes: snake,
  snek: snake,
  sneks: snake,
  '\ud83d\udc0d': snake,
  wolf,
  '\ud83d\udc3A': wolf
};

export const help = {
  animals: {
    prefix: false,
    header_text: 'animals_header_text',
    subcommands: [
      {name: 'axolotl'},
      {name: 'bun'},
      {name: 'cat'},
      {name: 'dog'},
      {name: 'fox'},
      {name: 'pug'},
      {name: 'snake'},
      {name: 'wolf'}
    ]
  }
};
