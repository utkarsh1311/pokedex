const router = require("express").Router();
const { getAllPokemons, getPokemonById } = require("../controllers/pokemon");

router.get("/pokemons", getAllPokemons);
router.get("/pokemons/:id", getPokemonById);


module.exports = router;