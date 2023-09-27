const { default: axios } = require("axios");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/pokemons", async (req, res, next) => {
	const offset = req.query.offset;
	try {
		const pokemonData = await axios.get(
			`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=9`
		);
		const pArr = pokemonData.data.results.map(async (res) => {
			const a = await axios(res.url);
			return a.data;
		});

		const pokeList = await Promise.all(pArr);
		const finalList = pokeList.map((p) => {
			return {
				id: p.id,
				name: p.name,
				images: {
					animated:
						p.sprites.versions["generation-v"]["black-white"].animated
							.front_default,
					oficial: p.sprites.other["official-artwork"].front_default,
				},
				types: p.types.map((t) => t.type.name),
				abilities: p.abilities.map((a) => a.ability.name),
				height: p.height,
				weight: p.weight,
				stats: p.stats.map((s) => {
					return {
						name: s.stat.name,
						value: s.base_stat,
					};
				}),
			};
		});
		res.status(200).json(finalList);
	} catch (error) {
		next(error);
	}
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send({ message: err.message });
});

module.exports = app;
