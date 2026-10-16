import express from "express";
import Joi from "joi";

const router = express.Router();

interface Book {
  id: number;
  title: string;
  description: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Designing Data-Intensive Applications",
    description: "Designing Data-Intensive Applications",
  },
  {
    id: 2,
    title: "Samerlive Book",
    description: "Designing Data-Intensive Applications",
  },
  {
    id: 3,
    title: "Wisam Book",
    description: "Designing Data-Intensive Applications",
  },
];

/**
 * @desc    Get all books
 * @route   /api/books
 * @method  GET
 * @access  Public
 */
router.get("/", (req, res) => {
  res.send(books);
});

/**
 * @desc    Get a specific book by ID
 * @route   /api/books/:id
 * @method  GET
 * @access  Public
 */
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book doesnt exist" });
  }
});

/**
 * @desc    Create a new book
 * @route   /api/books
 * @method  POST
 * @access  Public
 */
router.post("/", (req, res) => {
  const { error } = validateObject(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newbook: Book = {
    id: books.length + 1,
    title: req.body.title,
    description: req.body.description,
  };

  books.push(newbook);
  res.status(201).json(newbook);
});

/**
 * @desc    Update a book
 * @route   /api/books/:id
 * @method  Put
 * @access  Public
 */

router.put("/:id", (req, res) => {
  const { error } = validateUpObject(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (book) {
    book.title = req.body.title;
    book.description = req.body.description;

    res.status(200).json({
      message: "book has been updated successfully",
      updatedBook: book,
    });
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

/**
 * @desc    Delete a book
 * @route   /api/books/:id
 * @method  Delete
 * @access  Public
 */

router.delete("/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));

  if (bookIndex === -1) {
    return res.status(404).json({ message: "book not found" });
  }
  const deletedBook = books.splice(bookIndex, 1);
  res.status(200).json({
    message: "Book has been deleted succesfully",
    deletedBook: deletedBook[0],
  });
});

/**
 * @desc    Validate book request body using Joi
 * @param   {any} body - Request body object
 * @returns Joi validation result
 */
function validateObject(body: any) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(10).max(200),
  });

  return schema.validate(body);
}
/**
 * @desc    Validate updating book request body using Joi
 * @param   {any} body - Request body object
 * @returns Joi validation result
 */
function validateUpObject(body: any) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30),
    description: Joi.string().min(10).max(200),
  });

  return schema.validate(body);
}
export default router;
