import Promise from 'bluebird';
import nconf from 'nconf';
import R from 'ramda';
import { getOrdinal, numberWithCommas, secondDec, toTitleCase } from '../../helpers';


function channelinfo(client, evt, suffix) {
  const channelinfo = [];
  if (evt.message.channel.isPrivate) return Promise.resolve('\u2139  |  Use this command in a server!');
  if (!suffix && evt.message.content.indexOf('<#') === -1) {
    let output = `\n`;
    let embed = {
      color: 29695,
      author: {
        name: `Channel Info`,
        icon_url: 'http://emojipedia-us.s3.amazonaws.com/cache/bc/59/bc59d0c4fa9831e72e59d9fbb6db1c66.png' // eslint-disable-line camelcase
      },
      fields: [
        { name: 'Name:',
          value: evt.message.channel.name,
          inline: true },
        { name: 'ID:',
          value: evt.message.channel.id,
          inline: true },
        { name: 'Type:',
          value: evt.message.channel.type,
          inline: true },
        { name: 'Position:',
          value: evt.message.channel.position,
          inline: true },
        { name: 'New Messages:',
          value: `${evt.message.channel.messages.length} (since last reboot)`,
          inline: true },
        { name: 'Topic:',
          value: `${evt.message.channel.topic ? evt.message.channel.topic : 'Nothing'}`,
          inline: true }
      ],
      timestamp: new Date(evt.message.channel.createdAt),
      footer: { text: 'Created at' }
    }
    return Promise.resolve(evt.message.channel.sendMessage(output, false, embed));
  } else if (evt.message.content.indexOf('<#') !== -1) {
    R.forEach(suffix => {
    const channel = R.find(R.propEq('id', suffix.substring(2, suffix.length - 1)))(evt.message.guild.channels);
      if (channel.type === 0) {
        let output = `\n`;
        let embed = {
          color: 29695,
          author: {
            name: `Channel Info`,
            icon_url: 'http://emojipedia-us.s3.amazonaws.com/cache/bc/59/bc59d0c4fa9831e72e59d9fbb6db1c66.png' // eslint-disable-line camelcase
          },
          fields: [
            { name: 'Name:',
              value: channel.name,
              inline: true },
            { name: 'ID:',
              value: channel.id,
              inline: true },
            { name: 'Type:',
              value: channel.type,
              inline: true },
            { name: 'Position:',
              value: channel.position,
              inline: true },
            { name: 'New Messages:',
              value: `${channel.messages.length} (since last reboot)`,
              inline: true },
            { name: 'Topic:',
              value: `${channel.topic ? channel.topic : 'Nothing'}`,
              inline: true }
          ],
          timestamp: new Date(channel.createdAt),
          footer: { text: 'Created at' }
        }
        return Promise.resolve(evt.message.channel.sendMessage(output, false, embed));
      } else {
      let output = `\n`;
      let embed = {
        color: 29695,
        author: {
          name: `Channel Info`,
          icon_url: 'http://emojipedia-us.s3.amazonaws.com/cache/bc/59/bc59d0c4fa9831e72e59d9fbb6db1c66.png' // eslint-disable-line camelcase
        },
        fields: [
          { name: 'Name:',
            value: channel.name,
            inline: true },
          { name: 'ID:',
            value: channel.id,
            inline: true },
          { name: 'Type:',
            value: channel.type,
            inline: true },
          { name: 'Position:',
            value: channel.position,
            inline: true },
          { name: 'Bitrate:',
            value: channel.bitrate,
            inline: true },
          { name: 'User Limit:',
            value: channel.user_limit,
            inline: true }
        ],
        timestamp: new Date(channel.createdAt),
        footer: { text: 'Created at' }
      }
      return Promise.resolve(evt.message.channel.sendMessage(output, false, embed));
      }
    }, suffix.split(' '));
    } else {
      const channel = R.find(R.propEq('name', suffix))(evt.message.guild.channels);
      if (!channel) return;
      if (channel.type === 0) {
        let output = `\n`;
        let embed = {
          color: 29695,
          author: {
            name: `Channel Info`,
            icon_url: 'http://emojipedia-us.s3.amazonaws.com/cache/bc/59/bc59d0c4fa9831e72e59d9fbb6db1c66.png' // eslint-disable-line camelcase
          },
          fields: [
            { name: 'Name:',
              value: channel.name,
              inline: true },
            { name: 'ID:',
              value: channel.id,
              inline: true },
            { name: 'Type:',
              value: channel.type,
              inline: true },
            { name: 'Position:',
              value: channel.position,
              inline: true },
            { name: 'New Messages:',
              value: `${channel.messages.length} (since last reboot)`,
              inline: true },
            { name: 'Topic:',
              value: `${channel.topic ? channel.topic : 'Nothing'}`,
              inline: true }
          ],
          timestamp: new Date(channel.createdAt),
          footer: { text: 'Created at' }
        }
        return Promise.resolve(evt.message.channel.sendMessage(output, false, embed));
      } else {
        let output = `\n`;
        let embed = {
          color: 29695,
          author: {
            name: `Channel Info`,
            icon_url: 'http://emojipedia-us.s3.amazonaws.com/cache/bc/59/bc59d0c4fa9831e72e59d9fbb6db1c66.png' // eslint-disable-line camelcase
          },
          fields: [
            { name: 'Name:',
              value: channel.name,
              inline: true },
            { name: 'ID:',
              value: channel.id,
              inline: true },
            { name: 'Type:',
              value: channel.type,
              inline: true },
            { name: 'Position:',
              value: channel.position,
              inline: true },
            { name: 'Bitrate:',
              value: channel.bitrate,
              inline: true },
            { name: 'User Limit:',
              value: channel.user_limit,
              inline: true }
          ],
          timestamp: new Date(channel.createdAt),
          footer: { text: 'Created at' }
        }
        return Promise.resolve(evt.message.channel.sendMessage(output, false, embed));
      }
  }
  return Promise.resolve(channelinfo);
}

export const help = {
  channelinfo: {parameters: ['channelname']}
};

export default {
  channelinfo
};
