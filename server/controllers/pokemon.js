const axios = require("axios");
const { formatPokemonData } = require("../utils/helper");

const getAllPokemons = async (req, res) => {
	const offset = req.query.offset;
	const pokemonData = await axios.get(
		`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=9`
	);
	const pArr = pokemonData.data.results.map(async (res) => {
		const a = await axios(res.url);
		return a.data;
	});

	const pokeList = await Promise.all(pArr);
	const finalList = pokeList.map((p) => formatPokemonData(p));
	res.status(200).json(finalList);
};

const getPokemonById = async (req, res) => {
	const name = req.params.name;

	const pokemonData = await axios.get(
		`https://pokeapi.co/api/v2/pokemon/${name}`
	);
	const pokemon = formatPokemonData(pokemonData.data);
	res.status(200).json(pokemon);
};

module.exports = { getAllPokemons, getPokemonById };
