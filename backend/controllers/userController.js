const User = require("../models/User");

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users retrived successfully",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to get users!" });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to get user" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to delete user!" });
  }
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
