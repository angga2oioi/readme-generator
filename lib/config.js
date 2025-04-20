//@ts-check

const fs = require("fs");
const path = require("path");
const os = require("os");
const jaci = require("jaci");

// Get platform-safe config file path
function getConfigPath() {
    const home = os.homedir();
    const dir =
        process.platform === "win32"
            ? path.join(process.env.APPDATA || home, "readme-generator")
            : path.join(home, ".config", "readme-generator");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return path.join(dir, "config.json");
}

async function getConfig() {
    const configPath = getConfigPath();

    if (fs.existsSync(configPath)) {
        const useSaved = await jaci.confirm("Use saved config? (Y/N)", { default: true, confirm: { true: "Y", false: "N" } });
        if (useSaved) {
            const raw = fs.readFileSync(configPath, "utf-8");
            return JSON.parse(raw);
        }
    }

    const strConnection = await jaci.string("Open AI Connection : ", { required: true });
    const model = await jaci.string("AI Model : ", { required: true });

    const config = { connection: JSON.parse(strConnection), model };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return config;
}

module.exports = {
    getConfig,
    ALLOWED_EXTENSIONS: [
        '.js', '.jsx', '.ts', '.tsx',
        '.json', '.md', '.html', '.css',
        '.yml', '.yaml', '.py', '.rb', '.go', '.java',
        '.c', '.cpp', '.sh'
    ],
    IGNORED_DIRECTORY: ['.git', '.next', 'node_modules', 'dist', 'build', 'coverage'],
    MAX_FILE_SIZE: 100 * 1024,
}