const User = require("../models/user");
const axios = require("axios");

const { hashPassword, createJWT, comparePasswords } = require("../utils/auth");
const { formatPokemonData } = require("../utils/helper");

const createNewUser = async (req, res) => {
  const { email, username, password } = req.body;

  const existingUser = await User.findOne({ username });
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

const adoptPokemon = async (req, res) => {
  const { username, pokemonID } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "not authorized " });
    }
    const fetchPokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
    );

    const isPokemonAdopted = user.adoptedPokemons
      .map((p) => p.id)
      .includes(fetchPokemon.data.id);

    if (isPokemonAdopted) {
      return res.status(500).json({ error: "Pokemon already adopted" });
    }

    const pokemon = formatPokemonData(fetchPokemon.data);
    user.adoptedPokemons.push(pokemon);
    await user.save();
    res.status(200).json({ message: `${pokemon.name} adopted successfully` });
  } catch (error) {
    return res.status(500).json({ error: "error adopting pokemon" });
  }
};

const unadoptPokemon = async (req, res) => {
  const { username, pokemonID } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "not authorized" });
    }

    if (!pokemonID) {
      return res.status(401).json({ error: "pokemon id not provided " });
    }
    if (!user.adoptedPokemons.map((p) => p.id).includes(+pokemonID)) {
      return res.status(500).json({ error: "Pokemon not adopted" });
    }
    user.adoptedPokemons = user.adoptedPokemons.filter(
      (p) => p.id !== +pokemonID
    );

    await user.save();
    res.status(200).json({ message: `pokemon unadopted successfully` });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "error unadopting pokemon" });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate("adoptedPokemons");
  res.json(users);
};

module.exports = {
  createNewUser,
  login,
  getAllUsers,
  adoptPokemon,
  unadoptPokemon,
};
