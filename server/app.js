const { default: axios } = require("axios");
const config = require("./utils/config");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const pokemonRouter = require("./routes/pokemonRouter");
const mongoose = require("mongoose");
const { protect } = require("./utils/auth");
const { createNewUser, login, getAllUsers } = require("./controllers/user");

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

app.use("/pokemon", protect, pokemonRouter);
app.get("/user", )
app.post("/register", createNewUser);
app.post("/login", login);

module.exports = app;
