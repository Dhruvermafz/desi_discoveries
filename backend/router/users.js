const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  updateProfilePhoto,
  updateUserPassword,
} = require("../controllers/userController");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken");
const upload = require("../utils/upload");
const userRouter = express.Router();

userRouter.post("/", verifyAdmin, createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", verifyUser, getUserById);
userRouter.put("/:id", verifyUser, updateUser);
userRouter.delete("/:id", verifyUser, deleteUser);
userRouter.put(
  "/:id/photo",
  verifyUser,
  upload.single("photo"),
  updateProfilePhoto
);
userRouter.put("/:id/password", verifyUser, updateUserPassword);

module.exports = userRouter;
