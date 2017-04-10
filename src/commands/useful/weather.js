import NodeGeocoder from 'node-geocoder';
import Promise from 'bluebird';
import nconf from 'nconf';
import DarkSky from 'dark-sky';


const forecast = new DarkSky(nconf.get('DARKSKY_KEY'));

const options = {
  provider: 'google'
};

const geocoder = NodeGeocoder(options);

function weather(client, evt, suffix) {
  let lati = '';
  let long = '';
  geocoder.geocode('29 champs elysée paris')
  .then(function(res) {
    lati = res[0].latitude;
    long = res[0].longitude;
    return
  })
  .catch(function(err) {
    console.log(err);
  });
  console.log(lati, long);
  forecast.latitude(lati)
  .longitude(long)
  .get()
  .then(function(fcresult) {
    console.log(fcresult);
  })
  .catch(function(err) {
    console.log(err);
  });
  return Promise.resolve(evt.message.channel.sendMessage('Suc6'));
}

export default {
  weather,
  forecast: weather
};

export const help = {
  weather: {parameters: ['place']}
};
