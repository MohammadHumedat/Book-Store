import express from "express";
import { validateUser, validateUpdateUser } from "../models/Author.ts";
import mongoose from "mongoose";
import Author from "../models/Author.ts";
import expressAsyncHandler from "express-async-handler";
const router = express.Router();

/**
 * @desc    Get all authors
 * @route   /api/auth
 * @method  GET
 * @access  Public
 */
router.get(
  "/",
  expressAsyncHandler(async (_req, res) => {
    const authors = await Author.find()
      .sort({ firstName: 1 })
      .select("firstName lastName");
    res.status(200).json(authors);
  }),
);

/**
 * @desc    Get a specific author by ID
 * @route   /api/auth/:id
 * @method  GET
 * @access  Public
 */
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
      return res.status(400).json({ message: "Invalid author ID" });
    }
    const author = await Author.findById(req.params.id).select(
      "firstName lastName",
    );
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({
      message: "Author found",
      user: author,
    });
  }),
);

/**
 * @desc    Create an author
 * @route   /api/auth
 * @method  POST
 * @access  Public
 */
router.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { error, value } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const author = await Author.create(value);
    res.status(201).json({
      _id: author._id,
      firstName: author.firstName,
      lastName: author.lastName,
    });
  }),
);

/**
 * @desc    Update an author
 * @route   /api/auth/:id
 * @method  PUT
 * @access  Public
 */
router.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const { error, value } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
      return res.status(400).json({ message: "Invalid author ID" });
    }

    const author = await Author.findByIdAndUpdate(
      req.params.id,
      { $set: value },
      { new: true, runValidators: true },
    );

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({
      message: "Author has been updated successfully",
      user: author,
    });
  }),
);

/**
 * @desc    Delete an author
 * @route   /api/auth/:id
 * @method  DELETE
 * @access  Public
 */
router.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
      return res.status(400).json({ message: "Invalid author ID" });
    }

    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ message: "Author has been deleted successfully" });
  }),
);

export default router;
