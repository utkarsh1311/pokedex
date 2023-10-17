import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

export const getAllPokemons = async (offset) => {
	const response = await axios.get(`${BASE_URL}/pokemons?offset=${offset}`);
	return response.data;
};

export const getPokemonById = async (name) => {
    const response = await axios.get(`${BASE_URL}/pokemons/${name}`);
    console.log('response', response)
    return response.data;
}