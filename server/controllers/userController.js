const User = require("../models/user");
const axios = require("axios");
const ErrorHandler = require("../utils/customError");
const { hashPassword, createJWT, comparePasswords } = require("../utils/auth");
const { createPokemonData } = require("../utils/helper");


const createNewUser = async (req, res, next) => {
  const { email, username, password } = req.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
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
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandler("Username or Password not provided", 400));
  }

  const user = await User.findOne({ username });
  const passwordIsCorrect =
    user === null
      ? false
      : await comparePasswords(password, user.passwordHash);
  
  if (!user || !passwordIsCorrect) {
    return next(new ErrorHandler("Invalid username or password", 401));
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
};

const adoptPokemon = async (req, res, next) => {
  const { username } = req.user;
  const pokemonID = req.params.id;

  const user = await User.findOne({ username });
  

  if (!user) {
    return next(new ErrorHandler("Not Authorized", 401));
  }
  

  if (user.adoptedPokemons.length >= 9) {
    return next(new ErrorHandler("Maximum number of pokemons adopted reached", 403));
  }

  const fetchPokemon = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
  );

  const isPokemonAdopted = user.adoptedPokemons
    .map((p) => p.id)
    .includes(fetchPokemon.data.id);

  if (isPokemonAdopted) {
    return next(new ErrorHandler("Pokemon already adopted", 403));
  }

  const pokemon = createPokemonData(fetchPokemon.data);
  user.adoptedPokemons.push(pokemon);
  await user.save();
  res.status(200).json({ message: `${pokemon.name} adopted successfully` });
  
};

const unadoptPokemon = async (req, res,next) => {
  const { username } = req.user;
  const pokemonID = req.params.id;

  const user = await User.findOne({ username });
  if (!user) {
    return next(new ErrorHandler("Not Authorized", 401));
  }

  if (!pokemonID) {
    return next(new ErrorHandler("Pokemon ID not provided", 400));
  }
  if (!user.adoptedPokemons.map((p) => p.id).includes(+pokemonID)) {
    return next(new ErrorHandler("Pokemon not adopted", 404));
  }
  user.adoptedPokemons = user.adoptedPokemons.filter(
    (p) => p.id !== +pokemonID
  );

  await user.save();
  res.status(200).json({ message: `pokemon unadopted successfully` });
 
};

const getAllAdoptedPokemons = async (req, res, next) => {
  const { username } = req.user;
  if (!username) {
    return next(new ErrorHandler("Username not provided", 400));
  }

  const user = await User.findOne({ username });
  if (!user) {
    return next(new ErrorHandler("Not Authorized", 401));
  }
  const adoptedPokemons = user.adoptedPokemons;
  res.status(200).json({ adoptedPokemons });

};

const feedPokemon = async (req, res, next) => {
  const { username } = req.user;
  const pokemonID = +req.params.id;

  if (!username) {
    return next(new ErrorHandler("Username not provided", 400));
  }


  const user = await User.findOne({ username });
  if (!user) {
    return next(new ErrorHandler("Not Authorized", 401));
  }
  const pokemonToFeed = user.adoptedPokemons.find(
    (p) => p.id === pokemonID
  );
  if (!pokemonToFeed) {
    return next(new ErrorHandler("Pokemon not adopted", 404));
  }
  if (pokemonToFeed.health > 90) {
    return next(new ErrorHandler("Pokemon already full", 400));
  } 
  pokemonToFeed.health += 10;
  user.markModified('adoptedPokemons');
  await user.save();
  res.status(200).json({ message: "pokemon fed successfully" });
}

module.exports = {
  createNewUser,
  login,
  adoptPokemon,
  unadoptPokemon,
  getAllAdoptedPokemons,
  feedPokemon,
};
