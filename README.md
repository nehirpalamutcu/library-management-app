# How to clone and run this project

The aim of this project is to develop a digital library management system that enables efficient management of books, users, borrowings, and fines within a library. The system automates manual operations such as borrowing, returning, fine calculation, and stock tracking to improve accuracy, reduce workload, and ensure data consistency.

## Cloning

To clone the repository, use the following command

```bash
git clone https://github.com/nehirpalamutcu/library-management-app.git
```

## TechStack

- 🖥️ Node.js (Express) + MySQL (Backend)
- 🌐 React (Frontend, Vite)
- ☁️ Hosted with Railway (Backend) + Netlify (Frontend)

## Pre-requisites

#### Backend

- Node.js
- Npm

#### Environment

- Visual Studio Code

## 📦 Project Structure

```
LibraryManagementApp/
├── library-backend/     → Express.js backend (Node + MySQL)
└── library-frontend/    → React frontend (Vite)
```

## Setup Backend (Node.js + Express + MySQL)

📁 Navigate into backend folder:
cd library-backend

🔧 Install dependencies:
npm install

📄 Create .env file:

```
DB_HOST=your-db-host
DB_PORT=your-db-port
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
PORT=3000
```

▶️ Start the backend server: npm run dev

## 🧩 VS Code Extension Recommendations

To get the best development experience, install these extensions in VS Code:

- DotENV – mikestead.dotenvSyntax highlighting for .env files
- ESLint – dbaeumer.vscode-eslintJavaScript and React linting
- file-icons – vscode-icons-team.vscode-iconsAdds icons to file explorer for better clarity
- JavaScript (ES6) code snippets – xabikos.javascriptsnippetsUseful JavaScript and React snippets
- npm Intellisense – christian-kohler.npm-intellisenseAutocompletion for npm modules in import statements
- Path Intellisense – christian-kohler.path-intellisenseAutocompletion for file paths
- Prettier - Code formatter – esbenp.prettier-vscodeFormats code automatically on save
- REST Client – humao.rest-client (optional)Lets you send API requests directly in VS Code
- Better Comments – aaron-bond.better-comments Highlights TODO, NOTE, and other structured comments

## 📬 API Testing with Postman

Postman is recommended to test and explore the backend API endpoints during development.

🧪 Example Usage

Once your backend is running (http://localhost:3000), you can use Postman to:

```
🔍 GET http://localhost:3000/authors → Get all authors
🧑 POST http://localhost:3000/authors → Add a new author (send JSON body)
✏️ PATCH http://localhost:3000/authors/updateAuthor → Update author by id
🗑️ DELETE http://localhost:3000/authors/deleteAuthor → Delete author by id (in body or query)
```
