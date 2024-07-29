const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken");

const userRouter = express.Router();
userRouter.post("/", verifyAdmin, createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", verifyUser, getUserById);
userRouter.put("/:id", verifyUser, updateUser);
userRouter.delete("/:id", verifyUser, deleteUser);

module.exports = userRouter;
