import Promise from 'bluebird';
import nconf from 'nconf';
import R from 'ramda';
import { toTitleCase } from '../../helpers';


function serverinfo(client, evt, suffix) {
  if (evt.message.channel.isPrivate) return Promise.resolve('\u2139  |  Use this command in a server!');
  if (!suffix) {
    let embed = {
      color: 3901635,
      author: {
        name: `Server Info`,
        icon_url: 'http://emojipedia-us.s3.amazonaws.com/cache/bc/59/bc59d0c4fa9831e72e59d9fbb6db1c66.png' // eslint-disable-line camelcase
      },
      fields: [
        { name: 'Name:',
          value: evt.message.guild.name,
          inline: true },
        { name: 'ID:',
          value: evt.message.guild.id,
          inline: true },
        { name: 'Region:',
          value: toTitleCase(evt.message.guild.region),
          inline: true },
        { name: 'Owner:',
          value: evt.message.guild.owner.username,
          inline: true },
        { name: 'Channels:',
          value: `${evt.message.guild.textChannels.length} text & ${evt.message.guild.voiceChannels.length} voice`,
          inline: true },
        { name: 'Members:',
          value: evt.message.guild.members.length,
          inline: true }
      ],
      thumbnail: { url: evt.message.guild.iconURL },
      timestamp: new Date(evt.message.guild.createdAt),
      footer: { text: 'Created at' }
    };
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  }
  const guild = R.find(R.propEq('name', suffix))(client.Guilds);
  if (!guild || nconf.get('SHARDING')) return;
  let embed = {
    color: 3901635,
    author: {
      name: `Server Info`,
      icon_url: 'http://emojipedia-us.s3.amazonaws.com/cache/bc/59/bc59d0c4fa9831e72e59d9fbb6db1c66.png' // eslint-disable-line camelcase
    },
    fields: [
      { name: 'Name:',
        value: guild.name,
        inline: true },
      { name: 'ID:',
        value: guild.id,
        inline: true },
      { name: 'Region:',
        value: toTitleCase(guild.region),
        inline: true },
      { name: 'Owner:',
        value: guild.owner.username,
        inline: true },
      { name: 'Channels:',
        value: `${guild.textChannels.length} text & ${guild.voiceChannels.length} voice`,
        inline: true },
      { name: 'Members:',
        value: guild.members.length,
        inline: true }
    ],
    thumbnail: { url: guild.iconURL },
    timestamp: new Date(guild.createdAt),
    footer: { text: 'Created at' }
  };
  return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
}

export const help = {
  serverinfo: {parameters: ['servername']}
};

export default {
  serverinfo
};
