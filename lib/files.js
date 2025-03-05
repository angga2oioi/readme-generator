//@ts-check

const fs = require('fs');
const path = require('path');
const ignore = require('ignore');

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
exports.generateFileStructure = (dirPath) => {
    let fileStructure = '';
    const ig = readGitIgnore(dirPath);  // Read and parse the .gitignore
    const filesToRead = []

    function walkDir(currentPath, indent = '') {
        const files = fs.readdirSync(currentPath);
        files.forEach((file, index) => {
            const fullPath = path.join(currentPath, file);
            const stats = fs.statSync(fullPath);
            const isLastFile = index === files.length - 1; // Check if it's the last item in the directory

            // Skip the .git directory by default
            if (file === '.git') {
                return;
            }

            // Check if the file or directory is ignored by .gitignore
            if (ig && ig.ignores(path.relative(dirPath, fullPath))) {
                return; // Skip this file or directory if it's in the .gitignore
            }

            if (stats.isDirectory()) {
                // If it's a directory, add it and recursively walk into it
                fileStructure += `${indent}${isLastFile ? '└── ' : '├── '}${file}\n`;
                walkDir(fullPath, `${indent}${isLastFile ? '    ' : '│   '}`);
            } else {
                filesToRead.push(fullPath)
                // If it's a file, add it
                fileStructure += `${indent}${isLastFile ? '└── ' : '├── '}${file}\n`;
            }
        });
    }

    walkDir(dirPath);
    return {
        fileStructure,
        filesToRead
    };
}

exports.readFile = async (fpath) => {
    return fs.promises.readFile(fpath);
}

exports.writeFile = async (fpath, data) => {
    return fs.promises.writeFile(fpath, data);
}