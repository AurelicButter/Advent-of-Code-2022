import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day1.txt", "utf8")
	.split("\r\n")
	.map((e) => Number(e));

const highest = [0, 0, 0];
let current = 0;

for (let i = 0; i < values.length; i++) {
	if (values[i] > 0) {
		current += values[i];
	} else {
		if (highest[0] < current) {
			highest.unshift(current);
			highest.pop();
		} else if (highest[1] < current) {
			highest[2] = highest[1];
			highest[1] = current;
		} else if (highest[2] < current) {
			highest[2] = current;
		}

		current = 0;
	}
}

console.log(highest[0] + highest[1] + highest[2]);
