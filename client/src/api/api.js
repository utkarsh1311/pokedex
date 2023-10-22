import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

const token = JSON.parse(localStorage.getItem('user'));
const config = {
	headers: {
		Authorization: `Bearer ${token}`
	}
};

export const getAllPokemons = async (offset) => {
	const response = await axios.get(
		`${BASE_URL}/pokemons?offset=${offset}`,
		config
	);
	return response.data;
};

export const getPokemonById = async (name) => {
	const response = await axios.get(`${BASE_URL}/pokemons/${name}`, config);
	console.log('response', response);
	return response.data;
};
