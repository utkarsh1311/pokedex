const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Pokemon = require("../models/pokemon");
const { default: axios } = require("axios");

// POST route to adopt a Pokemon
router.post("/adopt/:pokemonId", async (req, res) => {
  const { username, pokemonID } = req.body;

  const user = await User.findOne({ username });
  const pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemonID);
});

module.exports = router;
