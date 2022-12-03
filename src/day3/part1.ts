import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day3.txt", "utf8").split("\r\n");

function priorityCheck(letter: string) {
	return letter === letter.toLowerCase() ? letter.charCodeAt(0) - 96 : letter.toLowerCase().charCodeAt(0) - 96 + 26;
}

let sum = 0;

for (let i = 0; i < values.length; i++) {
	const compartmentSize = values[i].length / 2;

	const firstUnique = values[i]
		.substring(0, compartmentSize)
		.split("")
		.filter((item, index, self) => self.indexOf(item) === index);
	const secondUnique = values[i]
		.substring(compartmentSize)
		.split("")
		.filter((item, index, self) => self.indexOf(item) === index);

	for (let j = 0; j < firstUnique.length; j++) {
		if (secondUnique.indexOf(firstUnique[j]) > -1) {
			sum += priorityCheck(firstUnique[j]);
			j = firstUnique.length;
		}
	}
}

console.log(sum);
