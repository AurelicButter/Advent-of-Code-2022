import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day5.txt", "utf8").split("\r\n");

let stackCheck = true;
let rows: string[] = [];
let i = 0;

while (stackCheck) {
	rows.push(values[i]);
	stackCheck = !(values[i + 1] === "");
	i++;
}

const directions = values.slice(i + 1);
const stackCount = Number(rows.pop().trim().slice(-1));
const stacks: string[][] = Array.from(Array(stackCount), () => []);

rows = rows.map((row) => row.replace(/\s\s\s/g, "[*]").replace(/\[|\]|\s/g, ""));

for (let i = rows.length - 1; i > -1; i--) {
	for (let j = 0; j < rows[i].length; j++) {
		if (rows[i][j] !== "*") {
			stacks[j].push(rows[i][j]);
		}
	}
}

for (let i = 0; i < directions.length; i++) {
	const [amount, source, dest] = directions[i]
		.replace(/move|from|to/g, "")
		.trim()
		.split(" ")
		.filter((e) => e !== "")
		.map((e) => Number(e));

	stacks[dest - 1].push(...stacks[source - 1].splice(stacks[source - 1].length - amount));
}

stacks.forEach((stack) => process.stdout.write(stack.pop()));
