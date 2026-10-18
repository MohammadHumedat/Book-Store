import mongoose from "mongoose";
import Joi from "joi";
const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 50,
      select: false,
    },
  },
);


function validateUser(body: unknown) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(30).required(),
    lastName: Joi.string().trim().min(3).max(30).required(),
    password: Joi.string()
      .min(8)
      .max(50)
      .pattern(/^[a-zA-Z0-9]{8,}$/)
      .required(),
  });

  return schema.validate(body);
}

function validateUpdateUser(body: unknown) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(30),
    lastName: Joi.string().trim().min(3).max(30),
    password: Joi.string()
      .min(8)
      .max(50)
      .pattern(/^[a-zA-Z0-9]{8,}$/),
  }).min(1);

  return schema.validate(body);
}

const Author = mongoose.model("Author", AuthorSchema);
export default Author;
export { validateUser, validateUpdateUser };