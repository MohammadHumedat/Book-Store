import "dotenv/config";

import express from "express";
import mongoose from "mongoose";

import bookPath from "./routes/books.ts";
import authorsRouter from "./routes/authors.ts";

import logger from "./middleware/logger.ts";
import { notFound, errorHandler } from "./middleware/errors.ts";

// Application configuration
const app = express();

const PORT = Number(process.env.PORT ?? 8080);
const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV ?? "development";

// Middleware
app.use(logger);
app.use(express.json());

// Routes
app.use("/api/books", bookPath);
app.use("/api/auth", authorsRouter);

// Handle unknown routes
app.use(notFound);

// Centralized Error-Handling Middleware
app.use(errorHandler);

// Connect to MongoDB, then start the server
const startServer = async () => {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing from environment variables.");
    process.exit(1);
  }

  if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    console.error("PORT must be a valid port number.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);

    console.log("Connected to DB ...");

    app.listen(PORT, () => {
      console.log(
        `The server is running in ${NODE_ENV} environment on port ${PORT}`,
      );
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

void startServer();
