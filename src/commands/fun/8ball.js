import Promise from 'bluebird';

import { eightball } from '../../static';
import T from '../../translate';


function eightBall(client, evt, suffix, lang) {
  if (!suffix) return Promise.resolve(`${T('8ball_usage', lang)}`);
  const rand = Math.floor(Math.random() * eightball.length);
  let embed = { color: 2961975, description: `\uD83C\uDFB1  **${eightball[rand]}** ${evt.message.author.mention}` };
  return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
}

export default {
  '8ball': eightBall,
  eightball: eightBall
};

export const help = {
  '8ball': { parameters: 'question' }
};
