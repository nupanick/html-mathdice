"use strict"
const numDice = 3;

// Returns a lambda for ease of re-rolling.
const roll_d = (x) =>
        () => (x * Math.random() + 1)|0

// Applies a function repeatedly. Only useful for impure functions.
        const do_times = (n, f) => {
        return map(Array(n), f)
}

// Sets the display values of the dice.
function setDiceOutput (nums) {
        const dicebox = document.querySelectorAll('#dicebox > .dice')
        Array.prototype.map.call(dicebox, (die, index) =>
                die.innerHTML = nums[index]
        )
}

// Roll all the dice on the page!
function rollAllDice() {
        const dicebox = document.querySelectorAll('#dicebox > .dice')
        Array.prototype.map.call(dicebox, die =>
                die.innerHTML = roll_d(6)()
        )
}

const rollButton = document.getElementById('roll-button')
rollButton.onclick = rollAllDice;

//console.log(do_times(3, roll_d(6)))
setDiceOutput([6, 6, 6])

