const express = require("express");
const {
  adoptPokemon,
  unadoptPokemon,
  getAllAdoptedPokemons,
} = require("../controllers/user");

const router = express.Router();

router.get("/pokemons", getAllAdoptedPokemons);
// POST route to adopt a Pokemon
router.post("/pokemons/:id", adoptPokemon);

router.delete("/pokemons/:id", unadoptPokemon);

module.exports = router;
