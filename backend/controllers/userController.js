const User = require("../models/User");
const bcryptjs = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to get users!" });
  }
};

const getUserById = async (req, res) => {
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

const updateUser = async (req, res) => {
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
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

const deleteUser = async (req, res) => {
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

const updateProfilePhoto = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).send({
        success: false,
        message:
          "You can only update your own account photo. Please login again!",
      });
    }

    const updatedProfilePhoto = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { avatar: req.body.avatar } },
      { new: true }
    );

    const validUser = await User.findById(req.params.id);
    const { password, ...rest } = validUser._doc;

    if (updatedProfilePhoto) {
      return res.status(200).send({
        success: true,
        message: "Profile photo updated",
        user: rest,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to update profile photo!",
    });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).send({
        success: false,
        message:
          "You can only update your own account password. Please login again!",
      });
    }

    const validUser = await User.findById(req.params.id);

    if (!validUser) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const validPassword = await bcryptjs.compare(
      oldPassword,
      validUser.password
    );
    if (!validPassword) {
      return res.status(400).send({
        success: false,
        message: "Invalid current password!",
      });
    }

    const updatedHashedPassword = await bcryptjs.hash(newPassword, 10);
    const updatedPassword = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { password: updatedHashedPassword } },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to update your password!",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateProfilePhoto,
  updateUserPassword,
};
