//@ts-check

const fs = require('fs');
const path = require('path');
const ignore = require('ignore');
const { IGNORED_DIRECTORY, MAX_FILE_SIZE, ALLOWED_EXTENSIONS } = require('./config');

// Function to read and parse the .gitignore file
const readGitIgnore = (dirPath) => {
    const gitignorePath = path.join(dirPath, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
        const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
        const ig = ignore().add(gitignoreContent.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#')));
        return ig;
    }
    return null; // No .gitignore file
}

// Function to generate a tree-like file structure, considering .gitignore
exports.generateFileStructure = (dirPath, options = {}) => {
    let fileStructure = '';
    const ig = readGitIgnore(dirPath);
    const filesToRead = [];

    function walkDir(currentPath, indent = '') {
        const files = fs.readdirSync(currentPath);
        files.forEach((file, index) => {
            const fullPath = path.join(currentPath, file);
            const stats = fs.statSync(fullPath);
            const isLastFile = index === files.length - 1;

            const relative = path.relative(dirPath, fullPath);
            const ext = path.extname(file).toLowerCase();

            // Ignore based on .gitignore and hardcoded list
            if (IGNORED_DIRECTORY.includes(file) || (ig && ig.ignores(relative))) {
                return;
            }

            if (stats.isDirectory()) {
                fileStructure += `${indent}${isLastFile ? '└── ' : '├── '}${file}\n`;
                walkDir(fullPath, `${indent}${isLastFile ? '    ' : '│   '}`);
            } else {
                fileStructure += `${indent}${isLastFile ? '└── ' : '├── '}${file}\n`;

                if (
                    stats.size <= MAX_FILE_SIZE &&
                    ALLOWED_EXTENSIONS.includes(ext) // Now using the config file
                ) {
                    filesToRead.push(fullPath);
                }
            }
        });
    }

    walkDir(dirPath);

    const prioritizedFiles = filesToRead.filter(f =>
        /package\.json$|index\.(js|jsx|ts|tsx)$|^.*\/api\/.*\.js$|README\.md$/i.test(f)
    );

    const finalFilesToRead = options.prioritize
        ? [...new Set([...prioritizedFiles, ...filesToRead])]
        : filesToRead;

    return {
        fileStructure,
        filesToRead: finalFilesToRead
    };
};

exports.readFile = async (fpath) => {
    return fs.promises.readFile(fpath);
}

exports.writeFile = async (fpath, data) => {
    return fs.promises.writeFile(fpath, data);
}