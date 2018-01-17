import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import request from 'request';
import moment from 'moment';

import T from '../../translate';
import logger from '../../logger';
import { getObjects } from '../../helpers';


function downloadFile(url, target, cb) {
  logger.info(`Downloading a new coin_list file...`);
  return new Promise((resolve, reject) => {
    let req = request(url).pipe(fs.createWriteStream(target));
    req.on('error', err => reject(err));
    req.on('finish', () => {
      req.close(cb);
    });
  });
}

function crypto(client, evt, suffix) {
  if (!suffix) return evt.message.channel.sendMessage(`${T('crypto_usage')}`);
  let coinID;
  let coinName;
  let coinSymbol;

  let coinPriceBTC;
  let coinPriceUSD;
  let coinPriceEUR;

  let coinRank;
  let coinVolume;
  let coinMarketCap;
  let coinSupply;

  let coinChange1h;
  let coinChange24h;
  let coinChange7d;
  let coinUp = '<:indicator_up:401452533194817556>';
  let coinDown = '<:indicator_down:401452533031370773>';

  let coinImageBaseUrl = 'https://files.coinmarketcap.com/static/img/coins/128x128/';
  let coinImage;

  let oldFile = false;
  suffix = suffix.toLowerCase();

  fs.stat(path.join(__dirname, '../../static/coin_list.json'), (err, stats) => {
    if (err) throw err;
    let dateNow = moment();
    let dateFile = moment(stats.mtime);
    if (dateNow.diff(dateFile, 'hours') > 1) {
      logger.info(`The coin_list file is older than the specified age`);
      oldFile = true;
    }
    if (oldFile) {
      downloadFile('https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=0', path.join(__dirname, '../../static/coin_list.json'), handleFile);
    }
    if (!oldFile) {
      handleFile();
    }
  });

  function handleFile(err, file) {
    if (err) throw err;
    oldFile = false;

    let coin_list_raw = fs.readFileSync(path.join(__dirname, '../../static/coin_list.json'));
    let coin_list = JSON.parse(coin_list_raw);

    let foundName = getObjects(coin_list, 'name', suffix);
    let foundSymbol = getObjects(coin_list, 'symbol', suffix);

    if (foundName.length === 1) {
      coinID = foundName[0].id;
      coinName = foundName[0].name;
      coinSymbol = foundName[0].symbol;
      coinPriceBTC = foundName[0].price_btc;
      coinPriceUSD = foundName[0].price_usd;
      coinPriceEUR = foundName[0].price_eur;
      coinRank = foundName[0].rank;
      coinVolume = foundName[0]['24h_volume_usd'];
      coinMarketCap = foundName[0].market_cap_usd;
      coinSupply = foundName[0].available_supply;
      coinChange1h = `**Hour:** ${coinUp} ${foundName[0].percent_change_1h}%`;
      if (foundName[0].percent_change_1h.startsWith('-')) {
        coinChange1h = `**Hour:** ${coinDown} ${foundName[0].percent_change_1h}%`;
      }
      coinChange24h = `**Day:** ${coinUp} ${foundName[0].percent_change_24h}%`;
      if (foundName[0].percent_change_24h.startsWith('-')) {
        coinChange24h = `**Day:** ${coinDown} ${foundName[0].percent_change_24h}%`;
      }
      coinChange7d = `**Week:** ${coinUp} ${foundName[0].percent_change_7d}%`;
      if (foundName[0].percent_change_7d.startsWith('-')) {
        coinChange7d = `**Week:** ${coinDown} ${foundName[0].percent_change_7d}%`;
      }
      coinImage = `${coinImageBaseUrl}${foundName[0].id}.png`;
      presentData();
    }
    if (foundSymbol.length === 1) {
      coinID = foundSymbol[0].id;
      coinName = foundSymbol[0].name;
      coinSymbol = foundSymbol[0].symbol;
      coinPriceBTC = foundSymbol[0].price_btc;
      coinPriceUSD = foundSymbol[0].price_usd;
      coinPriceEUR = foundSymbol[0].price_eur;
      coinRank = foundSymbol[0].rank;
      coinVolume = foundSymbol[0]['24h_volume_usd'];
      coinMarketCap = foundSymbol[0].market_cap_usd;
      coinSupply = foundSymbol[0].available_supply;
      coinChange1h = `**Hour:** ${coinUp} ${foundSymbol[0].percent_change_1h}%`;
      if (foundSymbol[0].percent_change_1h.startsWith('-')) {
        coinChange1h = `**Hour:** ${coinDown} ${foundSymbol[0].percent_change_1h}%`;
      }
      coinChange24h = `**Day:** ${coinUp} ${foundSymbol[0].percent_change_24h}%`;
      if (foundSymbol[0].percent_change_24h.startsWith('-')) {
        coinChange24h = `**Day:** ${coinDown} ${foundSymbol[0].percent_change_24h}%`;
      }
      coinChange7d = `**Week:** ${coinUp} ${foundSymbol[0].percent_change_7d}%`;
      if (foundSymbol[0].percent_change_7d.startsWith('-')) {
        coinChange7d = `**Week:** ${coinDown} ${foundSymbol[0].percent_change_7d}%`;
      }
      coinImage = `${coinImageBaseUrl}${foundSymbol[0].id}.png`;
      presentData();
    }
  }

  function presentData() {
    let embed = {
      color: 16225050,
      author: {
        name: `${coinName} (${coinSymbol})`,
        icon_url: coinImage
      },
      url: `https://coinmarketcap.com/currencies/${coinID}`,
      fields: [
        { name: 'Price',
          value: `<:icon_bitcoin:402174668620038154> ${coinPriceBTC} BTC\n<:icon_dollarsign:402174668620169221> ${coinPriceUSD} USD\n<:icon_euro:402174668045418497> ${coinPriceEUR} EUR`,
          inline: true },
        { name: 'Changes',
          value: ` ${coinChange1h}\n${coinChange24h}\n${coinChange7d}`,
          inline: true },
        { name: 'Coin Information',
          value: `**Rank:** ${coinRank}\n**Market Cap:** ${coinMarketCap}\n**24H Volume (USD)** ${coinVolume}\n**Supply:** ${coinSupply}`,
          inline: true }
      ],
      thumbnail: { url: coinImage }
    };
    return evt.message.channel.sendMessage('', false, embed);
  }
}

export default {
  crypto,
  crp: crypto
};

export const help = {
  crypto: {}
};
