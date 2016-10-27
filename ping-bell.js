/**
* Create a UDP Server that plays a sound when a message is received.
*
* Attach a piezo to pin 8
* Use the dgram node module to create a udp4 socket
* Bind your server to port 1337 and listen for messages
* When a message is received, have the piezo play a tune
* Circuit diagram

                 Piezo
                   _

                 || ||
      Pin 8  o---|| ||---o  GND
                 ||_||
*/
"use strict"
const five = require("johnny-five");
const dgram = require("dgram");
const server = dgram.createSocket('udp4');
const board = new five.Board();

board.on('ready', () => {
	let piezo = new five.Piezo(8);
	server.on('message', () => {
		piezo.play({
			tempo: 150,
			song: ['c4', 1]
		});
		console.log('play tune');
	})
})

server.bind(1337);
