import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day6.txt", "utf8");

for (let i = 0; i < values.length; i++) {
	if (Array.from(new Set(values.substring(i, i + 14).split(""))).length === 14) {
		console.log(i + 14);
		i = values.length;
	}
}
