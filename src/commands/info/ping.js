import Promise from 'bluebird';

function ping(client, evt) {
  evt.message.channel.sendMessage(`\u2139  |  Pong!`)
  .then(m => {
      let outTime = new Date(m.timestamp).getTime();
      let inTime = new Date(evt.message.timestamp).getTime();
      client.Messages.editMessage(`${m.content} - Time taken: **${outTime - inTime}ms**`, m.id, evt.message.channel.id)
    });
}

export default {
  ping
};

export const help = {
  ping: {}
};
