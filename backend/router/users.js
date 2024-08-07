const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,

  updateUserPassword,
} = require("../controllers/userController");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken");
const upload = require("../utils/upload");
const userRouter = express.Router();

userRouter.post("/", verifyAdmin, createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", verifyUser, getUserById);
userRouter.put("/:id", verifyUser, upload.single("photo"), updateUser);
userRouter.delete("/:id", verifyUser, deleteUser);
userRouter.put("/:id/password", verifyUser, updateUserPassword);

module.exports = userRouter;
