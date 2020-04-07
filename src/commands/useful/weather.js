import NodeGeocoder from 'node-geocoder';
import Promise from 'bluebird';
import R from 'ramda';
import nconf from 'nconf';
import DarkSky from 'dark-sky';
import moment from 'moment-timezone';
import _request from 'request';

const forecast = new DarkSky(nconf.get('DARKSKY_KEY'));
const options = { provider: 'google' };
const geocoder = NodeGeocoder(options);
const request = Promise.promisify(_request);


function _makeRequest(options) {
  let default_options = {
    json: true,
    headers: {
      'User-Agent': 'PhunStyle/FurBot @ GitHub',
      'x-rapidapi-host': 'trueway-geocoding.p.rapidapi.com',
      'x-rapidapi-key': 'DUOUuBRwUrmshCg8eg6XSYyOjDBQp1dD3NYjsnE5ul5jvMhddA'
    }
  };

  if (options.qs) options.qs = R.merge(default_options.qs, options.qs);
  return request(R.merge(default_options, options, true))
    .tap(res => {
      // if (res.statusCode === 521) throw new ApiDown();
    })
    .then(R.prop('body'))
    .tap(body => {
      // if (body.error) throw new Error(body.error);
    });
}

function weather(client, evt, suffix) {
  const bot_avatar = client.User.getAvatarURL({format: 'png', size: 256, preferAnimated: false});

  let weatherData;

  let getGeolocation = function(location) {
    const options = {
      url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
      qs: {
        language: 'en',
        address: suffix
      }
    };
    return _makeRequest(options)
    .then(res => {
      weatherData = res.results[0];
      return forecast.latitude(weatherData.location.lat).longitude(weatherData.location.lng).units('auto').get();
    })
    .catch(err => {
      let embed = { color: 15747399, description: `<:redTick:405749796603822080> Something went wrong, please [**notify**](https://discord.gg/TYr4PkZ) the developer!` };
      evt.message.channel.sendMessage('', false, embed);
    });
  };

  getGeolocation(suffix)
  .then(final => {
    let units;

    if (final.flags.units === 'si') {
      units = ['° C', ' km', 'km/h', 'HH:MM:ss'];
    } else {
      units = ['° F', ' Miles', 'mph', 'h:mm:ss a'];
    }

    let sunriseTime;
    let sunsetTime;
    let humidity;

    if (!final.currently.visibility) final.currently.visibility = '10+';
    if (!final.daily.data[0].sunriseTime) sunriseTime = 'Unknown';
    if (!final.daily.data[0].sunsetTime) sunsetTime = 'Unknown';
    if (final.currently.humidity) humidity = final.currently.humidity * 100;

    if (final.daily.data[0].sunsetTime) {
      let t = moment.unix(final.daily.data[0].sunriseTime);
      sunriseTime = moment(t).tz(final.timezone).format(units[3]);

      let u = moment.unix(final.daily.data[0].sunsetTime);
      sunsetTime = moment(u).tz(final.timezone).format(units[3]);
    }

    let embed = {
      color: 6697881,
      author: {
        name: `Weather report for ${weatherData.address}`,
        icon_url: bot_avatar
      },
      description: `${final.hourly.summary}`,
      fields: [
        { name: '\uD83C\uDF21 Temperature:',
          value: `${final.currently.temperature}${units[0]}`,
          inline: true },
        { name: '\u2600 Sunrise:',
          value: `${sunriseTime}`,
          inline: true },
        { name: '\uD83C\uDF15 Sunset:',
          value: `${sunsetTime}`,
          inline: true },
        { name: '\uD83D\uDCA8 Wind:',
          value: `${final.currently.windSpeed}${units[2]}`,
          inline: true },
        { name: '\uD83D\uDCA7 Humidity:',
          value: `${humidity}%`,
          inline: true },
        { name: '\uD83D\uDC41 Visibility:',
          value: `${final.currently.visibility}${units[1]}`,
          inline: true }
      ],
      timestamp: new Date()
    };
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  });
  return Promise.resolve(true);
}

export default {
  weather,
  forecast: weather
};

export const help = {
  weather: { parameters: 'place' }
};
