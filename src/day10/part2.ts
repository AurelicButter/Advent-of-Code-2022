import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day10.txt", "utf8").split("\r\n");

let currX = 1;
let signalCount = 0;

function printChar() {
	process.stdout.write(Math.abs(currX - signalCount % 40) < 2 ? "#" : ".");
	if (++signalCount % 40 === 0) {
		process.stdout.write("\n");
	}
}

for (let i = 0; i < values.length; i++) {
	const [action, amount] = values[i].split(" ");

	printChar();

	if (action === "addx") {
		printChar();
		currX += Number(amount);
	}
}
