import React from 'react';
import { useState, useEffect } from 'react';
import PokemonGrid from './PokemonGrid';
import PokemonDetail from './PokemonDetail';
import Search from './Search';
import { defPokemon } from '../constants';

const Pokedex = () => {
	const [pokemons, setPokemons] = useState([]);
	const [selected, setSelected] = useState(defPokemon);
	const [query, setQuery] = useState('');
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		const fetchPokemon = async () => {
			const list = await fetch(
				`https://pokeapi.co/api/v2/pokemon/?limit=9&offset=${offset}`
			);
			let data = await list.json();
			const pArr = data.results.map(async (res) => {
				const a = await fetch(res.url);
				return a.json();
			});

			const pokeList = await Promise.all(pArr);
			const finalList = pokeList.map((p) => {
				return {
					id: p.id,
					name: p.name,
					sprites: {
						official_artwork:
							p.sprites.other['official-artwork'].front_default,
						animated:
							p.sprites.versions['generation-v']['black-white']
								.animated.front_default
					},
					types: p.types,
					abilities: p.abilities,
					height: p.height,
					weight: p.weight,
					stats: p.stats
				};
			});

			setPokemons((prev) => [...finalList]);
		};

		fetchPokemon();
	}, [offset]);

	useEffect(() => {
		const searchPokemon = setTimeout(async () => {
			if (query.trim().length > 0) {
				const searchedPokemon = pokemons.filter((p) =>
					p.name.startsWith(query.toLowerCase())
				);
				if (searchedPokemon.length > 0) {
					setSelected(searchedPokemon[0]);
				} else {
					const newPokemon = await fetch(
						`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
					);
					if (newPokemon.status === 404) {
						setSelected(defPokemon);
						return;
					}

					const data = await newPokemon.json();

					const newPoke = {
						id: data.id,
						name: data.name,
						sprites: {
							official_artwork:
								data.sprites.other['official-artwork']
									.front_default,
							animated:
								data.sprites.versions['generation-v'][
									'black-white'
								].animated.front_default
						},
						types: data.types,
						abilities: data.abilities,
						height: data.height,
						weight: data.weight,
						stats: data.stats
					};
					setSelected((prev) => newPoke);
				}
			}
		}, 1000);
		return () => clearTimeout(searchPokemon);
	}, [query]);

	const handleClick = (e) => {
		let pokemonId = e.target.id;
		let pokemon = pokemons.find((p) => p.id === parseInt(pokemonId));
		setSelected(pokemon);
	};

	const handleNext = (e) => {
		if (e.target.id == 'prev') {
			setOffset((prev) => prev - 9);
			return;
		}
		setOffset((prev) => prev + 9);
	};

	return (
		<>
			<Search handleSearch={(e) => setQuery((prev) => e.target.value)} />
			<PokemonGrid
				handleClick={handleClick}
				pokemons={pokemons}
				handleNext={handleNext}
			/>
			{pokemons && <PokemonDetail pokemon={selected} />}
		</>
	);
};

export default Pokedex;
