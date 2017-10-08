import Promise from 'bluebird';
import R from 'ramda';
import moment from 'moment';
import { toTitleCase } from '../../helpers';


function userinfo(client, evt, suffix) {
  const userinfo = [];
  if (evt.message.channel.isPrivate) {
    let embed = {
      color: 3901635,
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
    };
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  } else if (!suffix && !evt.message.mentions.length) {
    let user = evt.message.author.memberOf(evt.message.guild);
    let joinDate = moment(user.joined_at);
    let registeredDate = moment(user.registeredAt);
    let nowDate = moment();
    let embed = {
      color: 3901635,
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
        { name: 'Nickname:',
          value: `${user.nick ? '' + user.nick + '' : 'Nothing'}`,
          inline: true },
        { name: 'Is Bot:',
          value: user.bot,
          inline: true },
        { name: 'Joined Server:',
          value: `${joinDate.format("MMM Do YYYY, h:mm a")}`,
          inline: true },
        { name: 'Server Joined:',
          value: `${nowDate.diff(joinDate, 'days')} days ago`,
          inline: true },
        { name: 'Joined Discord:',
          value: `${registeredDate.format("MMM Do YYYY, h:mm a")}`,
          inline: true },
        { name: 'Discord Joined:',
          value: `${nowDate.diff(registeredDate, 'days')} days ago`,
          inline: true },
        { name: 'Status:',
          value: toTitleCase(user.status),
          inline: true },
        { name: 'Playing:',
          value: `${user.gameName ? '' + user.gameName + '' : 'Nothing'}`,
          inline: true }
      ],
      thumbnail: { url: evt.message.author.avatarURL }
    };
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  } else if (evt.message.mentions.length) {
    R.forEach(userMention => {
      let user = userMention.memberOf(evt.message.guild);
      let joinDate = moment(user.joined_at);
      let registeredDate = moment(user.registeredAt);
      let nowDate = moment();
      let embed = {
        color: 3901635,
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
          { name: 'Nickname:',
            value: `${user.nick ? '' + user.nick + '' : 'Nothing'}`,
            inline: true },
          { name: 'Is Bot:',
            value: user.bot,
            inline: true },
          { name: 'Joined Server:',
            value: `${joinDate.format("MMM Do YYYY, h:mm a")}`,
            inline: true },
          { name: 'Server Joined:',
            value: `${nowDate.diff(joinDate, 'days')} days ago`,
            inline: true },
          { name: 'Joined Discord:',
            value: `${registeredDate.format("MMM Do YYYY, h:mm a")}`,
            inline: true },
          { name: 'Discord Joined:',
            value: `${nowDate.diff(registeredDate, 'days')} days ago`,
            inline: true },
          { name: 'Status:',
            value: toTitleCase(user.status),
            inline: true },
          { name: 'Playing:',
            value: `${user.gameName ? '' + user.gameName + '' : 'Nothing'}`,
            inline: true }
        ],
        thumbnail: { url: user.avatarURL }
      };
      return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
    }, evt.message.mentions);
  } else {
    const userFind = R.find(R.propEq('username', suffix))(evt.message.guild.members);
    if (!userFind) return;
    let user = userFind.memberOf(evt.message.guild);
    let joinDate = moment(user.joined_at);
    let registeredDate = moment(user.registeredAt);
    let nowDate = moment();
    let embed = {
      color: 3901635,
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
        { name: 'Nickname:',
          value: `${user.nick ? '' + user.nick + '' : 'Nothing'}`,
          inline: true },
        { name: 'Is Bot:',
          value: user.bot,
          inline: true },
        { name: 'Joined Server:',
          value: `${joinDate.format("MMM Do YYYY, h:mm a")}`,
          inline: true },
        { name: 'Server Joined:',
          value: `${nowDate.diff(joinDate, 'days')} days ago`,
          inline: true },
        { name: 'Joined Discord:',
          value: `${registeredDate.format("MMM Do YYYY, h:mm a")}`,
          inline: true },
        { name: 'Discord Joined:',
          value: `${nowDate.diff(registeredDate, 'days')} days ago`,
          inline: true },
        { name: 'Status:',
          value: toTitleCase(user.status),
          inline: true },
        { name: 'Playing:',
          value: `${user.gameName ? '' + user.gameName + '' : 'Nothing'}`,
          inline: true }
      ],
      thumbnail: { url: user.avatarURL }
    };
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  }
  return Promise.resolve(userinfo);
}

export default {
  userinfo,
  whois: userinfo
};

export const help = {
  userinfo: { parameters: 'username' }
};
