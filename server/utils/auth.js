const jwt = require("jsonwebtoken");
const config = require("./config");
const bcrypt = require("bcrypt");

const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    config.JWT_SECRET
  );

  return token;
};

const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  console.log("here")

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).json({ message: "no token provided" });
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    return res.status(401).json({ message: "no token provided" });
  }

  try {
    const user = jwt.verify(token, config.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "not valid token" });
  }
};

const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

module.exports = {
  createJWT,
  protect,
  comparePasswords,
  hashPassword,
};
