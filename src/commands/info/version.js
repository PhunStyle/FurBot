import Promise from 'bluebird';
import R from 'ramda';

const request = Promise.promisify(require('request'));

function replacer(match, p1) {
  match = '__**' + match + '**__';
  return match.replace('#', '')
}

function version() {
  return request('https://raw.githubusercontent.com/PhunStyle/FurBot/master/CHANGELOG.md')
    .then(R.prop('body'))
    .then(R.split(/<a name="*.*.*" \/>/g))
    .then(R.nth(1))
    .then(R.replace(/(#)(.*)(\(.*\))/g, replacer))
    .then(R.replace('### Features', '**### Features:**'))
    .then(R.replace('### Bug Fixes', '**### Bug Fixes:**'))
    .then(R.replace('### Technical Notes', '**### Technical Notes:**'))
    .then(R.slice(1, -1))
    .then(R.trim);
}

export default {
  changelog: version,
  'change-log': version,
  newfeatures: version,
  'new-features': version,
  version
};

export const help = {
  version: {}
};
