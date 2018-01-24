import Promise from 'bluebird';
import R from 'ramda';
import _request from 'request';

import T from '../../translate';


const request = Promise.promisify(_request);

function makePoll(client, evt, suffix) {
  if (!suffix) return evt.message.channel.sendMessage(`${T('poll_usage')}`);
  suffix = suffix.split(' | ');
  let question = suffix.shift().toString();
  // console.log(question);
  let polloptions = suffix.toString().split(', ');
  // console.log(polloptions);

  const options = {
    url: 'http://www.strawpoll.me/api/v2/polls',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true,
    body: {
      title: question,
      options: polloptions,
      multi: false,
      captcha: true
    }
  };

  return request(options)
  .then(R.prop('body'))
  .then(res => {
    if (!res.id) {
      let embed = { color: 15747399, description: `<:redTick:405749796603822080> Something went wrong: ${res.errorMessage}` };
      return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
    }
    let embed = {
      color: 16765797,
      description: `\ud83d\uddd2  **Success!** [Click Here](http://www.strawpoll.me/${res.id}) to open your poll.`
    };
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  });
}

export default {
  poll: makePoll,
  strawpoll: makePoll
};

export const help = {
  poll: { parameters: 'text' }
};
