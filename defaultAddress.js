const fs = require('fs')

var defaultAddress = (x) => {
  if(x){
    defaultaddress = {
      defaultaddress: x,
    }
    fs.writeFileSync('default.json', JSON.stringify(defaultaddress));
    console.log(`You have succesfully set your default address to: ${x}`);
    return x
  } else {
    try{
        var defaultAddress = fs.readFileSync('default.json');
        var address = JSON.parse(defaultAddress);
        if(address.defaultaddress){
          console.log("No address specified so using default address");
          return address.defaultaddress
        }
    } catch (e) {
        console.log("You need to either set a default address or fill in an address");
        return process.exit(1);
    }
  }
}

module.exports.defaultAddress = defaultAddress;
