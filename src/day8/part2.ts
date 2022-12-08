import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day8.txt", "utf8")
	.split("\r\n")
	.map((e) => e.split("").map((e) => Number(e)));

let visibleCount = 0;

for (let i = 0; i < values.length; i++) {
	for (let j = 0; j < values[i].length; j++) {
		const posHeight = values[i][j];

		// Booleans positioned for TOP, BOTTOM, LEFT, RIGHT
		const visibles = [0, 0, 0, 0];

		// Verify top
		for (let k = i - 1; k > -1; k--) {
			if (values[k][j] >= posHeight) {
				k = -1;
			}
			visibles[0]++;
		}

		// Verify bottom
		for (let k = i + 1; k < values.length; k++) {
			if (values[k][j] >= posHeight) {
				k = values.length;
			}
			visibles[1]++;
		}

		// Verify left
		for (let k = j - 1; k > -1; k--) {
			if (values[i][k] >= posHeight) {
				k = -1;
			}
			visibles[2]++;
		}

		// Verify right
		for (let k = j + 1; k < values[i].length; k++) {
			if (values[i][k] >= posHeight) {
				k = values[i].length;
			}
			visibles[3]++;
		}

		const sum = visibles.reduce((a, b) => a * b);

		if (visibleCount < sum) {
			visibleCount = sum;
		}
	}
}

console.log(visibleCount);
