import Promise from 'bluebird';
import request from 'request';

import { getImageLink } from '../../helpers';
var gm = require('gm').subClass({imageMagick: true});


function rotate(client, evt, suffix) {
  let data = getImageLink(client, evt, suffix);

  let intensity = parseInt(data[0], 10);
  if (intensity > 360) intensity = 360;
  if (intensity <= 1) intensity = 45;

  let image = data[1];

  let embed = { color: 15747399, description: `<:redTick:405749796603822080> Something went wrong. Make sure you use the command correctly!` };

  evt.message.channel.sendMessage('<a:loadingCircle:456089197057671198> Processing Image...')
  .then(message => { setTimeout(() => { message.delete(); }, 5000); });

  return new Promise((resolve, reject) => {
    gm(request(image, function(error, response, body) {
      if (error) { return evt.message.channel.sendMessage('', false, embed); }
    }))
    .out('-background', 'none', '-rotate', intensity)
    .toBuffer('PNG', (err, buffer) => {
      if (err) { return evt.message.channel.sendMessage('', false, embed); }
      resolve(buffer);
    });
  });
}

export default {
  rotate
};

export const help = {
  rotate: { parameters: 'degrees' }
};
