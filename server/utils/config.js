require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
};
