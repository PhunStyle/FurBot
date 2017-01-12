import Promise from 'bluebird';
import nconf from 'nconf';
import R from 'ramda';
import { getOrdinal, numberWithCommas, secondDec, toTitleCase } from '../../helpers';


function userinfo(client, evt, suffix) {
  const userinfo = [];
  if (evt.message.channel.isPrivate) {
    let embed = {
      color: 29695,
      author: {
        name: `User Info`,
        icon_url: 'http://emojipedia-us.s3.amazonaws.com/cache/bc/59/bc59d0c4fa9831e72e59d9fbb6db1c66.png' // eslint-disable-line camelcase
      },
      fields: [
        { name: 'User:',
          value: `${evt.message.author.username}#${evt.message.author.discriminator}`,
          inline: true },
        { name: 'ID:',
          value: evt.message.author.id,
          inline: true },
        { name: 'Status:',
          value: toTitleCase(evt.message.author.status),
          inline: true },
        { name: 'Playing:',
          value: `${evt.message.author.gameName ? '(Playing ' + evt.message.author.gameName + ')' : 'Nothing'}`,
          inline: true }
      ],
      thumbnail: { url: evt.message.author.avatarURL },
      timestamp: new Date(evt.message.author.registeredAt),
      footer: { text: 'Registered at' }
    }
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  } else if (!suffix && !evt.message.mentions.length) {
    let embed = {
      color: 29695,
      author: {
        name: `User Info`,
        icon_url: 'http://emojipedia-us.s3.amazonaws.com/cache/bc/59/bc59d0c4fa9831e72e59d9fbb6db1c66.png' // eslint-disable-line camelcase
      },
      fields: [
        { name: 'User:',
          value: `${evt.message.author.username}#${evt.message.author.discriminator}`,
          inline: true },
        { name: 'ID:',
          value: evt.message.author.id,
          inline: true },
        { name: 'Status:',
          value: toTitleCase(evt.message.author.status),
          inline: true },
        { name: 'Playing:',
          value: `${evt.message.author.gameName ? '(Playing ' + evt.message.author.gameName + ')' : 'Nothing'}`,
          inline: true }
      ],
      thumbnail: { url: evt.message.author.avatarURL },
      timestamp: new Date(evt.message.author.registeredAt),
      footer: { text: 'Registered at' }
    }
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  } else if (evt.message.mentions.length) {
    R.forEach(user => {
      let embed = {
        color: 29695,
        author: {
          name: `User Info`,
          icon_url: 'http://emojipedia-us.s3.amazonaws.com/cache/bc/59/bc59d0c4fa9831e72e59d9fbb6db1c66.png' // eslint-disable-line camelcase
        },
        fields: [
          { name: 'User:',
            value: `${user.username}#${user.discriminator}`,
            inline: true },
          { name: 'ID:',
            value: user.id,
            inline: true },
          { name: 'Status:',
            value: toTitleCase(user.status),
            inline: true },
          { name: 'Playing:',
            value: `${user.gameName ? '(Playing ' + user.gameName + ')' : 'Nothing'}`,
            inline: true }
        ],
        thumbnail: { url: user.avatarURL },
        timestamp: new Date(user.registeredAt),
        footer: { text: 'Registered at' }
      }
      return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
    }, evt.message.mentions);
  } else {
    const user = R.find(R.propEq('username', suffix))(evt.message.guild.members);
    if (!user) return;
    let embed = {
      color: 29695,
      author: {
        name: `User Info`,
        icon_url: 'http://emojipedia-us.s3.amazonaws.com/cache/bc/59/bc59d0c4fa9831e72e59d9fbb6db1c66.png' // eslint-disable-line camelcase
      },
      fields: [
        { name: 'User:',
          value: `${user.username}#${user.discriminator}`,
          inline: true },
        { name: 'ID:',
          value: user.id,
          inline: true },
        { name: 'Status:',
          value: toTitleCase(user.status),
          inline: true },
        { name: 'Playing:',
          value: `${user.gameName ? '(Playing ' + user.gameName + ')' : 'Nothing'}`,
          inline: true }
      ],
      thumbnail: { url: user.avatarURL },
      timestamp: new Date(user.registeredAt),
      footer: { text: 'Registered at' }
    }
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  }
  return Promise.resolve(userinfo);
}

export const help = {
  userinfo: {parameters: ['username']}
};

export default {
  userinfo,
  whois: userinfo
};
