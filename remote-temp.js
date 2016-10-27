/**
* Temperature near you as a service
* Use dnode to create an rpc server that allows anyone to query the last
* known temperature of a TMP36 temperature sensor.
*
* Attach temperature sensor to A0
* Install dnode `npm install dnode`
* Setup your dnode server to listen on port 1337
* Your rpc endpoint should expose a function called getTemperature
* getTemperature should callback with the temperature in celsius
*
* Circuit diagram

      +5  o-----.
                |
                |
               __
              |   \
      A0  o---|    ) TMP36

              |__ /
                |
                |
     GND  o-----'
*/

"use strict"
const five = require("johnny-five");
const dnode = require("dnode");

const board = new five.Board();


board.on('ready', () => {
	let sensor = new five.Thermometer({
		controller: 'TMP36',
    pin: 'A0',
	});

  let temp = null;

  sensor.on('data', (data) => {
    temp = data.celsius;
    console.log(temp);
  });

  let server = dnode({
    getTemperature: (callback) => {
      callback(temp);
    }
  });

  server.listen(1337);
})
