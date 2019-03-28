import { setGuildPrefix, getGuildPrefix } from '../../redis';

function prefix(client, evt, suffix) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139 Use this command in a server!`});
  let userPerms = evt.message.author.permissionsFor(evt.message.guild);
  if (evt.message.author.can(userPerms.General.MANAGE_GUILD, evt.message.guild)) {
    let prefixToSet = suffix;

    if (prefixToSet.length > 2 || prefixToSet.length < 1) return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0 Prefix can only be 1 or 2 characters long!`});

    let result;
    const patt = new RegExp(/[A-Za-z0-9_.,!^*\-+=$&%@#?]{1}/i);
    const patt2 = new RegExp(/[A-Za-z0-9_.,!^*\-+=$&%@#?]{2}/i);
    if (prefixToSet.length === 1) result = patt.test(prefixToSet);
    if (prefixToSet.length === 2) result = patt2.test(prefixToSet);

    if (!result) return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0 Prefix can only contain \`A-Z a-z 0-9 _ , . ! ^ * - + = $ & % # @ ?\``});

    return setGuildPrefix(evt.message.guild.id, prefixToSet)
    .then(() => evt.message.channel.sendMessage('', false, {color: 4437377, description: `<:greenTick:405749911037018125> New prefix \`${prefixToSet}\` has been set!`}));
  };

  return evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0  You do not have the "Manage Server" permission.`});
}

export default {
  prefix
};

export const help = {
  prefix: { parameters: 'prefix' }
};
