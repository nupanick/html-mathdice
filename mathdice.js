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
	power: {
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
		douse.value = roll_d(6);
	})

	const target = document.getElementById('target');
	target.value = roll_d(12) * roll_d(12);
}

/**
 * Generate a random number between 1 and n, inclusive.
 * @param {number} n
 */
function roll_d (n) {
	const roll = Math.floor(n * Math.random()) + 1;
	return roll;
}

/**
 * Evaluate an expression! An expression is either
 * 1) a number, or
 * 2) two expressions connected with an operator.
 * @param {number | Array} expr
 * @returns {number}
 */
 function evaluateExpression (expr) {
	 if (!Array.isArray(expr)) return expr;

	 const [a, op, b] = expr;
	 const valueA = evaluateExpression(a);
	 const valueB = evaluateExpression(b);
	 return op.apply(valueA, valueB);
 }

/**
 * Write an expression as a string.
 * @param {number | Array} expr
 * @returns {string}
 */
function writeExpression (expr) {
	if (!Array.isArray(expr)) return expr;

	const [a, op, b] = expr;
	let strA = writeExpression(a);
	if (Array.isArray(a)) {strA = `(${strA})`}
	let strB = writeExpression(b);
	if (Array.isArray(b)) {strB = `(${strB})`}
	return `${strA} ${op.toString()} ${strB}`;
}

/**
 * Solve a mathdice problem!
 * @param {number[]} scoringDice An array of "key" values used in the puzzle.
 * @param {number} target The "target" value to try and produce.
 * @returns {string} A string representation of the optimal answer.
 */
function solve(scoringDice, target) {
	// Possible solutions: 2 * 3! * 5^2 = 300. Reasonable to brute force.
	const [a, b, c] = scoringDice;
	const dicePermutations = [
		[a, b, c],
		[a, c, b],
		[b, a, c],
		[b, c, a],
		[c, a, b],
		[c, b, a]
	];
	const templates = [
		(a, b, c, x, y) => [a, x, [b, y, c]],
		(a, b, c, x, y) => [[a, x, b], y, c]
	];

	// I don't even care how brutally hard-coded this is, I don't NEED the
	// general case right now.
	const guesses = [];
	for (const keyX in OPERATORS) {
		const x = OPERATORS[keyX];
		for (const keyY in OPERATORS) {
			const y = OPERATORS[keyY];
			dicePermutations.forEach( ([a, b, c]) => {
				templates.forEach( f => {
					guesses.push(f(a, b, c, x, y));
				})
			})
		}
	}

	// Find the best guess.
	const scores = guesses.map( guess =>
		Math.abs(target - evaluateExpression(guess))
	)
	const bestScore = Math.min(...scores);
	const bestGuess = guesses[scores.indexOf(bestScore)];
	return `${writeExpression(bestGuess)} = ${evaluateExpression(bestGuess)}`;
}
