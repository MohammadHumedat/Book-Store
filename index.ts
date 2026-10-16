import express from "express";
import bookPath from "./routes/books.ts";
import authorsRouter from "./routes/authors.ts";
// start point
const app = express();

//Middelware
app.use(express.json());

// books endpoints
app.use("/api/books", bookPath);

// authors endpoints
app.use("/api/auth", authorsRouter);

const port = 8080;

app.listen(port, () => console.log(`the server running on port ${port}`));
