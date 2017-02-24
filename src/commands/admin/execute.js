import nconf from 'nconf';
import { exec } from 'child_process';

function executeMessage(client, evt, suffix, all) {
  if (evt.message.author.id === nconf.get('OWNER_ID')) {
    exec(suffix, (error, stdout, stderr) => {
      if (error) {
        return evt.message.channel.sendMessage('\u25B6 **INPUT:** ```shell\n' + suffix + '```\n \u274C **OUTPUT:**```perl\n' + error + '```');
      }
      return evt.message.channel.sendMessage('\u25B6 **INPUT:** ```shell\n' + suffix + '```\n \u2705 **OUTPUT:**```perl\n' + stdout + '```');
    });
  }
}

export default {
  exec: executeMessage
};
