import Promise from 'bluebird';
import { EventEmitter } from 'events';
import nconf from 'nconf';
import redis from 'redis';

import logger from './logger';
import sentry from './sentry';

let argv = require('minimist')(process.argv.slice(2));

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const client_url = nconf.get('REDIS_URL') || nconf.get('REDISCLOUD_URL') || 'redis://127.0.0.1:6379';
const client = redis.createClient({url: client_url});
export default client;


function createLoggers(redisClient, type) {
  redisClient.on('connect', () => logger.info(`Redis ${type} connected`));
  redisClient.on('reconnecting', () => logger.warn(`Redis ${type} reconnecting`));
  redisClient.on('ready', () => logger.info(`Redis ${type} ready`));
  redisClient.on('end', () => logger.info(`Redis ${type} has closed`));
  redisClient.on('error', err => sentry(err, 'redis'));
}

createLoggers(client, 'default');


export function createDuplicateClient(name) {
  const pubsubClient = client.duplicate();
  createLoggers(pubsubClient, name);
  return pubsubClient;
}

// Sharding
export const publisher = createDuplicateClient('publisher');
export const subscriber = createDuplicateClient('subscriber');
export const ee = new EventEmitter();
subscriber.on('message', (channel, message) => ee.emit(channel, message));

// Verifies all redis clients are connected then returns.
export function waitForConnections() {
  return Promise.map([client, publisher, subscriber], instance => {
    if (instance.connected) return;
    return new Promise(resolve => instance.on('ready', resolve));
  });
}

// Gets a users language based on ID
export function getUserLang(user_id) {
  return client.hgetAsync(`user_${user_id}`, 'lang')
    .then(lang => lang || 'en')
    .timeout(2000)
    .catch(err => {
      sentry(err, 'getUserLang');
      return 'en';
    });
}

// Sets a users language based on ID
export function setUserLang(user_id, lang) {
  return client.hsetAsync(`user_${user_id}`, 'lang', lang)
    .timeout(2000)
    .catch(err => {
      sentry(err, 'setUserLang');
    });
}

export function setBlackListRemove(channel_id, value) {
  return client.hsetAsync(`channel_${channel_id}`, 'blacklist_strict', value)
    .timeout(2000)
    .catch(err => {
      sentry(err, 'setBlackListHide');
    });
}

export function getBlackListRemove(channel_id) {
  return client.hgetAsync(`channel_${channel_id}`, 'blacklist_strict')
    .then(value => value || 'false')
    .timeout(2000)
    .catch(err => {
      sentry(err, 'getBlackListHide');
      return 'false';
    });
}

export function setBlackListChannel(channel_id, blacklist) {
  return client.hsetAsync(`channel_${channel_id}`, 'blacklist', blacklist)
    .timeout(2000)
    .catch(err => {
      sentry(err, 'setBlackListChannel');
    });
}

export function getBlackListChannel(channel_id) {
  return client.hgetAsync(`channel_${channel_id}`, 'blacklist')
    .then(blacklist => blacklist || null)
    .timeout(2000)
    .catch(err => {
      sentry(err, 'getBlackListChannel');
      return;
    });
}

export function setUserAction(user_id, action) {
  return client.hincrbyAsync(`user_${user_id}`, action, 1)
    .timeout(2000)
    .catch(err => {
      sentry(err, 'setUserAction');
    });
}

export function getUserAction(user_id) {
  return client.hgetallAsync(`user_${user_id}`)
    .timeout(2000)
    .catch(err => {
      sentry(err, 'setUserAction');
    });
}

export function delBlackListChannel(channel_id) {
  return client.hdelAsync(`channel_${channel_id}`, 'blacklist')
    .timeout(2000)
    .catch(err => {
      sentry(err, 'delBlackListChannel');
    });
}

export function getMessageTTL(user_id) {
  return client.multi()
    .get(`ttl_${user_id}`)
    .ttl(`ttl_${user_id}`)
    .execAsync()
    .timeout(2000)
    .catch(err => {
      sentry(err, 'getMessageTTL');
      return false;
    });
}

export function setMessageTTL(user_id, time) {
  const key = `ttl_${user_id}`;
  return client.multi()
    .set(key, 1)
    .expire(key, time)
    .execAsync()
    .timeout(2000)
    .catch(err => {
      sentry(err, 'setMessageTTL');
    });
}

export function getShardsCmdResults(cmd, suffix = '', lang = '') {
  return new Promise((resolve, reject) => {
    const channel_name = `${cmd}_${new Date().getTime()}`;
    const results = [];

    ee.on(channel_name, result => {
      results.push(JSON.parse(result));
      if (results.length === argv.shardcount - 1) {
        subscriber.unsubscribe(channel_name);
        resolve(results);
      }
    });

    subscriber.subscribe(channel_name);
    publisher.publish('cmd', JSON.stringify({
      channel_name,
      instance: argv.shardid,
      request: {cmd, suffix, lang}
    }));
  }).timeout(15000);
}
