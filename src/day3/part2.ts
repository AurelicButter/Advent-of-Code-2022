import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day3.txt", "utf8").split("\r\n");

function priorityCheck(letter: string) {
	return letter === letter.toLowerCase() ? letter.charCodeAt(0) - 96 : letter.toLowerCase().charCodeAt(0) - 96 + 26;
}

let sum = 0;

for (let i = 0; i < values.length; i += 3) {
	const firstUnique = values[i].split("").filter((item, index, self) => self.indexOf(item) === index);
	const secondUnique = values[i + 1].split("").filter((item, index, self) => self.indexOf(item) === index);
	const thirdUnique = values[i + 2].split("").filter((item, index, self) => self.indexOf(item) === index);

	for (let j = 0; j < firstUnique.length; j++) {
		if (secondUnique.indexOf(firstUnique[j]) > -1 && thirdUnique.indexOf(firstUnique[j]) > -1) {
			sum += priorityCheck(firstUnique[j]);
			j = firstUnique.length;
		}
	}
}

console.log(sum);
