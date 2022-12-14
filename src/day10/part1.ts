import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day10.txt", "utf8").split("\r\n");

let currX = 1;
let signalCount = 20;
let sum = 0;

for (let i = 0; i < values.length; i++) {
	const [action, amount] = values[i].split(" ");

	if (++signalCount % 40 === 0) {
		sum += (signalCount - 20) * currX;
	}

	if (action === "addx") {
		if (++signalCount % 40 === 0) {
			sum += (signalCount - 20) * currX;
		}
		currX += Number(amount);
	}
}

console.log(sum);
