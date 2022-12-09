import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day9.txt", "utf8")
	.split("\r\n")
	.map((e) => {
		const x = e.split(" ");
		return [x[0], Number(x[1])];
	});

class Point {
	xAxis = 0;
	yAxis = 0;
	visited = new Set<string>();
	head: Point;

	constructor(head: Point) {
		this.visited.add("0,0");
		this.head = head;
	}

	moveLeft() {
		this.xAxis--;
		this.updateVisit();
	}

	moveRight() {
		this.xAxis++;
		this.updateVisit();
	}

	moveUp() {
		this.yAxis++;
		this.updateVisit();
	}

	moveDown() {
		this.yAxis--;
		this.updateVisit();
	}

	moveUpRight() {
		this.yAxis++;
		this.xAxis++;
		this.updateVisit();
	}

	moveUpLeft() {
		this.yAxis++;
		this.xAxis--;
		this.updateVisit();
	}

	moveDownRight() {
		this.yAxis--;
		this.xAxis++;
		this.updateVisit();
	}

	moveDownLeft() {
		this.yAxis--;
		this.xAxis--;
		this.updateVisit();
	}

	updateVisit() {
		this.visited.add(`${this.xAxis},${this.yAxis}`);
	}

	determineMove() {
		const xDiff = this.head.xAxis - this.xAxis;
		const yDiff = this.head.yAxis - this.yAxis;
		const possibleStay = [-1, 0, 1];

		if (possibleStay.includes(xDiff) && possibleStay.includes(yDiff)) {
			return;
		}

		if (yDiff === 0) {
			xDiff > 0 ? this.moveRight() : this.moveLeft();
			return;
		}

		if (xDiff === 0) {
			yDiff > 0 ? this.moveUp() : this.moveDown();
			return;
		}

		if (yDiff > 0) {
			xDiff > 0 ? this.moveUpRight() : this.moveUpLeft();
			return;
		}

		if (yDiff < 0) {
			xDiff > 0 ? this.moveDownRight() : this.moveDownLeft();
		}
	}
}

const ropes = [new Point(null)];

for (let i = 1; i < 10; i++) {
	ropes.push(new Point(ropes[i - 1]));
}

for (let i = 0; i < values.length; i++) {
	const [direction, amount] = values[i];

	for (let j = 0; j < amount; j++) {
		switch (direction) {
			case "R":
				ropes[0].moveRight();
				break;
			case "U":
				ropes[0].moveUp();
				break;
			case "L":
				ropes[0].moveLeft();
				break;
			case "D":
				ropes[0].moveDown();
				break;
		}

		for (let k = 1; k < ropes.length; k++) {
			ropes[k].determineMove();
		}
	}
}

console.log(ropes[9].visited.size);
