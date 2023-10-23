const express = require("express");
const {
  adoptPokemon,
  unadoptPokemon,
  getAllAdoptedPokemons,
} = require("../controllers/user");
const router = express.Router();

router.get("/adopt", getAllAdoptedPokemons);
// POST route to adopt a Pokemon
router.post("/adopt", adoptPokemon);

router.delete("/adopt", unadoptPokemon);

module.exports = router;
