const jwt = require("jsonwebtoken");
const User = require("../models/User");

const errorHandler = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return errorHandler(res, 401, "No token provided!");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const user = await User.findById(userId);

    if (!user) {
      return errorHandler(res, 401, "Invalid token!");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return errorHandler(res, 401, "Invalid token!");
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return errorHandler(res, 403, "Access denied");
  }
};

const verifyUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return errorHandler(res, 403, "Access denied");
  }
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyUser,
};
