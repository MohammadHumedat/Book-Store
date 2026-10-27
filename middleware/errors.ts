import type {
  ErrorRequestHandler,
  RequestHandler,
} from "express";

type AppError = Error & {
  statusCode?: number;
  status?: number;
};

// Handles requests that do not match any route
const notFound: RequestHandler = (req, _res, next) => {
  const error: AppError = new Error(
    `Not Found - ${req.originalUrl}`,
  );

  error.statusCode = 404;

  next(error);
};

// Handles errors passed to Express
const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  next,
) => {
  if (res.headersSent) {
    return next(err);
  }

  const error = err as AppError;

  const possibleStatusCode = error.statusCode ?? error.status ?? 500;

  const statusCode =
    Number.isInteger(possibleStatusCode) &&
    possibleStatusCode >= 400 &&
    possibleStatusCode <= 599
      ? possibleStatusCode
      : 500;

  const isProduction = process.env.NODE_ENV === "production";

  const message =
    statusCode >= 500 && isProduction
      ? "Internal server error"
      : error.message || "Internal server error";

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  });
};

export { notFound, errorHandler };