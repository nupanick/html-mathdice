"use strict";

// Assign event handlers.
document.getElementById("roll-button").onclick = rollDice;

/**
 * Generate new values for all the dice on the page.
 */
function rollDice () {
	// mouse:mice :: douse:dice
	const diceList = document.querySelectorAll('#dicebox > .dice');
	Array.prototype.forEach.call(diceList, douse => {
		douse.innerHTML = roll_d(n);
	})
}

/**
 * Generate a random number between 1 and n, inclusive.
 * @param n
 */
function roll_d (n) {
	const roll = (n * Math.random() |0) + 1;
	return roll;
}
