const { default: axios } = require("axios");
const config = require("./utils/config");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const router = require("./routes/routes");
const mongoose = require("mongoose");
const { protect } = require("./utils/auth");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting to MongoDB:", err.message);
});

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
axios.defaults.timeout = 10000;

app.use("/", protect, router);

module.exports = app;
 