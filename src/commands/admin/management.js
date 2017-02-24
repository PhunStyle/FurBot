import nconf from 'nconf';

function leaveGuild(client, evt, suffix) {
  if (evt.message.author.id === nconf.get('OWNER_ID')) {
    let guildtoleave = client.Guilds.get(suffix);
    return guildtoleave.leave();
  }
}

function inviteGuild(client, evt, suffix) {
  if (evt.message.author.id === nconf.get('OWNER_ID')) {
    let guildtoleave = client.Guilds.get(suffix);
    guildtoleave.createInvite({ max_age: 86400, max_uses: 0, temporary: false })
    .then(res => {
      evt.message.channel.sendMessage(res.code);
    });
  }
}

export default {
  leaveguild: leaveGuild,
  inviteguild: inviteGuild
};
