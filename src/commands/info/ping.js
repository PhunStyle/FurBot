function ping(client, evt) {
  let pong = { color: 3901635, description: '\u2139 Pong!' };
  return evt.message.channel.sendMessage('', false, pong)
  .then(m => {
    let outTime = new Date(m.timestamp).getTime();
    let inTime = new Date(evt.message.timestamp).getTime();
    pong.description = `\u2139 Pong! - Time taken: **${outTime - inTime}ms**`;
    client.Messages.editMessage('', m.id, evt.message.channel.id, pong);
  });
}

export default {
  ping
};

export const help = {
  ping: {}
};
