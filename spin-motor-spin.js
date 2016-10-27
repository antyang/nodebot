/**
* Spin the motor at 200MPH
* Use board.wait to stop the motor spinning after 2 seconds
* Start it spinning again after another second
* Ensure this loop repeats infinitely
* Circuit diagram

                          ----o  GND
                          |
                 330    |>
     Pin 9  o---/\/\/---|  Transistor
                        |\
                          |
                          |
                    ------.
                    |     |
                    |     _
                    |    / \

             Diode  v   ( o )  Motor
                    -    \_/
                    |     |
                    |     |
        +5  o-------.------
*/
"use strict"
const five = require("johnny-five");
const board = new five.Board();

board.on('ready', () => {
	let motor = new five.Motor({
		pin: 9
	});
	motor.on('start', () => {
		console.log('starting');
		board.wait(2000, () => {
			console.log('stopped motor after 2 seconds');
			motor.stop();
		});
	});
	motor.on('stop', () => {
		board.wait(1000, () => {
			motor.start(200)
		})
	});
	motor.start(200);
})
