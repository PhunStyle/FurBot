import Promise from 'bluebird';
import nconf from 'nconf';
import R from 'ramda';


function botinfo(client, evt) {
  const uptimeh = Math.floor(process.uptime() / (60 * 60));
  const uptimem = Math.floor(process.uptime() % (60 * 60) / 60);
  const uptimes = Math.floor(process.uptime() % 60);
  const botinfo = [];
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
      { name: 'Version:',
        value: '3.4.2',
        inline: true },
      { name: 'Servers:',
        value: client.Guilds.length,
        inline: true },
      { name: 'Channels:',
        value: client.Channels.length,
        inline: true },
      { name: 'Users:',
        value: client.Users.length,
        inline: true },
      { name: 'Uptime:',
        value: `${uptimeh}h ${uptimem}m ${uptimes}s`,
        inline: true },
      { name: 'Donate:',
        value: `[Click Here](https://paypal.me/phunbun)`,
        inline: true },
      { name: 'FurBot Server:',
        value: `[Click Here](https://discord.gg/rnvEFzQ)`,
        inline: true }
    ]
  }
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
}

export const help = {info: {}};
export default {
  info: botinfo,
  servers: botinfo,
  statistics: botinfo,
  stats: botinfo
};
