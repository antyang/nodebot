/**
* Build a 'fire alarm' that sounds when the air temperature is more than 50°C
*
* Attach a temperature sensor TMP36 to A0
* Attach a piezo to pin 9
* Attach an LED to pin 13
* Attach a button to pin 5
* When the temperature sensor detects a temperature about 50°C the piezo
* should sound and the LED should flash on and off continuously
* If the temperature drops below 50°C the piezo and LED should switch off
* If the button is pressed the piezo and LED should turn off and should
* not turn on again unless the temperature drops below 50°C
*
* Circuit diagram

                       330        LED
     Pin 13  o--------/\/\/-------->|---------
                                             |
     Pin 5   o----------------------         |
                                   |         |
                            10k    |         |
        +5   o----.--------/\/\/---.         |
                  |                |         |
                  |                |         |
                  |             .--|--|--.   |

                  |             | |  |   |   |
                  |   Button  --+-|  |   |   |
                  |             | |  |   |   |
                  |             '--|--|--'   |
                  |                |         |
                  |                ----------.---o  GND
                  __                         |
                 |   \                       |
         A0  o---|    ) TMP36                |
                 |__ /                       |
                  |                          |
                  ---------------------------.
                                             |
                          Piezo              |
                            _                |
                          || ||              |
      Pin 9   o-----------|| ||---------------
                          ||_||
*/
"use strict"
const five = require("johnny-five");
const board = new five.Board();

board.on('ready', () => {
	let sensor = new five.Thermometer({
		controller: 'TMP36',
    pin: 'A0',
	}),
	piezo = new five.Piezo(9),
	led = new five.Led({
		pin: 13
	}),
	button = new five.Button({
		pin: 5
	}),
	temp = null,
	threshold = 50,
	onFire = false,
	isReset = false,
	sirenInterval = null;

	const panic = () => {
		if (onFire) return
			onFire = true;
			led.strobe(1000)
	    piezo.tone(five.Piezo.Notes.c4, 750)
	    sirenInterval = setInterval(function () {
	      piezo.tone(five.Piezo.Notes.c4, 750)
	    }, 1000)
	};
	const calm = () => {
		if (!onFire) return
			onFire = false;
			piezo.noTone()
			clearInterval(sirenInterval)
			led.stop().off();
	};

	sensor.on('data', (data) => {
		console.log(data.celsius);
		if (data.celsius > threshold) {
			if (!isReset) {
				panic();
			}
		} else {
			calm();
			isReset = false;
		}
	});

// reset button
	button.on('press', () => {
		if (!onFire) return
			isReset = true;
			calm();
	});

	// button.on('press', function () {
  //   if (!onFire) return
  //   isReset = true
  //   calm()
  // })
})
