const chalk = require('chalk');
const moment = require('moment');

if (process.env.NODE_ENV === 'development') {
  console.log(`==============================================================================`);
  console.log(chalk.magenta.bold(`[FurBot]`), chalk.blue(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`), `Booting dev...`);
  require('babel-register');
  require('./src/');
} else {
  console.log(`==============================================================================`);
  console.log(chalk.magenta.bold(`[FurBot]`), chalk.blue(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`), `Booting...`);
  require('./dist');
}
