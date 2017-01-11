import Promise from 'bluebird';
import didyoumean from 'didyoumean';
import nconf from 'nconf';
import R from 'ramda';
import _request from 'request';
import SuperError from 'super-error';

import { getNSFWChannel } from '../../redis';

const request = Promise.promisify(_request);

// Setup and makes request to e621 API
function _makeRequest(options) {
  let default_options = {
    json: true,
    headers: {
      'User-Agent' : 'FurBot/1.0 (Phun @ e621)'
    }
  };

  if (options.qs) options.qs = R.merge(default_options.qs, options.qs);
  return request(R.merge(default_options, options, true))
    .tap(res => {
      if (res.statusCode === 521) throw new ApiDown();
    })
    .then(R.prop('body'))
    .tap(body => {
      //if (body.error) throw new Error(body.error);
    });
}

function tags(client, evt, suffix) {
  const channel_id = evt.message.channel_id;
  return getNSFWChannel(channel_id).then(value => {
    if (value === 'false') return Promise.resolve(`\u26A0  |  Please use this command in a NSFW channel. Admins can enable NSFW with the command \`!setnsfw\``);
    let query;
    let array = suffix.split(' ');
    let lastTag = Number.parseInt(array[array.length-1]);
    let count = 1;
    if (suffix && Number.isInteger(lastTag)) {
      count = lastTag;
      if (count > 15) count = 10;
      if (count < 0) count = 1;
      let removeCount = R.slice(0, -1, array);
      let cleanSuffix = R.join(' ', removeCount);
      query = cleanSuffix.toLowerCase().replace('tags ', '');
    } else {
      query = suffix.toLowerCase().replace('tags ', '');
    }

    if (query == '') return Promise.resolve(`\u26A0  |  No tags were supplied`);
    let checkLength = query.split(' ');
    if (checkLength.length > 6) return Promise.resolve(`\u26A0  |  You can only search up to 6 tags`);

    const options = {
      url: `https://e621.net/post/index.json?tags=${query}`,
      qs: {
        limit: 300
      }
    };

    return Promise.resolve(R.repeat('tags', count))
      .map(() => {
    return _makeRequest(options)
      .then(body => {
        if (!body || typeof body === 'undefined' || body.length == 0) return Promise.resolve(`\u26A0  |  No results for: \`${query}\``);
        // Do some math
        let randomid = Math.floor(Math.random() * body.length);
        // Grab the data
        let id = body[randomid].id;
        let file = body[randomid].file_url;
        let desc = body[randomid].description;
        let descLimit = desc.substring(0, 100);
        let time = body[randomid].created_at.s + '000';
        let timeFix = parseInt(time);
        let artist = body[randomid].artist;
        if (body[randomid].artist.length === 0) artist = 'Unknown';
        let height = body[randomid].height;
        let width = body[randomid].width;
        let score = body[randomid].score;
        let faves = body[randomid].fav_count;
        let uploader = body[randomid].author;
        let extension = body[randomid].file_ext;
        // Put it all together for output (message object needs at least some message data)
        // Logging
        // console.log(randomid, id, file, descLimit, timeFix, height, width, score, faves, uploader, extension);
        // Logging
        let output = `\n`;
        let embed = {
          color: 77399,
          author: {
            name: 'Searched: ' + query,
            icon_url: evt.message.author.avatarURL // eslint-disable-line camelcase
          },
          ////title: 'https://e621.net/post/show/' + id,
          url: 'https://e621.net/post/show/' + id, // The url for the title.
          description: descLimit,
          fields: [
            { name: 'Artist:',
              value: '\u200C' + artist,
              inline: true },
            { name: 'Resolution:',
              value: width + 'x' + height,
              inline: true },
            { name: 'Score:',
              value: score,
              inline: true },
            { name: 'Favorites:',
              value: faves,
              inline: true }
          ],
          image: { url: file },
          timestamp: new Date(timeFix),
          footer: { text: 'Uploader: ' + uploader }
        }
        return evt.message.channel.sendMessage(output, false, embed);
      })
    })
  })
}

export default {
  e6: (client, evt, suffix, lang) => {
    const command = suffix.toLowerCase().split(' ')[0];
    /*if (command === 'latest') return latest(client, evt, suffix);*/
    if (command === 'tags') return tags(client, evt, suffix);
    if (command !== 'tags' || command !== 'latest') return tags(client, evt, suffix);
  }
};

export const help = {
  e6: {parameters: ['tags', 'number']}
};
