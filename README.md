**Link to website** https://revangozelov4847.github.io/assignment/ 

# Flash Card App

## Introduction
Welcome to the Flash Card App, a comprehensive and interactive learning tool. This application, built with React, is designed to facilitate a dynamic learning experience through the use of flashcards. It's perfect for anyone looking to improve their knowledge in various subjects.

## Table of Contents
- [Description](#description)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Starting the React Application](#starting-the-react-application)
  - [Starting the JSON-Server](#starting-the-json-server)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Description
The Flash Card App is designed for users who seek an effective and engaging method to study and memorize information. It utilizes flashcards that can be created, viewed, edited, and deleted, providing a versatile platform for learning.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js: Required to run the React application and install dependencies.
- npm (Node Package Manager): Used for managing JavaScript packages.
- Git: Necessary for cloning the repository from GitHub.
- JSON-Server: This acts as a mock backend for storing and managing flashcards.

### Installation
1. **Clone the Repository**
   - Run the following command in your terminal to clone the project repository:
     ```bash
     git clone https://github.com/RevanGozelov4847/assignment.git 
     ```
   - Move into the project directory:
     ```bash
     cd assignment 
     ```
2. **Install Node Dependencies**
   - Install all required Node modules:
     ```bash
     npm install 
     ```
3. **Install JSON-Server Globally**
   - If not already installed, set up JSON-Server globally:
     ```bash
     npm install -g json-server 
     ```

## Running the Application

### Starting the React Application
1. **Launch the React App**
   - Use this command to start the React app:
     ```bash
     npm start 
     ```
   - The app will automatically open in your web browser at http://localhost:3000.

### Starting the JSON-Server
1. **Activate the JSON-Server**
   - Open a new terminal and run the following to start JSON-Server, which will utilize db.json as a database:
     ```bash
     json-server --watch db.json --port 3000
     ```
   - Access the server at http://localhost:3001. Ensure you use a different port if 3000 is used by the React application.

## Usage
The application provides various functionalities:
- **Creating Flashcards**: Add new cards with questions and answers.
- **Browsing Flashcards**: Scroll through and review flashcards.
- **Editing Flashcards**: Modify the content of existing flashcards.
- **Deleting Flashcards**: Remove flashcards from the collection.
- **Sorting and Filtering**: Organize flashcards based on different criteria for more focused study sessions.

## Contributing
Interested in contributing to the Flash Card App? We welcome contributions, whether it's fixing bugs, improving documentation, or adding new features. Please feel free to fork the repository and submit pull requests.

## Contact
For any queries or further information, please reach out to Revan Gozelov at rgozalov14226@ada.edu.az

## Acknowledgments
- Special thanks to everyone who contributed to the development and improvement of this application.
- Hat tip to anyone whose code was used as inspiration or reference.
- Gratitude to the community for continuous feedback and support.
