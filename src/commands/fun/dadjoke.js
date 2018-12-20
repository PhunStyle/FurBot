import Promise from 'bluebird';
import _request from 'request';
import R from 'ramda';

const request = Promise.promisify(_request);

function _makeRequest(options) {
  let default_options = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'FurBot/1.0 (https://github.com/PhunStyle/FurBot)'
    },
    json: true
  };

  if (options.qs) options.qs = R.merge(default_options.qs, options.qs);
  return request(R.merge(default_options, options, true))
    .then(R.prop('body'));
}

function dadjoke(client, evt) {
  const options = {
    url: `https://icanhazdadjoke.com/`,
  };

  return _makeRequest(options)
  .then(body => { return evt.message.channel.sendMessage('\uD83D\uDC68\uD83D\uDCAC  ' + body.joke); });
}

export default {
  dadjoke
};

export const help = {
  dadjoke
};
