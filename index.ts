import express, { type ErrorRequestHandler } from "express";
import mongoose from "mongoose";

import bookPath from "./routes/books.ts";
import authorsRouter from "./routes/authors.ts";

// Start point
const app = express();

// Middleware
app.use(express.json());

// Books endpoints
app.use("/api/books", bookPath);

// Authors endpoints
app.use("/api/auth", authorsRouter);

// Centralized Error-Handling Middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    message: "Internal server error",
  });
};

// Must be registered after all routes
app.use(errorHandler);

// Server configuration
const PORT = 8080;

// Connect to the database, then start the server
const startServer = async () => {
  try {
    await mongoose.connect("mongodb://localhost/bookStoreDB");

    console.log("Connected to DB ...");

    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};

void startServer();
