const express = require("express");
const { verifyUser } = require("../utils/verifyToken");
const {
  createComment,
  deleteComment,
  getCommentsByBlogId,
} = require("../controllers/commentController");

const commentRouter = express.Router();

commentRouter.post("/:BlogId", createComment);
commentRouter.get("/:BlogId", getCommentsByBlogId);
commentRouter.get("/:commentId", verifyUser, deleteComment);

export default commentRouter;
