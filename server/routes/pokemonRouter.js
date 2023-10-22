const router = require("express").Router();
const { getAllPokemons, getPokemonByName } = require("../controllers/pokemon");

router.get("/", getAllPokemons);
router.get("/:name", getPokemonByName); 


module.exports = router;