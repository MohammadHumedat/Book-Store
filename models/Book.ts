import mongoose from "mongoose";
import Joi from "joi";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 150,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    },
  },
  { timestamps: true },
);

/**
 * Validate book creation request body using Joi.
 */
function validateObject(body: unknown) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(30).required(),
    description: Joi.string().trim().min(10).max(150).required(),
    author: Joi.string().hex().length(24).required(),
  });

  return schema.validate(body);
}

/**
 * Validate book update request body using Joi.
 */
function validateUpObject(body: unknown) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(30),
    description: Joi.string().trim().min(10).max(150),
    author: Joi.string().hex().length(24),
  }).min(1);

  return schema.validate(body);
}

const Book = mongoose.model("Book", BookSchema);

export default Book;
export { validateObject, validateUpObject };
