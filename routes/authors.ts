import express from "express";
import { validateUser, validateUpdateUser } from "../models/Author.ts";
import mongoose from "mongoose";
import Author from "../models/Author.ts";

const router = express.Router();

/**
 * @desc    Get all authors
 * @route   /api/auth
 * @method  GET
 * @access  Public
 */
router.get("/", async (_req, res) => {
  try {
    const authors = await Author.find()
      .sort({ firstName: 1 })
      .select("firstName lastName");
    res.status(200).json(authors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @desc    Get a specific author by ID
 * @route   /api/auth/:id
 * @method  GET
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @desc    Create an author
 * @route   /api/auth
 * @method  POST
 * @access  Public
 */
router.post("/", async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @desc    Update an author
 * @route   /api/auth/:id
 * @method  PUT
 * @access  Public
 */
router.put("/:id", async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @desc    Delete an author
 * @route   /api/auth/:id
 * @method  DELETE
 * @access  Public
 */
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
      return res.status(400).json({ message: "Invalid author ID" });
    }

    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ message: "Author has been deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
