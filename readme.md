# README Generator

A command-line tool for automatically generating README files for projects based on their directory structure and content.

## Usage

You can run the README generator using the command line. Make sure to provide the required parameters when prompted:

```bash
npx github:angga2oioi/readme-generator
```

1. Enter the path of the directory you want to document.
2. Provide the OpenAI connection details (JSON). You can also use your custom openai credential
 ```json
  {"baseURL":"YOUR_BASE_URL","apiKey": "YOUR_OPENAI_API_KEY"}
  ```
3. Specify the AI model you would like to use like `gpt-4o-mini`, `llama3.1:8b` or else

The tool will create a `readme.md` file in the specified directory with the generated content.

## Directory Structure

```
├── .gitignore          # Specifies the files and directories to ignore
├── index.js            # Entry point for the application
├── lib                 # Contains utility modules
│   ├── files.js        # File reading and writing utilities
│   ├── main.js         # Main functionality to generate README content
│   └── openai.js       # Interactions with the OpenAI API
├── package-lock.json   # Dependency lock file
└── package.json        # Project metadata and dependencies
```

## How It Works

The README generator works by analyzing the specified directory and its contents, excluding any files or directories that are listed in the `.gitignore`. Here's a brief overview of the primary working components:

- **File Structure Generation**: The generator reads the directory structure and files using the `files.js` module, which also respects the configurations in the `.gitignore` file.
- **OpenAI Integration**: Once the file structure is built, the `openai.js` module is responsible for sending the collected data to the OpenAI API via the `sendToChatCompletion` function.
- **Data Chunks**: To comply with token limits in API requests, the data is chunked appropriately before being sent to OpenAI.

## License

This project is licensed under the ISC License

## Contributing

Contributions to this project are welcome! Please feel free to submit a pull request to suggest improvements or report issues.

---

This README provides an overview of the `readme-generator` project and how to use it effectively. For more detailed information or specific queries, please check the source code and the module documentation.And yes, in case you’re wondering, this README was generated by the script itself.