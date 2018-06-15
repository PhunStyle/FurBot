import Promise from 'bluebird';
import request from 'request';
import path from 'path';
import T from '../../translate';
var gm = require('gm').subClass({imageMagick: true});


function pride(client, evt, suffix, lang) {
  let flagSuffix = suffix.split(' ')[0];
  let flagArray = ['ace', 'bisexual', 'genderfluid', 'genderqueer', 'lesbian', 'nonbinary', 'pansexual', 'rainbow', 'transgender'];
  let validSuffix = (flagArray.indexOf(flagSuffix) > -1);
  let doBorder = suffix.includes('border');
  let doRotate = suffix.includes('rotate');
  let doOverlay = suffix.includes('overlay');
  let doBackground = suffix.includes('background');

  if (!suffix || !validSuffix) {
    return Promise.resolve(`${T('pride_usage', lang)}`);
  }

  let imageLink = evt.message.author.getAvatarURL({format: 'png', size: 512, preferAnimated: false});

  let prideFlag = flagSuffix;

  if (doRotate) prideFlag += '_rotated';
  if (doBorder) prideFlag += '_border';
  if (doOverlay) prideFlag += '_overlay';

  let fileDir = path.join(__dirname, '../../images/');
  let gayput = fileDir + '/flags/pride_' + prideFlag + '.png';
  let output = fileDir + '/tmp/pride-' + evt.message.author.id + '.png';

  if (!doOverlay && !doBackground) {
    return new Promise((resolve, reject) => {
      gm(request(imageLink))
      .resize('236', '236')
      // .crop(236, 236, 0, 0)
      .write(output, (err, buf) => {
        if (err) return console.log(err);
        gm(236, 236, 'none')
        .fill(output)
        .drawCircle((236 / 2) - 1, (236 / 2) - 1, (236 / 2) - 1, 0)
        .write(output, (err, finalbuf) => {
          if (err) return console.log(err);
          gm(gayput)
          .composite(output)
          .geometry('+10+10')
          .toBuffer('PNG', (err, realbuf) => {
            if (err) return console.log(err);
            resolve(realbuf);
          });
        });
      });
    });
  }

  if (doOverlay) {
    return new Promise((resolve, reject) => {
      gm(request(imageLink))
      .resize('256', '256')
      // .crop(236, 236, 0, 0)
      .write(output, (err, buf) => {
        if (err) return console.log(err);
        gm(256, 256, 'none')
        .fill(output)
        .drawCircle((256 / 2), (256 / 2) - 1, (256 / 2), 0)
        .write(output, (err, finalbuf) => {
          if (err) return console.log(err);
          gm(output)
          .composite(gayput)
          .toBuffer('PNG', (err, realbuf) => {
            if (err) return console.log(err);
            resolve(realbuf);
          });
        });
      });
    });
  }

  if (doBackground) {
    return new Promise((resolve, reject) => {
      gm(request(imageLink))
      .resize('256', '256')
      // .crop(236, 236, 0, 0)
      .write(output, (err, buf) => {
        if (err) return console.log(err);
        gm(256, 256, 'none')
        .fill(output)
        .drawCircle((256 / 2), (256 / 2) - 1, (256 / 2), 0)
        .write(output, (err, finalbuf) => {
          if (err) return console.log(err);
          gm(gayput)
          .composite(output)
          .toBuffer('PNG', (err, realbuf) => {
            if (err) return console.log(err);
            resolve(realbuf);
          });
        });
      });
    });
  }
}

export default {
  pride
};

export const help = {
  pride: {}
};
