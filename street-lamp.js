/**
* Build a street lamp that turns on as it gets dark.
*
* Use photoresistor and an LED
* Connect the photoresistor A0 and the LED to 9
* Make the LED turn on when the photoresistor's value is greater than 600
* Circuit diagram

                 PhotoR     10K
          +5 o---/\/\/--.--/\/\/--.--o GND

                        |         |
      Pin A0 o-----------         |
                                  |
                 330     LED      |
       Pin 9 o--/\/\/----->|-------
*/

"use strict"
const five = require("johnny-five");
const board = new five.Board();

board.on('ready', () => {
	let photoresistor = new five.Sensor({
		pin: 'A0',
		freq: 250
	});

	let led = new five.Led(9);

	photoresistor.on('data', () => {
		if (photoresistor.value > 600) {
			led.on();
		} else {
			led.off();
		}
	});
})
