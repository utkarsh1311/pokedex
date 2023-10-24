const express = require("express");
const {
  adoptPokemon,
  unadoptPokemon,
  getAllAdoptedPokemons,
  feedPokemon,
} = require("../controllers/userController");

const router = express.Router();

router.get("/pokemons", getAllAdoptedPokemons);

router.post("/pokemons/:id", adoptPokemon);

router.delete("/pokemons/:id", unadoptPokemon);

router.patch("/pokemons/:id", feedPokemon);

module.exports = router;
