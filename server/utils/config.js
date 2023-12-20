require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const REDIS_URL = process.env.REDIS_URL;

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  REDIS_URL,
};
