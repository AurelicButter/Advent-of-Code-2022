import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day11.txt", "utf8").split("\r\n");

class Monkey {
	items: number[] = [];
	operation: string;
	opNumber: number | "old";
	testNum: number;
	truePointer: number;
	falsePointer: number;
	inspectedItem = 0;

	addItem(item: number) {
		this.items.push(item);
	}

	addItems(items: number[]) {
		this.items.push(...items);
	}

	setOperation(instruction: string) {
		const keys = instruction.split(" ");

		if (keys[keys.length - 1] === "old") {
			this.opNumber = "old";
		} else {
			this.opNumber = Number(keys[keys.length - 1]);
		}

		this.operation = keys[keys.length - 2];
	}

	setTest(instruction: string) {
		this.testNum = Number(instruction.slice(21));
	}

	setMonkeyPointers(trueInstruct: string, falseInstruct: string) {
		this.truePointer = Number(trueInstruct.slice(29));
		this.falsePointer = Number(falseInstruct.slice(30));
	}

	inspectItem() {
		let currItem = this.items.shift();
		const inspectOpNum = this.opNumber === "old" ? currItem : this.opNumber;

		if (this.operation === "*") {
			currItem = currItem * inspectOpNum;
		} else {
			currItem += inspectOpNum;
		}

		currItem = Math.floor(currItem / 3);

		if (currItem % this.testNum === 0) {
			monkeys[this.truePointer].addItem(currItem);
		} else {
			monkeys[this.falsePointer].addItem(currItem);
		}

		this.inspectedItem++;
	}

	inspectItems() {
		while (this.items.length > 0) {
			this.inspectItem();
		}
	}
}

const monkeys: Monkey[] = [];

for (let i = 0; i < values.length; i += 7) {
	const newMonkey = new Monkey();
	newMonkey.addItems(
		values[i + 1]
			.slice(18)
			.split(", ")
			.map((n) => Number(n))
	);
	newMonkey.setOperation(values[i + 2]);
	newMonkey.setTest(values[i + 3]);

	newMonkey.setMonkeyPointers(values[i + 4], values[i + 5]);

	monkeys.push(newMonkey);
}

for (let i = 0; i < 20; i++) {
	for (let x = 0; x < monkeys.length; x++) {
		monkeys[x].inspectItems();
	}
}

const inspected = monkeys
	.map((n) => n.inspectedItem)
	.sort((a, b) => {
		return b - a;
	});
console.log(inspected[0] * inspected[1]);
