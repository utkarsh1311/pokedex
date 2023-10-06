const { default: axios } = require("axios");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const router = require("./routes/routes");

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
axios.defaults.timeout = 10000;

app.use("/", router); 


module.exports = app;
