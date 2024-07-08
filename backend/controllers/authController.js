const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const sendEmail = require("../utils/sendEmail");

const registerUser = asyncErrorHandler(async (req, res) => {
  const { username, fullName, email, password, photo } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already exists!", 400);
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new AppError("Username already exists!", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    fullName,
    email,
    password: hashedPassword,
    photo,
  });
  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });

  // Example: Send welcome email
  await sendEmail({
    email: newUser.email,
    subject: "Welcome to Desi Discoveries!",
    message: `Dear ${newUser.fullName}, welcome to Desi Discoveries. We are glad to have you on board.`,
  });
});

const loginUser = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found!", 404);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid Credentials", 401);
  }

  const token = jwt.sign(
    { userId: user._id, role: "user" },
    process.env.JWT_SECRET,
    { expiresIn: "15d" }
  );

  res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token,
  });
});

module.exports = { registerUser, loginUser };
