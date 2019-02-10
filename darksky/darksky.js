const request = require('request');
const APIKEY = "6e0967df11b3f14c7c7ae09d660ca1b1";


var darkskyWeather = (lat, long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${APIKEY}/${lat},${long}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: Math.round(((body.currently.temperature -32) * 5 / 9)),
        apparentTemperature: Math.round(((body.currently.apparentTemperature - 32) * 5 / 9))
      });
    } else {
      callback("unable to fetch weather");
    }
  })
};

module.exports.darkskyWeather = darkskyWeather;
