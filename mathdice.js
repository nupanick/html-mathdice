"use strict";
const OPERATORS = {
	add: {
		apply(a, b) {return a + b},
		toString() {return "+"}
	},
	subtract: {
		apply(a, b) {return a - b},
		toString() {return "-"}
	},
	multiply: {
		apply(a, b) {return a * b},
		toString() {return "*"}
	},
	divide: {
		apply(a, b) {return a / b},
		toString() {return "/"}
	},
	power {
		apply(a, b) {return a ** b},
		toString() {return "^"}
	}
}


// Assign event handlers.
document.getElementById("roll-button").onclick = generateProblem;

/**
 * Roll dice and generate a mathdice problem. There are three "key" values
 * (d6), and one "target" roll (1d12 * 1d12).
 */
function generateProblem () {
	// mouse:mice :: douse:dice
	const diceList = document.querySelectorAll('.scoring');
	Array.prototype.forEach.call(diceList, douse => {
		douse.innerHTML = roll_d(6);
	})

	const target = document.getElementById('target');
	target.innerHTML = roll_d(12) * roll_d(12);
}

/**
 * Generate a random number between 1 and n, inclusive.
 * @param {number} n
 */
function roll_d (n) {
	const roll = (n * Math.random() |0) + 1;
	return roll;
}
