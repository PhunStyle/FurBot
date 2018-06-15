import Promise from 'bluebird';
import request from 'request';
var gm = require('gm').subClass({imageMagick: true});

// liblqr-1-0-dev | libglib2.0 | magick from source | libpng-dev | libjpeg-dev | libopenjp2-7-dev
function magik(client, evt, suffix) {
  let channel = evt.message.channel;
  let imageLink = evt.message.author.getAvatarURL({format: 'png', size: 512, preferAnimated: false});

  if (evt.message.attachments.length) {
    if (evt.message.attachments[0].url) {
      imageLink = evt.message.attachments[0].url;
    }
  }

  let messageArray = channel.messages.filter(msg => !msg.deleted).reverse();
  let slicedArray = messageArray.slice(0, 5);
  let finalArray = [];

  slicedArray.map(msg => {
    if ((msg.attachments.length) && (msg.author.id === client.User.id)) {
      finalArray.push(msg);
    }
  });

  if (finalArray.length && (evt.message.attachments.length === 0)) {
    imageLink = finalArray[0].attachments[0].url;
  }

  evt.message.channel.sendMessage('<a:loadingCircle:456089197057671198> Processing Image...')
  .then(message => { setTimeout(() => { message.delete(); }, 5000); });

  return new Promise((resolve, reject) => {
    gm(request(imageLink))
    .out('-resize', '800x800>')
    .out('-liquid-rescale', '50%')
    .out('-liquid-rescale', '200%')
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
