import React from 'react';
import { useState, useEffect } from 'react';
import PokemonGrid from './PokemonGrid';
import PokemonDetail from './PokemonDetail';
import Search from './Search';
import { defPokemon } from '../constants';
import axios from 'axios';

const Pokedex = () => {
	const [pokemons, setPokemons] = useState([]);
	const [selected, setSelected] = useState(defPokemon);
	const [query, setQuery] = useState('');
	const [disableButtons, setDisableButtons] = useState(false);
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setDisableButtons(true);

		const getPokemons = async () => {
			setLoading(true);
			try {
				const response = await axios.get('http://localhost:3000/pokemons', {
					params: { offset }
				});
				setPokemons(response.data);

				setLoading(false);
				setDisableButtons(false);
			} catch (error) {
				console.error('Error:', error);
			} finally {
				setDisableButtons(false);
			}
		};
		getPokemons();
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
					const newPokemon = await axios.get(
						'http://localhost:3000/pokemons/' + query.toLowerCase()
					);

					setSelected(newPokemon.data);
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
		if (disableButtons) return;
		if (e.target.id == 'prev') {
			if (offset === 0) return;
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
				loading={loading}
			/>
			{pokemons && <PokemonDetail pokemon={selected} />}
		</>
	);
};

export default Pokedex;
