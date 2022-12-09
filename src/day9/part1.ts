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

	constructor() {
		this.visited.add("0,0");
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

	updateVisit() {
		this.visited.add(`${this.xAxis},${this.yAxis}`);
	}
}

class Tail extends Point {
	head: Point;

	constructor(head: Point) {
		super();
		this.head = head;
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
}

const head = new Point();
const tail = new Tail(head);

for (let i = 0; i < values.length; i++) {
	const [direction, amount] = values[i];

	for (let j = 0; j < amount; j++) {
		switch (direction) {
			case "R":
				head.moveRight();
				break;
			case "U":
				head.moveUp();
				break;
			case "L":
				head.moveLeft();
				break;
			case "D":
				head.moveDown();
				break;
		}

		const xDiff = head.xAxis - tail.xAxis;
		const yDiff = head.yAxis - tail.yAxis;
		const possibleStay = [-1, 0, 1];

		if (possibleStay.includes(xDiff) && possibleStay.includes(yDiff)) {
			continue;
		}

		if (yDiff === 0) {
			xDiff > 0 ? tail.moveRight() : tail.moveLeft();
			continue;
		}

		if (xDiff === 0) {
			yDiff > 0 ? tail.moveUp() : tail.moveDown();
			continue;
		}

		if (yDiff > 0) {
			xDiff > 0 ? tail.moveUpRight() : tail.moveUpLeft();
			continue;
		}

		if (yDiff < 0) {
			xDiff > 0 ? tail.moveDownRight() : tail.moveDownLeft();
		}
	}
}

console.log(tail.visited.size);
