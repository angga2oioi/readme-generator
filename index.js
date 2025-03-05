#!/usr/bin/env node
const jaci = require("jaci");
const { generateReadme } = require("./lib/main");
const { writeFile } = require("./lib/files");
const start = async () => {

    try {
        const directory = await jaci.string("directory : ", { required: true })
        const strConnection = await jaci.string("Open AI Connection : ", { required: true })
        const model = await jaci.string("AI Model : ", { required: true })
        let connection = JSON.parse(strConnection)

        let readme = await generateReadme(directory, { connection, model })
        await writeFile(`${directory}/readme.md`, readme)

        console.info(`${directory}/readme.md created`)
        process.exit(0);
    } catch (e) {
        console.error(e)
    }

}

start()