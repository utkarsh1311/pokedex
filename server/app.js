const { default: axios } = require("axios");
const config = require("./utils/config");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const pokemonRouter = require("./routes/pokemonRouter");
require("express-async-errors");
const userRouter = require("./routes/userRouter");
const mongoose = require("mongoose");
const { protect } = require("./utils/auth");
const { createNewUser, login, getAllUsers } = require("./controllers/userController");
const errorHandler = require("./middlewares/errorHandler");
const cron = require('node-cron');
const decreasePokemonHealthForAllUsers = require("./utils/decreasePokemonHealth");
const client = require("./utils/redis");

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

app.use("/pokemons",protect, pokemonRouter);
app.use("/user", protect, userRouter);
app.post("/register", createNewUser);
app.post("/login", login);


cron.schedule('0 */2.4 * * *', () => {
  console.log('Decreasing pokemon health for all users');
  decreasePokemonHealthForAllUsers();
});

app.use(errorHandler);
module.exports = app;
