import { setGuildCooldown, getGuildCooldown } from '../../redis';

function cooldown(client, evt, suffix) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139 Use this command in a server!`});

  if (!suffix) {
    return getGuildCooldown(evt.message.guild.id)
    .then(guildCooldown => { return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139 Currently \`COOLDOWN\` is set to: \`${guildCooldown}\` seconds.`})});
  }

  let userPerms = evt.message.author.permissionsFor(evt.message.guild);
  if (evt.message.author.can(userPerms.General.MANAGE_GUILD, evt.message.guild)) {
    let cooldownToSet = suffix;

    if (isNaN(cooldownToSet)) return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0 Cooldown can only be of type \`Number\``});

    if (cooldownToSet < 5 || cooldownToSet > 120) return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0 Cooldown can only be a value between \`5\` and \`120\``});

    return setGuildCooldown(evt.message.guild.id, cooldownToSet)
    .then(() => evt.message.channel.sendMessage('', false, {color: 4437377, description: `<:greenTick:405749911037018125> New command cooldown has been set to \`${cooldownToSet}\` seconds!`}));
  }

  return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  You do not have the "Manage Server" permission.`});
}

export default {
  cooldown
};

export const help = {
  cooldown: { parameters: 'seconds' }
};
