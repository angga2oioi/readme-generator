//@ts-check

const path = require("path")
const { generateFileStructure, readFile } = require("./files")
const { chunkData, sendToChatCompletion } = require("./openai")
const initialMessage = [{
    role: "system",
    content: "You are an assistant helping to generate a README file for a project based on its directory structure and content."
}];

exports.generateReadme = async (dirPath, { connection, model }) => {

    const { fileStructure, filesToRead } = generateFileStructure(dirPath)
    let allFileContent = '';

    for (let file of filesToRead) {
        const fileContent = await readFile(file);
        allFileContent += `content of ${path.basename(file)}` + '\n' + fileContent + '\n'; // Accumulate file content
    }

    const fullContent = fileStructure + '\n\n' + allFileContent;

    const chunks = chunkData(fullContent, 3500);  // Adjust token limit as needed

    // Prepare the conversation with the first system message
    let messages = initialMessage

    let response = ''

    // Add chunks to the conversation
    let count = 0
    for (let chunk of chunks) {
        count++
        process.stdout.write(`Progress: ${((count / chunks?.length) * 100)?.toFixed(1)}%\r`)
        messages.push({
            role: "user",
            content: chunk,
        });

        // Send the chunk to OpenAI for processing
        response = await sendToChatCompletion({ connection, model }, messages);

        // Clear messages for the next chunk
        messages = initialMessage
    }

    return response
}