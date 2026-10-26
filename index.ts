import "dotenv/config";

import express, { type ErrorRequestHandler } from "express";
import mongoose from "mongoose";

import bookPath from "./routes/books.ts";
import authorsRouter from "./routes/authors.ts";

// Application configuration
const app = express();

const PORT = Number(process.env.PORT ?? 8080);
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json()); // convert the raw data/stream data json to js objects for validations/stroe/use ..etc

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

// Must come after all routes
app.use(errorHandler);

// Start server after connecting to MongoDB
const startServer = async () => {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing from the environment variables.");
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
        `The server is running in ${process.env.environment} environment on port ${PORT}`,
      );
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

void startServer();
