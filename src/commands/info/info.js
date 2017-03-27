// import Promise from 'bluebird';
// import nconf from 'nconf';
// import R from 'ramda';
//
// import { getShardsCmdResults } from '../../redis';
//
//
// function botinfo(client, evt, suffix, lang, json) {
//   const server_count = {guilds: client.Guilds.length, channels: client.Channels.length, users: client.Users.length};
//
//   if (nconf.get('SHARDING') && !json) {
//     getShardsCmdResults('servers')
//       .then(R.append({results: server_count}))
//       .then(R.pluck('results'))
//       .filter(results => !R.isEmpty(results))
//       .reduce((sum, res) => R.zipObj(R.keys(res), R.map(key => sum[key] + res[key], R.keys(res))))
//       .then(res => `Connected to ${res.guilds} servers, ${res.channels} channels and ${res.users} users.`);
//
//


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
            { name: 'Owner:',
              value: 'Phun#5241',
              inline: true },
            { name: 'Library:',
              value: 'Discordie',
              inline: true },
            { name: 'FurBot Version:',
              value: '3.7.2',
              inline: true },
            { name: 'Invite:',
              value: `Use \`!invite\``,
              inline: true },
            { name: 'Donate:',
              value: `[Click Here](https://paypal.me/phunbun)`,
              inline: true },
            { name: 'FurBot Server:',
              value: `[Click Here](https://discord.gg/H7W49Ps)`,
              inline: true },
            { name: 'Shard Stats:',
              value: `**Servers:** ${client.Guilds.length}\n**Channels:** ${client.Channels.length}\n**Users:** ${client.Users.length}`,
              inline: true },
            { name: 'FurBot Stats:',
              value: `**Servers:** ${res.guilds}\n**Channels:** ${res.channels}\n**Users:** ${res.users}`,
              inline: true },
            { name: 'Shard Uptime:',
              value: `${uptimeh}h ${uptimem}m ${uptimes}s`,
              inline: true }
          ]
        };
        return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
      });
  }

  if (json) return Promise.resolve(server_count);
  return Promise.resolve(`Connected tod ${server_count.guilds} servers, ${server_count.channels} channels and ${server_count.users} users.`);
}

export const help = {info: {}};
export default {
  info: botinfo,
  servers: botinfo,
  statistics: botinfo,
  stats: botinfo
};
