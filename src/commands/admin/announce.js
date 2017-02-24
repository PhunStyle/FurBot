import nconf from 'nconf';

function announceMessage(client, evt, suffix) {
  if (evt.message.author.id === nconf.get('OWNER_ID')) {
    let server_array = client.Guilds.toArray();
    let result = server_array.map(server => { return server.generalChannel; });
    result.forEach(serverChannelID => {
      serverChannelID.sendMessage(suffix);
    });
  }
}

export default {
  announce: announceMessage
};
