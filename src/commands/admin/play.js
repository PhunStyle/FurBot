import nconf from 'nconf';
import R from 'ramda';
import T from '../../translate';

function playGame(client, evt, suffix, lang) {
  let game = suffix;
  if (evt.message.author.id == nconf.get('OWNER_ID')) {
    client.User.setGame(game);
  }
}

function playStop(client, evt, suffix, lang) {
  if (evt.message.author.id == nconf.get('OWNER_ID')) {
    client.User.setGame(null);
  }
}

export default {
  setplaying: playGame,
  stopplaying: playStop
};
