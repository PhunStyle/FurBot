import Promise from 'bluebird';
import R from 'ramda';
import _request from 'request';

import { getBlackListRemove, getBlackListChannel } from '../../redis';


const request = Promise.promisify(_request);

// Setup and makes request to e621 API
function _makeRequest(options) {
  let default_options = {
    json: true,
    headers: {
      'User-Agent': 'PhunStyle/FurBot @ GitHub'
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

function getOne(haystack, arr) {
  return arr.find(v => haystack.includes(v));
}

function isNumeric(num){
  return !isNaN(num);
}

function tags(client, evt, suffix) {
  return getBlackListRemove(evt.message.channel_id).then(removeValue => {
    let channelTest = evt.message.channel.nsfw;
    if (evt.message.channel.isPrivate) channelTest = true;
    if (channelTest === false) return Promise.resolve(evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  Please use this command in a NSFW-enabled channel.\nIf you are an Admin, edit the channel and enable NSFW.`}));
    return getBlackListChannel(evt.message.channel_id).then(value => {
      let array = suffix.split(' ');
      let blacklist;
      if (value) {
        blacklist = value.split(', ');
        if (findOne(blacklist, array)) {
          return Promise.resolve(evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  One of the tags you entered is blacklisted in this channel!\nTo see the blacklist use \`f.blacklist get\``}));
        }
      }
      let query;
      let lastTag = array[array.length - 1];
      console.log('lastTag: ' + lastTag);
      console.log('lastTag isNum: ' + isNumeric(lastTag));
      let count = 1;
      if (suffix && isNumeric(lastTag)) {
        count = lastTag;
        if (count > 5) count = 5;
        if (count < 0) count = 1;
        let removeCount = R.slice(0, -1, array);
        let cleanSuffix = R.join(' ', removeCount);
        query = cleanSuffix.toLowerCase().replace('tags ', '');
      } else {
        query = suffix.toLowerCase().replace('tags ', '');
      }

      console.log('query: ' + query);

      if (query === '') return Promise.resolve(`\u26A0  |  No tags were supplied`);
      let checkLength = query.split(' ');
      if (checkLength.length > 5) return Promise.resolve(`\u26A0  |  You can only search up to 5 tags`);
      console.log('checkLength: ' + checkLength);
      const options = {
        url: `https://e621.net/post/index.json?tags=${query} order:random`,
        qs: {
          limit: 20
        }
      };

      // Keep count of current position & blacklist matches
      let currentPosition = 0;
      let blacklistHits = 0;

      return _makeRequest(options)
      .then(body => {
        if (!body || typeof body[0] === 'undefined' || typeof body === 'undefined' || body.length === 0) {
           return Promise.resolve(`\u26A0  |  No results for: \`${query}\``);
        }
        if (body) {
          console.log('body: ' + body);
          console.log('bodylength: ' + body.length);
          let i;
          for (i = body.length - 1; i >= 0; i--) {
            // Apply blacklisting
            if (value) {
              let tags = body[i].tags.split(' ');
              if (findOne(blacklist, tags) || body[i].tags.includes('cub') || body[i].tags.includes('shota') || body[i].tags.includes('loli')) {
                if (removeValue === 'true') {
                  body.splice(i,1);
                }
              }
            }
          }
        }
        console.log('body2: ' + body);
        console.log('bodylength2: ' + body.length);
        if (count > body.length) {
          count = body.length;
        }
        return Promise.resolve(R.repeat('tags', count))
        .map(() => {
          if (body.length === 0) return;
          // Do some math
          let randomid = Math.floor(Math.random() * body.length);
          currentPosition++;
          // Grab the data
          let id = body[randomid].id;
          //let file = body[randomid].file_url;
          let file = null;
          let height = body[randomid].height;
          let width = body[randomid].width;
          let score = body[randomid].score;
          let imageDescription = `**Score:** ${score} | **Resolution: ** ${width} x ${height} | [**Link**](https://e621.net/post/show/${id})`;
          if (file) {
            if (file.endsWith('webm') || file.endsWith('swf')) {
              imageDescription = `**Score:** ${score} | [**Link**](https://e621.net/post/show/${id})\n*This file (webm/swf) cannot be previewed or embedded.*`;
            }
          }

          // Apply blacklisting
          if (value) {
            let tags = body[randomid].tags.split(' ');
            if (findOne(blacklist, tags)) {
              file = null;
              let blacklistMatch = getOne(blacklist, tags);
              imageDescription = `**BLACKLISTED** - Matched: \`${blacklistMatch}\` | [**Link**](https://e621.net/post/show/${id})`;
            }
          }

          let embed = {
            color: 77399,
            author: {
              name: query,
              icon_url: evt.message.author.avatarURL
            },
            url: 'https://e621.net/post/show/' + id,
            description: imageDescription,
            image: { url: file },
            footer: { icon_url: 'http://i.imgur.com/RrHrSOi.png', text: 'e621' }
          };

          body.splice(randomid,1);

          console.log('body3: ' + body);
          console.log('bodylength3: ' + body.length);

          return evt.message.channel.sendMessage('', false, embed);
        });
      });
    });
  });
}

export default {
  e6: (client, evt, suffix, lang) => {
    const command = suffix.toLowerCase().split(' ')[0];
    if (command === 'tags') return tags(client, evt, suffix);
    if (command !== 'tags' || command !== 'latest') return tags(client, evt, suffix);
  }
};

export const help = {
  e6: { parameters: 'tags' }
};
