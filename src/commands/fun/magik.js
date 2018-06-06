import Promise from 'bluebird';
import request from 'request';
import path from 'path';
import T from '../../translate';
var gm = require('gm').subClass({imageMagick: true});


function magik(client, evt) {

  let imageLink = evt.message.author.getAvatarURL({format: 'png', size: 512, preferAnimated: false});

  if (evt.message.attachments.length) {
    if (evt.message.attachments[0].url) {
      imageLink = evt.message.attachments[0].url;
    }
  }

  return new Promise((resolve, reject) => {
    gm(request(imageLink))
    .out('-resize', '800x800>')
    .out('-liquid-rescale', '50%')
    .out('-liquid-rescale', '150%')
    .toBuffer('PNG', (err, buffer) => {
      if (err) return console.log(err);
      resolve(buffer);
    });
  });
}

export default {
  magik
};

export const help = {
  magik: {}
};
