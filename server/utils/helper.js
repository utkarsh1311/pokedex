const createPokemonData = (pokemon) => {
	return {
		id: pokemon.id,
		name: pokemon.name,
		images: {
			animated:
				pokemon.sprites.versions["generation-v"]["black-white"].animated
					.front_default,
			official: pokemon.sprites.other["official-artwork"].front_default,
		},
		types: pokemon.types.map((t) => t.type.name),
		abilities: pokemon.abilities.map((a) => a.ability.name),
		height: pokemon.height,
		weight: pokemon.weight,
		stats: pokemon.stats.map((s) => {
			return {
				name: s.stat.name,
				value: s.base_stat,
			};
		}),
		health: 100
	};
};

module.exports = { createPokemonData };