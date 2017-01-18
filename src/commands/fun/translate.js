import Promise from 'bluebird';
import cheerio from 'cheerio';
import leetify from 'leet';
import R from 'ramda';

import { subCommands as helpText } from '../help';
import T from '../../translate';

const request = Promise.promisify(require('request'));
const gizoogle = Promise.promisifyAll(require('gizoogle'));
const gtranslate = Promise.promisifyAll(require('google-translate-api'));

function leet(client, evt, suffix, lang) {
  if (!suffix) return Promise.resolve(T('leet_usage', lang));
  return Promise.resolve(leetify.convert(suffix.toLowerCase()));
}

function snoop(client, evt, suffix, lang) {
  if (!suffix) return Promise.resolve(T('snoop_usage', lang));
  return gizoogle.stringAsync(suffix.toLowerCase());
}

function yoda(client, evt, phrase, lang) {
  if (!phrase) return Promise.resolve(T('yoda_usage', lang));

  const options = {
    url: 'http://www.yodaspeak.co.uk/index.php',
    method: 'POST',
    form: {
      YodaMe: phrase,
      go: 'Convert to Yoda-Speak!'
    }
  };

  return request(options)
    .then(R.prop('body'))
    .then(cheerio.load)
    .then($ => $('textarea[name="YodaSpeak"]').first().text());
}

function language(client, evt, suffix, lang) {
  if (!suffix) return helpText(client, evt, 'translate', lang);

  const split_suffix = suffix.split(' ');
  const trnsTo = split_suffix[0];
  split_suffix.shift();
  suffix = split_suffix.join(' ');

  gtranslate(suffix, {to: trnsTo}).then(res => {
    return Promise.resolve(evt.message.channel.sendMessage(res.text));
  })
  .catch(err => {
    return Promise.resolve(evt.message.channel.sendMessage('', false, { color: 16763981, description: `\u26A0  ${err}  |  [Language Code List](https://sites.google.com/site/tomihasa/google-language-codes)` }));
  });
}

function translate(client, evt, suffix, lang) {
  return language(client, evt, suffix, lang);
}

export default {
  leet,
  leetify: leet,
  1337: leet,
  snoop,
  snoopify: snoop,
  translate,
  yoda: yoda,
  yodaify: yoda
};

export const help = {
  translate: {
    prefix: false,
    header_text: 'translate_header_text',
    subcommands: [
      {name: 'leet'},
      {name: 'snoop'},
      {name: 'yoda'},
      {name: 'translate'}
    ]
  }
};
