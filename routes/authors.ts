import express from "express";
import Joi from "joi";

const router = express.Router();

interface auth {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
}

const authors: auth[] = [
  {
    id: 1,
    firstName: "Mohammad",
    lastName: "Hmedat",
    password: "Hmedat12345",
  },
  {
    id: 2,
    firstName: "Osama",
    lastName: "Hmedat",
    password: "Hmedat12345",
  },
];

/**
 * @desc    Get all users
 * @route   /api/auth
 * @method  GET
 * @access  Public
 */
router.get("/", (req, res) => {
  res.send(authors);
});

/**
 * @desc    Get specific user by Id
 * @route   /api/auth/:id
 * @method  GET
 * @access  Public
 */
router.get("/:id", (req, res) => {
  const user = authors.find((e) => e.id === parseInt(req.params.id));
  if (user) {
    res.status(200).json({
      message: "user is defined",
      user: user,
    });
  } else {
    res.status(404).json({ message: "user didn't found" });
  }
});

/**
 * @desc    Post a new user
 * @route   /api/auth
 * @method  POST
 * @access  Public
 */
router.post("/", (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newUser: auth = {
    id: authors.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };

  authors.push(newUser);
  res.status(201).json(newUser);
});

/**
 * @desc    Update user
 * @route   /api/auth/:id
 * @method  PUT
 * @access  Public
 */
router.put("/:id", (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = authors.find((e) => e.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "user didn't found" });
  }

  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.password = req.body.password || user.password;

  res.status(200).json({
    message: "user has been updated successfully",
    user: user,
  });
});

/**
 * @desc    Delete user
 * @route   /api/auth/:id
 * @method  DELETE
 * @access  Public
 */
router.delete("/:id", (req, res) => {
  const userIndex = authors.findIndex((e) => e.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ message: "user didn't found" });
  }

  authors.splice(userIndex, 1);
  res.status(200).json({ message: "user has been deleted successfully" });
});

function validateUser(body: any) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    password: Joi.string()
      .min(8)
      .max(50)
      .pattern(new RegExp("^[a-zA-Z0-9]{8,}$"))
      .required(),
  });

  return schema.validate(body);
}

function validateUpdateUser(body: any) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    password: Joi.string()
      .min(8)
      .max(50)
      .pattern(new RegExp("^[a-zA-Z0-9]{8,}$")),
  });

  return schema.validate(body);
}

export default router;
