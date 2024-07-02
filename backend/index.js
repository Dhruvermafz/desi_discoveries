const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./router/auth");
const { default: userRouter } = require("./router/users");
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

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  connect();
  console.log("Server is listening on PORT", PORT);
});
