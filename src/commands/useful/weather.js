import NodeGeocoder from 'node-geocoder';
import Promise from 'bluebird';
import nconf from 'nconf';
import DarkSky from 'dark-sky';


const forecast = new DarkSky(nconf.get('DARKSKY_KEY'));
const options = { provider: 'google' };
const geocoder = NodeGeocoder(options);


function weather(client, evt, suffix) {
  let weatherData;
  let getGeolocation = function(location) {
    return geocoder.geocode(location)
    .then(res => {
      weatherData = res;
      return forecast.latitude(res[0].latitude).longitude(res[0].longitude).units('auto').get();
    })
  };
  getGeolocation(suffix)
  .then(final => {
    console.log(weatherData);
    console.log(final);
    let units;
    if (final.flags.units === 'si'){
      units = ['° C', ' Km'];
    } else {
      units = ['° F', ' M'];
    }
    let embed = {
      color: 6697881,
      author: {
        name: `Weather report for ${weatherData[0].formattedAddress}`,
        icon_url: 'https://cdn.discordapp.com/avatars/174186616422662144/e6b8c266186a60f6b947d1635c09459e.jpg' // eslint-disable-line camelcase
      },
      description: `${final.hourly.summary}`,
      fields: [
        { name: '\uD83C\uDF21 Temperature:',
          value: `${final.currently.temperature}${units[0]}`,
          inline: true },
        { name: '\u2600 Sunrise:',
          value: `${final.daily.data[0].sunriseTime}`,
          inline: true },
        { name: '\uD83C\uDF15 Sunset:',
          value: `${final.daily.data[0].sunsetTime}`,
          inline: true },
        { name: '\uD83D\uDCA8 Wind:',
          value: `${final.currently.windSpeed}${units[1]}/hour`,
          inline: true },
        { name: '\uD83D\uDCA7 Humidity:',
          value: `${final.currently.humidity}`,
          inline: true },
        { name: '\uD83D\uDC41 Visibility:',
          value: `${final.currently.visibility}${units[1]}`,
          inline: true }
      ],
      timestamp: new Date()
    };
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  })
  return Promise.resolve(true);
}

export default {
  weather,
  forecast: weather
};

export const help = {
  weather: {parameters: ['place']}
};
