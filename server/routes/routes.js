const router = require("express").Router();

router.get("/pokemons", getAllPokemons);

module.exports = router;