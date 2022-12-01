/**
 * @author Frederick Katsura <Katsurinstudios@protonmail.ch>
 * @version 1.0.0
 * @description Script to setup the code space for an AOC day.
 */

import { createWriteStream, mkdirSync } from "fs";

const TSHeader = "import { readFileSync } from \"fs\"; \nconst values = readFileSync(\"./inputs/Day--DAYINPUT.txt\", \"utf8\").split(\"\\n\");";

const READMETemplate = 
`# Day --DAYINPUT: <Title>
Link: [Day --DAYINPUT](https://adventofcode.com/--YEARINPUT/day/--DAYINPUT)

## Part 1

## Part 2
`;

async function createDay() {
    const args = process.argv;

    let day: number;

    if (args[2] === undefined) {
        day = new Date().getDate();
    } else {
        day = Number(args[2]); 
    }

    if (isNaN(day)) {
        throw new Error("Day input is not a number.");
    }
    if (day > 25) {
        throw new Error("Day input exceeds AOC time.");
    }
    if (day < 1) {
        throw new Error("Day input is lower than 1.");
    }

    const dirPath = `./src/day${day}`;

    mkdirSync(dirPath);

    let writeStream = createWriteStream(`${dirPath}/part1.ts`);
    writeStream.write(TSHeader.replace("--DAYINPUT", day.toString()));
    writeStream.end();

    writeStream = createWriteStream(`${dirPath}/part2.ts`);
    writeStream.write(TSHeader.replace("--DAYINPUT", day.toString()));
    writeStream.end();

    writeStream = createWriteStream(`${dirPath}/README.md`);
    writeStream.write(
        READMETemplate
            .replace(/--DAYINPUT/g, day.toString())
            .replace("--YEARINPUT", new Date().getFullYear().toString())
    );
    writeStream.end();

    console.log("Day created.");
}

createDay();