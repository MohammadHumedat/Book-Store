import express from "express";
import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";

import User from "../models/User.ts";

const router = express.Router();

/**
 * @desc    Get all users
 * @route   /api/users
 * @method  GET
 * @access  Restricted - preferably Admin
 */
router.get(
  "/",
  expressAsyncHandler(async (_req, res) => {
    const users = await User.find()
      .select("email username")
      .sort({ username: 1 });

    res.status(200).json(users);
  }),
);

/**
 * @desc    Get user by ID
 * @route   /api/users/:id
 * @method  GET
 * @access  Restricted
 */
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
      res.status(400).json({
        message: "Invalid user ID",
      });
      return;
    }

    const user = await User.findById(req.params.id).select("email username");

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      message: "User found",
      user,
    });
  }),
);

export default router;
