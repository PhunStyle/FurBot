import Promise from 'bluebird';
import request from 'request';
import path from 'path';
import moment from 'moment';

import { getImageLink } from '../../helpers';
var gm = require('gm').subClass({imageMagick: true});

function truncateUsername(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

function godiwish(client, evt, suffix) {
  evt.message.delete();
  let data = getImageLink(client, evt, suffix);

  let intensity = parseInt(data[0], 10);
  if (intensity > 10) intensity = 10;
  if (intensity <= 0) intensity = 1;

  let image = data[1];

  let embed = { color: 15747399, description: `<:redTick:405749796603822080> Something went wrong. Make sure you use the command correctly!` };

  evt.message.channel.sendMessage('<a:loadingCircle:456089197057671198> Processing Image...')
  .then(message => { setTimeout(() => { message.delete(); }, 5000); });

  let fileDir = path.join(__dirname, '../../images/');
  let baseImage = fileDir + '/godiwish-base.png';
  let output = fileDir + '/tmp/godiwish-' + evt.message.author.id + '.png';
  let output2 = fileDir + '/tmp/godiwish2-' + evt.message.author.id + '.png';
  let fontVerdana = path.join(__dirname, '../../static/verdana.ttf');
  let fontTrebuchet = path.join(__dirname, '../../static/trebucbd.ttf');

  let currentTimeDate = moment().format('MMM DD, YYYY');

  let currentUser = evt.message.author.username;
  let currentUserTruncated = truncateUsername(currentUser, 22);
  let fontSize = 32;
  if (currentUser.length > 16) {
    fontSize = 24;
  }

  return new Promise((resolve, reject) => {
    gm(baseImage)
    .font(fontTrebuchet, fontSize)
    .fill('#367287')
    .drawText(173, 73, currentUserTruncated)
    .font(fontVerdana, 23)
    .fill('#768585')
    .drawText(522, 73, currentTimeDate)
    .write(output, (err, buf) => {
      if (err) {
        let embed = { color: 15747399, description: `<:redTick:405749796603822080> Something went wrong. Make sure you use the command correctly!` };
        evt.message.channel.sendMessage('', false, embed);
        return console.log(err);
      }
      gm(request(image))
      .resize('107', '107', '^')
      .gravity('Center')
      .crop('107', '107')
      .write(output2, (err, finalbuf) => {
        if (err) {
          let embed = { color: 15747399, description: `<:redTick:405749796603822080> Something went wrong. Make sure you use the command correctly!` };
          evt.message.channel.sendMessage('', false, embed);
          return console.log(err);
        }
        gm(output)
        .composite(output2)
        .geometry('+9+16')
        .toBuffer('PNG', (err, realbuf) => {
          if (err) {
            let embed = { color: 15747399, description: `<:redTick:405749796603822080> Something went wrong. Make sure you use the command correctly!` };
            evt.message.channel.sendMessage('', false, embed);
            return console.log(err);
          }
          resolve(realbuf);
        });
      });
    });
  });
}



export default {
  godiwishthatwereme: godiwish,
  giwtwm: godiwish,
  wishthatwereme: godiwish,
  godiwish
};

export const help = {
  godiwish: {}
};
