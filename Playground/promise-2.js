const request = require('request');

const APIKEY = 'AIzaSyDQBlAsn_WLWhaNET7wVcZPmWHwQ24Yvlo'

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var formattedAddress = encodeURIComponent(address);
    var formattedUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${APIKEY}`;
    request({
      url: formattedUrl,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject("Unable to connect to the google servers.");
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address.');
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng

        });
      }

    });
  })

};


geocodeAddress('19146').then((location) => {
  console.log(location.address);
}, (errorMessage) => {
  console.log(errorMessage);
});
