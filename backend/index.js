const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./router/auth");
const userRouter = require("./router/users");
const tourRouter = require("./router/tour");
const contactRouter = require("./router/contact");
const reviewRouter = require("./router/review");
const bookingRouter = require("./router/bookings");
const searchRouter = require("./router/search");
const paymentRouter = require("./router/payment");
const blogRouter = require("./router/blog");
const commentRouter = require("./router/comment");
const categoryTagRouter = require("./router/category");
const createAdmin = require("./controllers/createAdmin");
const Razorpay = require("razorpay");
const cloudinary = require("cloudinary");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

mongoose.set("strictQuery", false);

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB Database Connected.");
  } catch (err) {
    console.log(err, "MONGODB Database Connection Failed!");
  }
}
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/categoryTag", categoryTagRouter);
// createAdmin();
app.listen(PORT, () => {
  connect();
  console.log("Server is listening on PORT", PORT);
});
