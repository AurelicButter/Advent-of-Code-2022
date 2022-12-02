import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day2.txt", "utf8").split("\r\n");

const itemScores = {
	A: 1,
	B: 2,
	C: 3,
	ROCK: 1,
	PAPER: 2,
	SCISSORS: 3
};

const outcomeScores = {
	X: "LOSE",
	Y: "DRAW",
	Z: "WIN",
	DRAW: 3,
	WIN: 6
};

let total = 0;

for (let i = 0; i < values.length; i++) {
	const [key1, key2] = values[i].split(" ");

	switch (outcomeScores[key2]) {
		case "DRAW":
			total += itemScores[key1] + outcomeScores.DRAW;
			break;
		case "LOSE": // Adds 0 for round. No need to add 0 to total.
			if (itemScores[key1] === itemScores.ROCK) {
				total += itemScores.SCISSORS;
			}
			if (itemScores[key1] === itemScores.PAPER) {
				total += itemScores.ROCK;
			}
			if (itemScores[key1] === itemScores.SCISSORS) {
				total += itemScores.PAPER;
			}
			break;
		case "WIN":
			total += outcomeScores.WIN;
			if (itemScores[key1] === itemScores.ROCK) {
				total += itemScores.PAPER;
			}
			if (itemScores[key1] === itemScores.PAPER) {
				total += itemScores.SCISSORS;
			}
			if (itemScores[key1] === itemScores.SCISSORS) {
				total += itemScores.ROCK;
			}
			break;
	}
}

console.log(total);
