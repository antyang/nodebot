/**
* Circuit diagram

                 330     LED
      Pin 13 o--/\/\/---->|------o GND
* Emits light when a small current is passed through it
* (only in one direction)
*/
"use strict"
const five = require("johnny-five");
const board = new five.Board();

board.on('ready', () => {
	// Create an Led on pin 13 and strobe it on/off
  let led = new five.Led(13)
  // Optionally set the speed; defaults to 100ms
  led.blink(1000);
})
