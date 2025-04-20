# README Generator

## Overview
The README Generator is a Node.js CLI tool that generates a README file for a project based on its directory structure and content. Utilizing OpenAI's API, it analyzes the project's files and compiles information into a well-structured README.md file.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features
- Analyzes the project directory and reads the content of allowed file types.
- Ignores specified directories and file types as configured in `.gitignore`.
- Generates a README.md file populated with details from the analyzed files and project structure.
- Utilizes OpenAI's GPT model for content generation.

## Installation
You can run the README generator using the command line.

```bash
npx github:angga2oioi/readme-generator
```

## Usage
You can run the tool directly via your command line. It will prompt you for the necessary information, including the project directory and OpenAI connection details.
When prompted, input your desired values:
1. **Directory**: Path to the project directory you want to analyze.
2. **Open AI Connection**: JSON string containing your OpenAI connection credentials.
3. **AI Model**: Specify which AI model to use.

Upon successful execution, a file named `README.md` will be generated in the specified project directory.

## License
This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more information.

## Contributing
If you want to contribute to this project, please fork the repository and create a pull request.
Feel free to reach out for any questions, suggestions, or issues!