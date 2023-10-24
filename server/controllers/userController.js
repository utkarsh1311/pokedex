const User = require("../models/user");
const axios = require("axios");

const { hashPassword, createJWT, comparePasswords } = require("../utils/auth");
const { createPokemonData } = require("../utils/helper");

const createNewUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
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
    const token = createJWT(savedUser);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: "error creating user" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  try {
    const user = await User.findOne({ username });
    const passwordIsCorrect =
      user === null
        ? false
        : await comparePasswords(password, user.passwordHash);
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
    });
  } catch (error) {
    res.status(500).json({ error: "error logging in" });
  }
};

const adoptPokemon = async (req, res) => {
  const { username } = req.user;
  const pokemonID = req.params.id;
  console.log(pokemonID);

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "not authorized " });
    }

    if (user.adoptedPokemons.length >= 9) {
      return res.status(400).json({ error: "max adoption limit reached" });
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

    const pokemon = createPokemonData(fetchPokemon.data);
    user.adoptedPokemons.push(pokemon);
    await user.save();
    res.status(200).json({ message: `${pokemon.name} adopted successfully` });
  } catch (error) {
    res.status(500).json({ error: "error adopting pokemon" });
  }
};

const unadoptPokemon = async (req, res) => {
  const { username } = req.user;
  const pokemonID = req.params.id;
  console.log("pokemonID", pokemonID);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "not authorized" });
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
    res.status(500).json({ error: "error unadopting pokemon" });
  }
};

const getAllAdoptedPokemons = async (req, res) => {
  const { username } = req.user;
  if (!username) {
    return res.status(401).json({ error: "username not provided" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "not authorized" });
    }
    const adoptedPokemons = user.adoptedPokemons;
    res.status(200).json({ adoptedPokemons });
  } catch (e) {
    res.status(500).json({ error: "error getting adopted pokemons" });
  }
};

const feedPokemon = async (req, res) => {
  const { username } = req.user;
  const pokemonID = +req.params.id;

  if (!username) {
    return res.status(401).json({ error: "username not provided" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "not authorized" });
    }
    const pokemonToFeed = user.adoptedPokemons.find(
      (p) => p.id === pokemonID
    );
    if (!pokemonToFeed) {
      return res.status(404).json({ error: "pokemon not found" });
    }
    if (pokemonToFeed.health <= 90) {
      pokemonToFeed.health += 10;
    } else {
      return res.status(400).json({ error: "pokemon health already full"})
    }
    user.markModified('adoptedPokemons');
    await user.save();
    res.status(200).json({ message: "pokemon fed successfully" });

  } catch (e) {
    res.status(500).json({ error: "error feeding pokemon" });
  }
}


const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

module.exports = {
  createNewUser,
  login,
  getAllUsers,
  adoptPokemon,
  unadoptPokemon,
  getAllAdoptedPokemons,
  feedPokemon,
};
