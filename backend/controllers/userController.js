const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Create user
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
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: err.message,
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to get users!",
      error: err.message,
    });
  }
};

// Get user by ID
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
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to get user",
      error: err.message,
    });
  }
};

// Update user
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
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: err.message,
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete user!",
      error: err.message,
    });
  }
};
const updateProfilePhoto = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).json({
        success: false,
        message:
          "You can only update your own account photo. Please login again!",
      });
    }

    // Check if the request contains a file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded!",
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Update the user's profile photo URL
    const updatedProfilePhoto = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { photo: result.secure_url } }, // Store the Cloudinary URL
      { new: true }
    );

    if (updatedProfilePhoto) {
      // Remove file from server after upload
      fs.unlinkSync(req.file.path);

      return res.status(200).json({
        success: true,
        message: "Profile photo updated",
        user: updatedProfilePhoto,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Something went wrong!",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to update profile photo!",
      error: err.message,
    });
  }
};

// Update user password
const updateUserPassword = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).json({
        success: false,
        message:
          "You can only update your own account password. Please login again!",
      });
    }

    const validUser = await User.findById(req.params.id);

    if (!validUser) {
      return res.status(404).json({
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
      return res.status(400).json({
        success: false,
        message: "Invalid current password!",
      });
    }

    const updatedHashedPassword = await bcryptjs.hash(newPassword, 10);
    await User.findByIdAndUpdate(
      req.params.id,
      { $set: { password: updatedHashedPassword } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to update your password!",
      error: err.message,
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
