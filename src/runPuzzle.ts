/**
 * @author Frederick Katsura <Katsurinstudios@protonmail.ch>
 * @version 1.0.0
 * @description Script to run specified JS built script in the repository
 */

import { existsSync } from "fs";
import { join } from "path";

async function menuDisplay() {
	const args = process.argv;

	if (args[2] === undefined) {
		throw new Error("Script file not specified");
	}

	const myFile = await join(__dirname, `${args[2]}.js`);

	if (!existsSync(myFile)) {
		throw new Error("Script file does not exist");
	}

	require(myFile);
}

menuDisplay();
