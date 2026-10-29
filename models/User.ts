import mongoose from "mongoose";
import Joi from "joi";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // to prevent show it in quering.
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // for defualt creating of tow coloums [created at and updated at]
  },
);

// Validate user registration data
function validateRegUser(body: unknown) {
  const schema = Joi.object({
    email: Joi.string().trim().email().min(5).max(100).required(),

    username: Joi.string().trim().min(5).max(50).required(),

    password: Joi.string().min(8).max(128).required(),
  }).unknown(false);

  return schema.validate(body);
}

// validate user login data
function validateLogUser(body: unknown) {
  const schema = Joi.object({
    email: Joi.string().trim().email().min(5).max(100).required(),
    password: Joi.string().min(8).max(128).required(),
  }).unknown(false);
}
// User model
const User = mongoose.model("User", UserSchema);

export default User;
export { validateRegUser, validateLogUser };
