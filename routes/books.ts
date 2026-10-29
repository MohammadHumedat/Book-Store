import express from "express";
import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";

import Book, { validateObject, validateUpObject } from "../models/Book.ts";

import Author from "../models/Author.ts";

const router = express.Router();

/**
 * @desc    Get all books
 * @route   /api/books
 * @method  GET
 * @access  Public
 */
router.get(
  "/",
  expressAsyncHandler(async (_req, res) => {
    const books = await Book.find()
      .populate("author", "firstName lastName")
      .sort({ title: 1 });

    res.status(200).json(books);
  }),
);

/**
 * @desc    Get a specific book by ID
 * @route   /api/books/:id
 * @method  GET
 * @access  Public
 */
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
      res.status(400).json({ message: "Invalid book ID" });
      return;
    }

    const book = await Book.findById(req.params.id).populate(
      "author",
      "firstName lastName",
    );  

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(200).json({
      message: "Book found",
      book,
    });
  }),
);

/**
 * @desc    Create a new book
 * @route   /api/books
 * @method  POST
 * @access  Public
 */
router.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { error, value } = validateObject(req.body);

    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
      return;
    }

    const authorExists = await Author.exists({
      _id: value.author,
    });

    if (!authorExists) {
      res.status(404).json({
        message: "Author not found",
      });
      return;
    }

    const book = await Book.create(value);

    await book.populate("author", "firstName lastName");

    res.status(201).json(book);
  }),
);

/**
 * @desc    Update a book
 * @route   /api/books/:id
 * @method  PUT
 * @access  Public
 */
router.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
      res.status(400).json({ message: "Invalid book ID" });
      return;
    }

    const { error, value } = validateUpObject(req.body);

    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
      return;
    }

    // Verify the new author if the request includes an author ID.
    if (value.author) {
      const authorExists = await Author.exists({
        _id: value.author,
      });

      if (!authorExists) {
        res.status(404).json({
          message: "Author not found",
        });
        return;
      }
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: value },
      {
        new: true,
        runValidators: true,
      },
    ).populate("author", "firstName lastName");

    if (!book) {
      res.status(404).json({
        message: "Book not found",
      });
      return;
    }

    res.status(200).json({
      message: "Book has been updated successfully",
      book,
    });
  }),
);

/**
 * @desc    Delete a book
 * @route   /api/books/:id
 * @method  DELETE
 * @access  Public
 */
router.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
      res.status(400).json({ message: "Invalid book ID" });
      return;
    }

    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      res.status(404).json({
        message: "Book not found",
      });
      return;
    }

    res.status(200).json({
      message: "Book has been deleted successfully",
      deletedBook: book,
    });
  }),
);

export default router;
