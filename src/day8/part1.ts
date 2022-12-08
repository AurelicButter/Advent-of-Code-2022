import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day8.txt", "utf8")
	.split("\r\n")
	.map((e) => e.split("").map((e) => Number(e)));

// Account for edge values
let visibleCount = values[0].length * 2 + (values.length - 2) * 2;

for (let i = 1; i < values.length - 1; i++) {
	for (let j = 1; j < values[i].length - 1; j++) {
		const posHeight = values[i][j];

		// Booleans positioned for TOP, BOTTOM, LEFT, RIGHT
		const visibles = [true, true, true, true];

		// Verify top
		for (let k = 0; k < i; k++) {
			if (values[k][j] >= posHeight) {
				visibles[0] = false;
				k = i;
			}
		}

		// Verify bottom
		for (let k = i + 1; k < values.length; k++) {
			if (values[k][j] >= posHeight) {
				visibles[1] = false;
				k = values.length;
			}
		}

		// Verify left
		for (let k = 0; k < j; k++) {
			if (values[i][k] >= posHeight) {
				visibles[2] = false;
				k = j;
			}
		}

		// Verify right
		for (let k = j + 1; k < values[i].length; k++) {
			if (values[i][k] >= posHeight) {
				visibles[3] = false;
				k = values[i].length;
			}
		}

		if (visibles.filter((e) => e).length > 0) {
			visibleCount++;
		}
	}
}

console.log(visibleCount);
