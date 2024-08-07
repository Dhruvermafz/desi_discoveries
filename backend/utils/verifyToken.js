const jwt = require("jsonwebtoken");
const User = require("../models/User");
const adminCredentials = require("./admin.json");

const errorHandler = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

const verifyUser = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "No token provided",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Failed to authenticate token",
      });
    }
    req.user = decoded;
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
    next();
  });
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
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "No token provided",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Failed to authenticate token",
      });
    }
    req.user = decoded;
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
    next();
  });
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyUser,
};
