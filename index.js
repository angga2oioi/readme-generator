#!/usr/bin/env node
//@ts-check

const jaci = require("jaci");
const { generateReadme } = require("./lib/main");
const { writeFile } = require("./lib/files");
const { getConfig } = require("./lib/config");



const start = async () => {

    try {
        const directory = await jaci.string("directory : ", { required: true });
        const { connection, model } = await getConfig();
        const readme = await generateReadme(directory, { connection, model });
        await writeFile(`${directory}/readme.md`, readme);
        console.info(`${directory}/readme.md created`);
        process.exit(0);
    } catch (e) {
        console.error(e)
    }

}

start()