const axios = require("axios");
const { createPokemonData } = require("../utils/helper");
const ErrorHandler = require("../utils/customError");
const catchAsyncError = require("../middlewares/catchAsyncError");


const getAllPokemons = async (req, res, next) => {
	const offset = req.query.offset;
	const pokemonData = await axios.get(
		`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=9`
	);
	const pArr = pokemonData.data.results.map(async (res) => {
		const a = await axios(res.url);
		return a.data;
	});
	const pokeList = await Promise.all(pArr);
	const finalList = pokeList.map((p) => createPokemonData(p));
	res.status(200).json(finalList);
	
};

const getPokemonByName = async (req, res) => {
	const name = req.params.name;

		const pokemonData = await axios.get(
			`https://pokeapi.co/api/v2/pokemon/${name}`
		);
		const finalData = createPokemonData(pokemonData.data);
		res.status(200).json(finalData);
};


module.exports = { getAllPokemons, getPokemonByName };
