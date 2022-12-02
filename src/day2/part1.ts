import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day2.txt", "utf8").split("\r\n");

const itemScores = {
	A: 1,
	B: 2,
	C: 3,
	X: 1,
	Y: 2,
	Z: 3,
	ROCK: 1,
	PAPER: 2,
	SCISSORS: 3
};

const outcomeScores = {
	LOSE: 0,
	DRAW: 3,
	WIN: 6
};

let total = 0;

for (let i = 0; i < values.length; i++) {
	const [key1, key2] = values[i].split(" ");

	const hand1 = itemScores[key1];
	const hand2 = itemScores[key2];

	if (hand1 === hand2) {
		total += hand2 + outcomeScores.DRAW;
		continue;
	}

	if (hand1 === itemScores.ROCK) {
		total += hand2 + (hand2 === itemScores.PAPER ? outcomeScores.WIN : outcomeScores.LOSE);
		continue;
	}

	if (hand1 === itemScores.PAPER) {
		total += hand2 + (hand2 === itemScores.SCISSORS ? outcomeScores.WIN : outcomeScores.LOSE);
	}

	if (hand1 === itemScores.SCISSORS) {
		total += hand2 + (hand2 === itemScores.ROCK ? outcomeScores.WIN : outcomeScores.LOSE);
	}
}

console.log(total);
