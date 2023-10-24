const { default: axios } = require("axios");
const config = require("./utils/config");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const pokemonRouter = require("./routes/pokemonRouter");
const userRouter = require("./routes/userRouter");
const mongoose = require("mongoose");
const { protect } = require("./utils/auth");
const { createNewUser, login, getAllUsers } = require("./controllers/userController");

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

app.get("/users", getAllUsers);
app.use("/pokemons", protect, pokemonRouter);
app.use("/user", protect, userRouter);
app.post("/register", createNewUser);
app.post("/login", login);

module.exports = app;
