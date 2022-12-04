import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day4.txt", "utf8").split("\r\n");

let count = 0;

for (let i = 0; i < values.length; i++) {
	const [elf1Min, elf1Max, elf2Min, elf2Max] = values[i]
		.replace(",", " ")
		.replace(/-/g, " ")
		.split(" ", 4)
		.map((e) => Number(e));

	if (elf1Min <= elf2Min && elf1Max >= elf2Max || elf2Min <= elf1Min && elf2Max >= elf1Max) {
		count++;
	}
}

console.log(count);
