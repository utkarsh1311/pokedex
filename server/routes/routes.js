const router = require("express").Router();
const { getAllPokemons, getPokemonByName } = require("../controllers/pokemon");

router.get("/pokemons", getAllPokemons);
router.get("/pokemons/:name", getPokemonByName); 


module.exports = router;