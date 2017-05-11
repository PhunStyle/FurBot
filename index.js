const chalk = require('chalk');
const moment = require('moment');

if (process.env.NODE_ENV === 'development') {
  console.log(`==============================================================================`);
  console.log(chalk.magenta.bold(`[FurBot]`), chalk.blue(`[${moment().format('DD-MM-YYYY HH:mm:ss')}]`), `Booting dev...`);
  require('babel-register');
  require('babel-polyfill');
  require('./src/');
} else {
  console.log(`==============================================================================`);
  console.log(chalk.magenta.bold(`[FurBot]`), chalk.blue(`[${moment().format('DD-MM-YYYY HH:mm:ss')}]`), `Booting...`);
  require('babel-polyfill');
  require('./dist');
}
