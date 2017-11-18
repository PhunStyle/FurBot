import Promise from 'bluebird';
import R from 'ramda';

const request = Promise.promisify(require('request'));

function _makeRequest(options) {
  let default_options = {
    json: true
  };

  if (options.qs) options.qs = R.merge(default_options.qs, options.qs);
  return request(R.merge(default_options, options, true))
    .then(R.prop('body'));
}

function advice(client, evt, suffix) {
  const options = {
    url: 'http://api.adviceslip.com/advice'
  };

  return _makeRequest(options)
  .then(body => {
    let embed = {
      color: 6714751,
      description: '\uD83D\uDCE2  ' + body.slip.advice
    };
    return evt.message.channel.sendMessage('', false, embed);
  });
}

export default {
  advice
};

export const help = {
  advice: {}
};
