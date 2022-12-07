import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day7.txt", "utf8").split("\r\n");

const storageLimit = 70000000;
const updateSize = 30000000;

class directory {
	parent: directory;
	directories: Map<string, directory>;
	files: Map<string, file>;
	name: string;

	constructor(name: string, parent?: directory) {
		this.name = name;
		this.directories = new Map<string, directory>();
		this.files = new Map<string, file>();
		this.parent = parent;
	}

	addFile(newFile: file) {
		this.files.set(newFile.name, newFile);
	}

	addDirectory(newDir: directory) {
		this.directories.set(newDir.name, newDir);
	}

	getDirectory(dirName: string) {
		return this.directories.get(dirName);
	}

	getParent() {
		return this.parent;
	}

	getSize(): number {
		let size = 0;

		this.files.forEach((e) => size += e.size);
		this.directories.forEach((e) => size += e.getSize());

		return size;
	}

	getDirTreeSize(): number[] {
		const myDirSizes = [this.getSize()];

		this.directories.forEach((dir) => {
			myDirSizes.push(...dir.getDirTreeSize());
		});

		return myDirSizes;
	}
}

class file {
	name: string;
	size: number;

	constructor(fileInput: string) {
		const [size, name] = fileInput.split(" ");
		this.name = name;
		this.size = Number(size);
	}
}

const rootDir = new directory("/");
let currDir = rootDir;

for (let i = 1; i < values.length; i++) {
	const input = values[i];

	if (input === "$ ls") {
		let readList = true;
		let j = i + 1;

		while (readList) {
			if (values[j].startsWith("dir")) {
				currDir.addDirectory(new directory(values[j].slice(4), currDir));
			} else if (!values[j].startsWith("$")) {
				currDir.addFile(new file(values[j]));
			}

			if (values[j].startsWith("$") || j + 1 === values.length) {
				i = j - 1;
				readList = false;
			}

			j++;
		}
		continue;
	}

	// Moving directories only other option
	const dirMove = input.slice(5);
	currDir = dirMove === ".." ? currDir.getParent() : currDir.getDirectory(dirMove);
}

const currFree = storageLimit - rootDir.getSize();
const addtnSpace = updateSize - currFree;
const dirList = rootDir.getDirTreeSize();

const deletables = dirList
	.filter((e) => e > addtnSpace)
	.sort((a, b) => Math.abs(addtnSpace - a) - Math.abs(addtnSpace - b));

console.log(deletables[0]);
