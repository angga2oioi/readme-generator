//@ts-check
const OpenAI = require("openai");

exports.chunkData = (data, tokenLimit = 3500) => {
    const chunks = [];
    let currentChunk = '';

    // Split by lines and add them to chunks
    data.split('\n').forEach(line => {
        if ((currentChunk + line).length > tokenLimit) {
            chunks.push(currentChunk);
            currentChunk = line;  // Start new chunk with current line
        } else {
            currentChunk += line + '\n';  // Add the line to current chunk
        }
    });

    if (currentChunk) {
        chunks.push(currentChunk);  // Push any leftover data
    }

    return chunks;
}

// Function to send data to OpenAI ChatCompletion
exports.sendToChatCompletion = async ({ connection, model }, messages) => {
    const openai = new OpenAI(connection);

    try {
        const response = await openai.chat.completions.create({
            model,
            messages: messages,
        });
        return response.choices[0].message.content
    } catch (e) {
        console.error("Error with OpenAI ChatCompletion request:", e);
    }
}
