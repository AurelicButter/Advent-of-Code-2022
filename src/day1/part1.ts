import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day1.txt", "utf8")
	.split("\r\n")
	.map((e) => Number(e));

let highest = 0;
let current = 0;

for (let i = 0; i < values.length; i++) {
	if (values[i] > 0) {
		current += values[i];
	} else {
		if (highest < current) {
			highest = current;
		}

		current = 0;
	}
}

console.log(highest);
