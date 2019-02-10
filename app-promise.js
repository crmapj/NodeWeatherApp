const request = require('request');
const yargs = require('yargs');
const axios = require('axios');
const fs = require('fs')
const defaddress = require('./defaultAddress.js')
const geocode = require('./geocode/geocode');
const darksky = require('./darksky/darksky');
const APIKEYweather = "6e0967df11b3f14c7c7ae09d660ca1b1";
const APIKEY = 'AIzaSyDQBlAsn_WLWhaNET7wVcZPmWHwQ24Yvlo'
const argv = yargs
  .options({
    a: {
      demand: false,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true

    },
    default: {
      demand: false,
      alias: 'd',
      describe: 'Set default address of weather app',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

if(argv.a){
  var formattedAddress = encodeURIComponent(argv.a);
} else {
  var formattedAddress = defaddress.defaultAddress(argv.default);
}

var formattedUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${APIKEY}`;

axios.get(formattedUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.')
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherURL = `https://api.darksky.net/forecast/${APIKEYweather}/${lat},${lng}`
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherURL);


}).then((response) => {
  var temperature = Math.round((response.data.currently.temperature - 32) * 5 / 9);
  var feeltemp = Math.round((response.data.currently.apparentTemperature - 32) * 5 / 9);
  console.log(`It's currently ${temperature} Celcius. It feels like ${feeltemp} Celcius`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
