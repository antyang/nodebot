/**
* Create a new Servo instance attached to pin 9
* Use servo.sweep to rotate between 0 and 180
* use board.wait to schedule a 'reset' callback after 3 seconds
* The 'reset' callback should stop and center the servo
* Check docs to see how to bring it back into line
*
* Circuit diagram

             Servo
             .---.
             | | |
           -===+===-
             | | |
             |   |
             '---'
             | | |
             | | |
     GND  o--. | .--o  Pin 9
               |
      +5  o----.
*/

"use strict"
const five = require("johnny-five");
const board = new five.Board();

board.on('ready', () => {

	let servo = new five.Servo(9)

	servo.sweep({
		range: [0, 180],
	});

	board.wait(3000, () => {
		servo.center()
	});

	servo.stop();
})
