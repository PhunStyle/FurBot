import Promise from 'bluebird';
import nconf from 'nconf';


function escapeMessage(client, evt, suffix) {
  let input = (suffix ? suffix : "\u{d83e}\u{dd14}");
        let result = '';
        for (var i in input) {
          result += `\\u{${input.charCodeAt(i).toString(16)}}`;
        }
      return  evt.message.channel.sendMessage('**Escaped output for ' + input + "**\n```js\n" + result + "\n```")
      .catch(err => {
        console.log(err);
      });
}

export default {
  escape: escapeMessage
};
