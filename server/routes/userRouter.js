const express = require("express");
const { adoptPokemon, unadoptPokemon } = require("../controllers/user");
const router = express.Router();

// POST route to adopt a Pokemon
router.post("/adopt", adoptPokemon);

router.delete("/adopt", unadoptPokemon);

module.exports = router;
