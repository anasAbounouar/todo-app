
# Todo App


*A sleek and responsive To-Do List application built with React, Vite, Material-UI, Node.js, and MongoDB, featuring full CRUD (Create, Read, Update, Delete) functionalities.*

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Set Up Environment Variables](#2-set-up-environment-variables)
  - [3. Install Dependencies](#3-install-dependencies)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

The **Todo App** is a full-stack application designed to help users manage their tasks efficiently. Leveraging modern technologies like **React**, **Vite**, and **Material-UI** on the frontend, combined with a robust **Node.js** and **Express** backend connected to **MongoDB**, this application ensures a seamless and visually appealing user experience.

## Features

- **Create** new to-do items with a user-friendly form.
- **Read** and display all existing to-do items in a structured list.
- **Update** the status and title of to-do items with inline editing.
- **Delete** to-do items with confirmation prompts.
- Responsive and aesthetically pleasing UI using Material-UI (MUI).
- Real-time updates and smooth interactions using React Hooks.
- Efficient backend API with Express and MongoDB.
- Concurrently runs both frontend and backend servers during development.

## Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Vite**: Next-generation frontend tooling for faster development.
- **Material-UI (MUI)**: React UI framework implementing Google's Material Design.
- **Axios**: Promise-based HTTP client for making API requests.

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing to-do items.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing.
- **Dotenv**: Loads environment variables from a `.env` file.
- **Nodemon**: Utility that monitors for any changes in your source and automatically restarts your server.
- **Concurrently**: Runs multiple commands concurrently.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v14 or higher) and **npm** installed. You can download them from [Node.js Official Website](https://nodejs.org/).
- **MongoDB** database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based solution or install MongoDB locally.
- **Git** installed for version control.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

### 2. Set Up Environment Variables

Create a `.env` file inside the `backend` directory and add your MongoDB connection string:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

**Note:** Replace `your_mongodb_connection_string` with your actual MongoDB URI. If you're using MongoDB Atlas, you can obtain this from your cluster's connection settings.

### 3. Install Dependencies

#### Root Directory

Navigate to the root directory and install the necessary dependencies:

```bash
npm install
```

#### Frontend

Navigate to the `frontend` directory and install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

## Running the Application

### Development Mode

To run both the frontend and backend servers concurrently during development:

1. **Ensure you are in the root directory (`todo-app`):**

   ```bash
   cd todo-app
   ```

2. **Start the development servers:**

   ```bash
   npm run dev
   ```

   This command uses **Concurrently** to run both the backend server (`nodemon`) and the frontend development server (Vite) simultaneously.

3. **Access the application:**

   Open your browser and navigate to [http://localhost:5173](http://localhost:5173) (Vite's default port) to interact with the Todo App.

### Production Mode

1. **Build the Frontend:**

   Navigate to the `frontend` directory and build the React application:

   ```bash
   cd frontend
   npm run build
   cd ..
   ```

   This will generate a `dist` folder containing the optimized production build.

2. **Serve the Frontend with the Backend:**

   Update your `backend/server.js` to serve static files from the `frontend/dist` directory. Add the following lines **before** the `app.listen` method:

   ```javascript
   const path = require('path');

   // Serve static files from the frontend
   app.use(express.static(path.join(__dirname, '../frontend/dist')));

   // Handle React routing, return all requests to React app
   app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
   });
   ```

3. **Start the Server:**

   From the root directory, run:

   ```bash
   npm start
   ```

   The application will now be accessible on [http://localhost:5000](http://localhost:5000).

## Scripts

The project uses the following npm scripts to manage both frontend and backend concurrently.

```json
{
  "scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm run dev --prefix frontend",
    "dev": "concurrently -k \"npm run server\" \"npm run client\""
  }
}
```

### Available Scripts

- **`npm start`**: Starts the backend server.
- **`npm run server`**: Starts the backend server with `nodemon` for automatic restarts on code changes.
- **`npm run client`**: Starts the frontend development server using Vite.
- **`npm run dev`**: Runs both the backend and frontend servers concurrently using `concurrently`.

## Project Structure

```
todo-app/
├── backend/
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todos.js
│   
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   └── TodoList.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
├
├── package.json
└── README.md
```

### Description

- **backend/**: Contains all backend-related code.
  - **models/**: Defines Mongoose schemas and models.
  - **routes/**: Defines Express routes for API endpoints.
  - **server.js**: Entry point for the backend server.
  - **.env**: Environment variables for backend configuration.
  - **package.json**: Lists backend dependencies and scripts.

- **frontend/**: Contains all frontend-related code.
  - **public/**: Contains static assets like `index.html`.
  - **src/**: Contains source code for the React application.
    - **components/**: Reusable React components.
      - **TodoForm.jsx**: Component for adding new todos.
      - **TodoItem.jsx**: Component for individual todo items.
      - **TodoList.jsx**: Component for displaying the list of todos.
    - **App.jsx**: Main React component.
    - **main.jsx**: Entry point for the React application.
    - **index.css**: Global CSS styles.
  - **vite.config.js**: Configuration file for Vite.
  - **package.json**: Lists frontend dependencies and scripts.



- **package.json**: Root `package.json` that manages both frontend and backend dependencies and scripts.

- **README.md**: This documentation file.

## Usage

### Running the Application Locally

1. **Start the Development Servers**

   From the root directory, run:

   ```bash
   npm run dev
   ```

   This command will start both the backend server on [http://localhost:5000](http://localhost:5000) and the frontend development server on [http://localhost:5173](http://localhost:5173) (default for Vite).

2. **Access the Application**

   Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to use the Todo App.

### Building for Production

1. **Build the Frontend**

   Navigate to the `frontend` directory and build the React application:

   ```bash
   cd frontend
   npm run build
   cd ..
   ```

   This will generate a `dist` folder containing the optimized production build.

2. **Serve the Frontend with the Backend**

   Ensure your `backend/server.js` is set up to serve static files from the `frontend/dist` directory as mentioned in the [Production Mode](#production-mode) section.

3. **Start the Server**

   From the root directory, run:

   ```bash
   npm start
   ```

   The application will now be accessible on [http://localhost:5000](http://localhost:5000).

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**

2. **Create Your Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```



## Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Material-UI (MUI)](https://mui.com/)
- [Axios](https://axios-http.com/)
- [Concurrently](https://github.com/open-cli-tools/concurrently)
- [Nodemon](https://nodemon.io/)
- [Mongoose](https://mongoosejs.com/)

---

