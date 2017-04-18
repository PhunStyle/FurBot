import bunyan from 'bunyan';
import chalk from 'chalk';
import moment from 'moment';
import nconf from 'nconf';
import R from 'ramda';

const production = (nconf.get('NODE_ENV') === 'production');
const config = {name: 'furbot'};
if (nconf.get('SHARDING') && nconf.get('SHARD_NUMBER')) config.shard_number = nconf.get('SHARD_NUMBER');
const logger = bunyan.createLogger(config);


function _submitToLogger(type, msg) {
  if (R.is(Object, msg)) return logger[type](msg, msg.message || '');
  return logger[type](msg);
}

function cmd(cmd, evt, suffix) {
  if (production) return logger.info({cmd, evt, suffix}, 'cmd');
  console.log(chalk.magenta.bold(`[FurBot]`), chalk.blue(`[${moment().format('DD-MM-YYYY HH:mm:ss')}]`), chalk.bold.green(`[${evt.message.guild.id}]`), chalk.bold.green(`[${evt.message.author.username}]`), chalk.green(`${nconf.get('PREFIX')}${cmd}`), suffix);
}

function info(msg) {
  if (production) return _submitToLogger('info', msg);
  console.log(chalk.magenta.bold(`[FurBot]`), chalk.blue(`[${moment().format('DD-MM-YYYY HH:mm:ss')}]`), msg);
}

function blank(msg) {
  if (production) return _submitToLogger('blank', msg);
  console.log(`==============================================================================`);
}

function success(msg) {
  if (production) return _submitToLogger('success', msg);
  console.log(chalk.magenta.bold(`[FurBot]`), chalk.blue(`[${moment().format('DD-MM-YYYY HH:mm:ss')}]`), chalk.green(`${msg}`));
}

function warn(msg) {
  if (production) return _submitToLogger('warn', msg);
  console.log(chalk.magenta.bold(`[FurBot]`), chalk.blue(`[${moment().format('DD-MM-YYYY HH:mm:ss')}]`), chalk.yellow(`[WARN] ${msg}`));
}

function error(msg) {
  if (production) return _submitToLogger('error', msg);
  console.log(chalk.magenta.bold(`[FurBot]`), chalk.blue(`[${moment().format('DD-MM-YYYY HH:mm:ss')}]`), chalk.red(`[ERROR] ${msg} ++`));
}


export default {cmd, info, blank, success, warn, error};
