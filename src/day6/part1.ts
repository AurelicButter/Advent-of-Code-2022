import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day6.txt", "utf8");

for (let i = 0; i < values.length; i++) {
	if (Array.from(new Set(values.substring(i, i + 4).split(""))).length === 4) {
		console.log(i + 4);
		i = values.length;
	}
}
