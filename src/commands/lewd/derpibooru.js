import Promise from 'bluebird';
import R from 'ramda';
import _request from 'request';
import nconf from 'nconf';

import { getBlackListChannel } from '../../redis';

const apikey = nconf.get('DERPIBOORU_KEY');
const request = Promise.promisify(_request);

// Setup and makes request to e621 API
function _makeRequest(options) {
  let default_options = {
    json: true,
    headers: {
      'User-Agent': 'FurBot/1.0 (Phun @ e621)'
    }
  };

  if (options.qs) options.qs = R.merge(default_options.qs, options.qs);
  return request(R.merge(default_options, options, true))
    .tap(res => {
      // if (res.statusCode === 521) throw new ApiDown();
    })
    .then(R.prop('body'))
    .tap(body => {
      // if (body.error) throw new Error(body.error);
    });
}

function findOne(haystack, arr) {
  return arr.some(v => haystack.includes(v));
}

function tags(client, evt, suffix) {
  let channelName = evt.message.channel.name;
  const patt = new RegExp(/^nsfw(-|$)/);
  let channelTest = patt.test(channelName);
  if (evt.message.channel.isPrivate) channelTest = true;
  if (channelTest === false) return Promise.resolve(evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  Please use this command in a NSFW-enabled channel.\nIf you are an Admin, edit the channel and enable NSFW.`}));
  return getBlackListChannel(evt.message.channel_id).then(value => {
    let array = suffix.split(' ');
    let blacklist;
    if (value) {
      blacklist = value.split(', ');
      if (findOne(blacklist, array)) {
        return Promise.resolve(evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  One of the tags you entered is blacklisted in this channel!\nTo see the blacklist use \`!blacklist-get\``}));
      }
    }
    let query;
    let lastTag = Number.parseInt(array[array.length - 1], 10);
    let count = 1;
    if (suffix && Number.isInteger(lastTag)) {
      count = lastTag;
      if (count > 5) count = 5;
      if (count < 0) count = 1;
      let removeCount = R.slice(0, -1, array);
      let cleanSuffix = R.join(' ', removeCount);
      query = cleanSuffix.toLowerCase().replace('tags ', '');
    } else {
      query = suffix.toLowerCase().replace('tags ', '');
    }
    query = query.replace(/ /gi, ',');
    query = query.replace(/_/gi, '+');

    if (query === '') return Promise.resolve(`\u26A0  |  No tags were supplied`);
    let checkLength = query.split(' ');
    if (checkLength.length > 6) return Promise.resolve(`\u26A0  |  You can only search up to 6 tags`);

    const options = {
      url: `https://derpibooru.org/search.json?q=${query}`,
      qs: {
        key: `${apikey}`
      }
    };

    return Promise.resolve(R.repeat('tags', count))
    .map(() => {
      return _makeRequest(options)
      .then(count => {
        let pages = Math.floor(Math.random() * Math.ceil(count.total / count.search.length));
        return _makeRequest({
          url: `https://derpibooru.org/search.json?q=${query}`,
          qs: {
            key: `${apikey}`,
            page: `${pages}`
          }
        });
      })
      .then(body => {
        if (!body || typeof body === 'undefined' || body.search.length === 0) return Promise.resolve(`\u26A0  |  No results for: \`${query}\``);
        // Do some math
        let randomid = Math.floor(Math.random() * body.search.length);
        // Grab the data
        let id = body.search[randomid].id;
        let file = body.search[randomid].image;
        let fileurl = `https:${file}`;
        let height = body.search[randomid].height;
        let width = body.search[randomid].width;
        let score = body.search[randomid].score;
        // Apply blacklisting
        if (value) {
          let tags = body.search[randomid].tags.split(', ');
          if (findOne(blacklist, tags)) {
            fileurl = 'http://i.imgur.com/oKq3RdK.png';
          }
        }
        let embed = {
          color: 4035280,
          author: {
            name: suffix,
            icon_url: evt.message.author.avatarURL
          },
          url: 'https://derpibooru.org/' + id,
          description: `**Score:** ${score} | **Resolution: ** ${width} x ${height}`,
          image: { url: fileurl },
          footer: { icon_url: 'http://i.imgur.com/qeJd6ST.png', text: 'derpibooru' }
        };
        return evt.message.channel.sendMessage('', false, embed);
      });
    });
  });
}

export default {
  dp: (client, evt, suffix, lang) => {
    const command = suffix.toLowerCase().split(' ')[0];
    // if (command === 'latest') return latest(client, evt, suffix);
    if (command === 'tags') return tags(client, evt, suffix);
    if (command !== 'tags' || command !== 'latest') return tags(client, evt, suffix);
  }
};

export const help = {
  dp: {parameters: ['tags', 'number']}
};
