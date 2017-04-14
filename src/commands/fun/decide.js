import Promise from 'bluebird';

import { choices } from '../../static';
import T from '../../translate';


function decide(client, evt, suffix, lang) {
  function multipleDecide(options) {
    const selected = options[Math.floor(Math.random() * options.length)];
    if (!selected) return multipleDecide(options);
    return selected;
  }

  const split = suffix.split(` or `);
  const rand = Math.floor(Math.random() * choices.length);

  if (split.length > 1) {
    let embed = { color: 6139372, description: `\uD83D\uDD2E  ${choices[rand]} **${multipleDecide(split)}** ${evt.message.author.mention}` };
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  }

  return Promise.resolve(T('decide_usage', lang));
}

export default {
  choice: decide,
  choose: decide,
  decide
};

export const help = {
  decide: {
    parameters: ['something', 'or', 'something']
  }
};
