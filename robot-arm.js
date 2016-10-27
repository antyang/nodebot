/**
* Make a remote control robot arm
* Use a rotatry potentiometer (pot) to control the position of a servo.
* Attch a potentiometer to pin A2
* Attach a servo to pin 9
* Have the servo rotate as the potentiometer is turned
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
              | | ------------------o  Pin 9
              | |
              | ----------------.---o  +5

              |                 |
              |  Potentiometer  |
     GND  o---.------/\/\/------.
                        ^
                        |
                        |
      A2  o--------------
*/

"use strict"
const five = require("johnny-five");
const board = new five.Board();

board.on('ready', () => {
	let pot = new five.Sensor({
		pin: "A2",
		freq: 250
	});
	let servo = new five.Servo(9);

	pot.on('data', () => {
		servo.to(pot.value*.17)
	});
})
