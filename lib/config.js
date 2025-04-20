module.exports = {
    ALLOWED_EXTENSIONS: [
        '.js', '.jsx', '.ts', '.tsx',
        '.json', '.md', '.html', '.css',
        '.yml', '.yaml', '.py', '.rb', '.go', '.java',
        '.c', '.cpp', '.sh'
    ],
    IGNORED_DIRECTORY: ['.git', '.next', 'node_modules', 'dist', 'build', 'coverage'],
    MAX_FILE_SIZE: 100 * 1024,
}