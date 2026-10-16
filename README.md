# 📚 Book Store API

A RESTful API built with **Node.js, Express.js, TypeScript, and Joi**. This project manages books and authors through full CRUD operations, with request validation to ensure data integrity.

## 🚀 Features

- **TypeScript Support:** Strong typing and improved code maintainability.
- **Modular Routing:** Separate routers for books and authors.
- **Data Validation:** Request body validation using Joi schemas.
- **CRUD Operations:** Create, read, update, and delete books and authors.
- **Hot Reloading:** Automatic server restarts during development using Nodemon and ts-node.

## 📂 Project Structure

```text
book-store/
├── routes/
│   ├── authors.ts    # Authors CRUD routes and validation
│   └── books.ts      # Books CRUD routes and validation
├── index.ts          # Application entry point
├── package.json      # Dependencies and npm scripts
└── tsconfig.json     # TypeScript configuration
```

## ⚙️ Getting Started

Follow these steps to run the project locally.

### 1. Navigate to the Project Directory

```bash
cd book-store
```

### 2. Install Dependencies

Make sure [Node.js](https://nodejs.org/) is installed, then run:

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

The server will run at:

**http://localhost:8080**

## 📖 API Endpoints

### 📚 Books Endpoints

Base URL: `/api/books`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/books` | Retrieve all books |
| `GET` | `/api/books/:id` | Retrieve a book by ID |
| `POST` | `/api/books` | Create a new book |
| `PUT` | `/api/books/:id` | Update an existing book |
| `DELETE` | `/api/books/:id` | Delete a book |

### ✍️ Authors Endpoints

Base URL: `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/auth` | Retrieve all authors |
| `GET` | `/api/auth/:id` | Retrieve an author by ID |
| `POST` | `/api/auth/Register` | Register a new author |
| `PUT` | `/api/auth/:id` | Update author details |
| `DELETE` | `/api/auth/:id` | Delete an author |

## 🧪 Testing with Postman

You can test the API endpoints using [Postman](https://www.postman.com/).

For `POST` and `PUT` requests, configure the following header:

| Key | Value |
|---|---|
| `Content-Type` | `application/json` |

### Example Request URLs

```text
GET    http://localhost:8080/api/books
POST   http://localhost:8080/api/books
GET    http://localhost:8080/api/auth
POST   http://localhost:8080/api/auth/Register
```

For requests that include a body, select **Body → raw → JSON** in Postman and provide the appropriate JSON data. The API uses Joi to validate supported request bodies.

## 🛠️ Technologies Used

- [Node.js](https://nodejs.org/) — JavaScript runtime
- [Express.js](https://expressjs.com/) — Web framework
- [TypeScript](https://www.typescriptlang.org/) — Static typing
- [Joi](https://joi.dev/) — Data validation
- [Nodemon](https://nodemon.io/) — Automatic server restarts during development
- [ts-node](https://typestrong.org/ts-node/) — TypeScript execution for Node.js

## 👨‍💻 Author

**Mohammad Hmedat**

---

Built with ❤️ using Node.js and TypeScript.
