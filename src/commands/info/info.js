import Promise from 'bluebird';
import nconf from 'nconf';
import R from 'ramda';

import { getShardsCmdResults } from '../../redis';


function botinfo(client, evt, suffix, lang, json) {
  const server_count = {guilds: client.Guilds.length, channels: client.Channels.length, users: client.Users.length};

  if (nconf.get('SHARDING') && !json) {
    return getShardsCmdResults('servers')
      .then(R.append({results: server_count}))
      .then(R.pluck('results'))
      .filter(results => !R.isEmpty(results))
      .reduce((sum, res) => R.zipObj(R.keys(res), R.map(key => sum[key] + res[key], R.keys(res))))
      .then(res => {
        const uptimeh = Math.floor(process.uptime() / (60 * 60));
        const uptimem = Math.floor(process.uptime() % (60 * 60) / 60);
        const uptimes = Math.floor(process.uptime() % 60);
        let embed = {
          color: 2455143,
          author: {
            name: `FurBot Info`,
            icon_url: 'https://cdn.discordapp.com/avatars/174186616422662144/e6b8c266186a60f6b947d1635c09459e.jpg' // eslint-disable-line camelcase
          },
          fields: [
            { name: '\uD83D\uDD75\uD83C\uDFFC Owner:',
              value: 'Phun#5241',
              inline: true },
            { name: '\uD83E\uDD16 Version:',
              value: 'FurBot 3.8.0',
              inline: true },
            { name: '\uD83D\uDCDA Library:',
              value: 'Discordie^0.11.0',
              inline: true },
            { name: '\uD83D\uDEE1 Guilds:',
              value: `${res.guilds}`,
              inline: true },
            { name: '\uD83D\uDCD4 Channels:',
              value: `${res.channels}`,
              inline: true },
            { name: '\uD83D\uDC65 Users:',
              value: `${res.users}`,
              inline: true },
            { name: '\uD83D\uDCEC Invite:',
              value: `[Click Here](https://discordapp.com/oauth2/authorize?&client_id=174176308396425217&scope=bot&permissions=268561430)`,
              inline: true },
            { name: '\uD83D\uDCB5 Patreon:',
              value: `[Click Here](https://www.patreon.com/bePatron?u=5578447)`,
              inline: true },
            { name: '\uD83D\uDEAA FurBot Server:',
              value: `[Click Here](https://discord.gg/H7W49Ps)`,
              inline: true }
          ]
        };
        let embed2 = {
          color: 2455143,
          author: {
            name: `Shard Info`,
            icon_url: 'https://cdn.discordapp.com/avatars/174186616422662144/e6b8c266186a60f6b947d1635c09459e.jpg' // eslint-disable-line camelcase
          },
          fields: [
            { name: '\uD83D\uDEE1 Guilds:',
              value: `${client.Guilds.length}`,
              inline: true },
            { name: '\uD83D\uDCD4 Channels:',
              value: `${client.Channels.length}`,
              inline: true },
            { name: '\uD83D\uDC65 Users:',
              value: `${client.Users.length}`,
              inline: true },
            { name: '\uD83D\uDC8E Shard ID:',
              value: `Shard ${Number(nconf.get('SHARD_NUMBER')+1)} of ${Number(nconf.get('SHARD_COUNT'))}`,
              inline: true },
            { name: '\uD83E\uDD16 Shard Uptime:',
              value: `${uptimeh}h ${uptimem}m ${uptimes}s`,
              inline: true },
            { name: '\u200C',
              value: '\u200C',
              inline: true }
          ]
        };
        Promise.resolve(evt.message.channel.sendMessage('', false, embed));
        return Promise.resolve(evt.message.channel.sendMessage('', false, embed2));
     });
  }
  if (json) return Promise.resolve(server_count);
  return Promise.resolve(`Connected to ${server_count.guilds} servers, ${server_count.channels} channels and ${server_count.users} users.`);
}

export const help = {info: {}};
export default {
  info: botinfo,
  servers: botinfo,
  statistics: botinfo,
  stats: botinfo
};
