const User = require("../models/user");
const { hashPassword, createJWT, comparePasswords } = require("../utils/auth");

const createNewUser = async (req, res) => {
  const { email, username, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(401).json({ error: "User already exists" });
  }
  const user = new User({
    username,
    email,
    passwordHash: await hashPassword(password),
    adoptedPokemons: [],
  });

  const savedUser = await user.save();
  console.log(savedUser);
  const token = createJWT(savedUser);
  res.status(201).json({ token });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  const user = await User.findOne({ username });
  const passwordIsCorrect =
    user === null ? false : await comparePasswords(password, user.passwordHash);
  if (!(user && passwordIsCorrect)) {
    return res.status(401).json({ error: "invalid username or password" });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = createJWT(userForToken);
  res.status(200).json({
    token,
    username: user.username,
    id: user._id,
    email: user.email,
    adoptedPokemons: user.adoptedPokemons,
  });
};

const getAllUsers = async (req, res) => {
  const users =  await User.find({});
  res.json(users);
};

module.exports = {
  createNewUser,
  login,
  getAllUsers,
};
