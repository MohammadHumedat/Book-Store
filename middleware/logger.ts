import type { RequestHandler } from "express";

const logger: RequestHandler = (req, res, next) => {
  const startTime = Date.now();

  console.log(`--> ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const duration = Date.now() - startTime;

    console.log(
      `<-- ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`,
    );
  });

  next();
};

export default logger;