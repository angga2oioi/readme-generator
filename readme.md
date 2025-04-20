# README Generator

## Overview
The README Generator is a Node.js CLI tool designed to create a README file for a project by analyzing its directory structure and content. By leveraging OpenAI's API, it gathers information from the project's files and compiles it into a well-structured `README.md` file.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)

## Features
- Analyzes the project directory and reads the content of allowed file types.
- Ignores specified directories and file types as configured in `.gitignore`.
- Generates a `README.md` file populated with details from the analyzed files and project structure.
- Utilizes OpenAI's GPT model for content generation.

## Installation
To install the README generator, run the following command in your terminal:

```bash
npx github:angga2oioi/readme-generator
```

## Usage
Run the tool directly in your command line. It will prompt you for the necessary information, including the project directory and OpenAI connection details. When prompted, input the following values:
1. **Directory**: Path to the project directory you want to analyze.
2. **Open AI Connection**: JSON string containing your OpenAI connection credentials.
3. **AI Model**: Specify which AI model to use.

Once the execution is successful, a file named `README.md` will be generated in the specified project directory.

## License
This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more information.

## Contributing
If you'd like to contribute to this project, please fork the repository and create a pull request. Feel free to reach out with any questions, suggestions, or issues!

---

### Directory Structure

```
├── .gitignore
├── index.js
├── lib
│   ├── config.js
│   ├── files.js
│   ├── main.js
│   └── openai.js
├── package-lock.json
├── package.json
└── readme.md
```

### File Summaries
- **`index.js`**: Entry point of the CLI tool. Sets up the command line interface and initiates the README file generation process.
- **`lib/config.js`**: Handles the retrieval and management of configuration settings, including OpenAI connection details and model selections.
- **`lib/files.js`**: Contains functions for file management, such as reading files and generating a directory structure while respecting `.gitignore`.
- **`lib/main.js`**: Provides core logic for generating the README content by aggregating file data and interacting with OpenAI's API.
- **`lib/openai.js`**: Manages interaction with OpenAI, including sending requests and processing responses.

### Getting Started
Make sure you have Node.js installed on your machine. Clone the repository and install the dependencies listed in `package.json` to start using the README Generator.

```bash
git clone https://github.com/angga2oioi/readme-generator.git
cd readme-generator
npm install
```

After installation, you can run the generator as shown in the usage section.

For bug reports or feature requests, open an issue in the repository. Happy coding!