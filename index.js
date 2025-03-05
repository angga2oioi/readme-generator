#!/usr/bin/env node
const jaci = require("jaci");
const { generateReadme } = require("./lib/main");
const { writeFile } = require("./lib/files");
const start = async () => {

    try {
        const directory = await jaci.string("directory : ", { required: true })
        const strConfig = await jaci.string("Open AI Config : ", { required: true })
        let connection = JSON.parse(strConfig)

        let readme = await generateReadme(directory, connection)
        await writeFile(`${directory}/readme.md`, readme)

        console.info(`${directory}/readme.md created`)
        process.exit(0);
    } catch (e) {
        console.error(e)
    }

}

start()