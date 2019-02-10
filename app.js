const request = require('request');
const yargs = require('yargs');
const geocode =  require('./geocode/geocode');
const darksky =  require('./darksky/darksky');

const APIKEY = 'AIzaSyDQBlAsn_WLWhaNET7wVcZPmWHwQ24Yvlo'
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true

    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var address = encodeURIComponent(argv.a);

geocode.geocodeAddress(address, (errorMessage, results) =>{
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log("---------");
    console.log(results.address);
    console.log("---------");
    darksky.darkskyWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if(errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature} celcius. it feels like ${weatherResults.apparentTemperature} celcius.`);
      }
    });
  }
});
