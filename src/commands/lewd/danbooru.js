import Promise from 'bluebird';
import R from 'ramda';
import _request from 'request';

import { getBlackListChannel } from '../../redis';


const request = Promise.promisify(_request);

// Setup and makes request to danbooru API
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

    if (query === '') return Promise.resolve(`\u26A0  |  No tags were supplied`);
    let checkLength = query.split(' ');
    if (checkLength.length > 2) return Promise.resolve(`\u26A0  |  You can only search up to 2 tags`);

    const options = {
      url: `http://danbooru.donmai.us/post/index.json?tags=${query}`,
      qs: {
        limit: 200
      }
    };

    return _makeRequest(options)
    .then(body => {
      return Promise.resolve(R.repeat('tags', count))
      .map(() => {
        if (!body || typeof body === 'undefined' || body.length === 0) return Promise.resolve(`\u26A0  |  No results for: \`${query}\``);
        // Do some math
        let randomid = Math.floor(Math.random() * body.length);
        // Grab the data
        let id = body[randomid].id;
        let file = body[randomid].file_url;
        let fileurl = `http://danbooru.donmai.us${file}`;
        let height = body[randomid].height;
        let width = body[randomid].width;
        let score = body[randomid].score;
        // Apply blacklisting
        if (value) {
          let tags = body[randomid].tags.split(' ');
          if (findOne(blacklist, tags)) {
            fileurl = 'http://i.imgur.com/oKq3RdK.png';
          }
        }
        let embed = {
          color: 29695,
          author: {
            name: query,
            icon_url: evt.message.author.avatarURL
          },
          url: 'http://danbooru.donmai.us/posts/' + id,
          description: `**Score:** ${score} | **Resolution: ** ${width} x ${height}`,
          image: { url: fileurl },
          footer: { icon_url: 'http://i.imgur.com/BrMcA8z.png', text: 'danbooru' }
        };
        return evt.message.channel.sendMessage('', false, embed);
      });
    });
  });
}

export default {
  db: (client, evt, suffix, lang) => {
    const command = suffix.toLowerCase().split(' ')[0];
    // if (command === 'latest') return latest(client, evt, suffix);
    if (command === 'tags') return tags(client, evt, suffix);
    if (command !== 'tags' || command !== 'latest') return tags(client, evt, suffix);
  }
};

export const help = {
  db: {parameters: ['tags', 'number']}
};
