# Welcome to Employee Management System

We'll walk you through the project overview and explain the file structure for building a complete employee management system using MongoDB, Express, React, and Node.js.

## Project Setup

### Frontend

1. Create a `frontend` folder:
    ```bash
    mkdir frontend
    cd frontend
    ```
2. Initialize the project with Vite:
    ```bash
    npm create vite@latest
    ```
3. Install dependencies:
    ```bash
    npm install
    npm install react-data-table-component styled-components axios react-icons react-router-dom tailwindcss postcss autoprefixer
    npm install tailwindcss @tailwindcss/vite
    ```

### Backend

1. Create a `server` folder:
    ```bash
    mkdir server
    cd server
    ```
2. Initialize Node.js project:
    ```bash
    npm init -y
    ```
3. Install backend dependencies:
    ```bash
    npm install bcrypt cors express jsonwebtoken mongoose multer nodemon path
    ```
4. Create an `index.js` file for your server code.

5. Update `package.json` to add a start script:
    ```json
    "scripts": {
      "start": "nodemon --env-file=.env index.js"
    }
    ```
6. Create a `.env` file for environment variables.
