import Promise from 'bluebird';
import nconf from 'nconf';


function evaluateMessage(client, evt, suffix, all) {
  if (evt.message.author.id === nconf.get('OWNER_ID')) {
    return new Promise((resolve, reject) => {
      try {
        var result = eval(suffix); //eslint-disable-line
        return evt.message.channel.sendMessage('\u25B6 **INPUT:** ```js\n' + suffix + '```\n \u2705 **OUTPUT:**```js\n' + result + '```');
      } catch (err) {
        if (err) {
          return evt.message.channel.sendMessage('\u25B6 **INPUT:** ```js\n' + suffix + '```\n \u274C **OUTPUT:**```js\n' + result + '```');
        }
      }
    });
  }
}

export default {
  eval: evaluateMessage
};
