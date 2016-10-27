/**
* Attach a button to pin 5 and an LED to pin 9
* Use the Button class to detect press events and toggle your LED on/off
* Circuit diagram

                 330      LED
     Pin 9  o---/\/\/------>|------
                                  |
     Pin 5  o------------         |
                        |         |
                 10k    |         |
        +5  o---/\/\/---.         |
                        |         |
                        |         |
           .---------.  |         |
           |         |  |         |
          -+-_______-+--+         |
           |    |    |            |

          -+-___|___-+--+         |
           |    |    |  |         |
           '____|____'  |         |
                |       |         |
             Button     |         |
                        +---------+---o  GND
*/
"use strict"
const five = require("johnny-five");
const board = new five.Board();

board.on('ready', () => {
	let button = five.Button({
		pin: 5,
	});
	let led = five.Led(9);

	button.on('press', () => {
		led.toggle();
	});
})
