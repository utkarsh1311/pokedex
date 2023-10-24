import axios from 'axios';
const BASE_URL = 'http://localhost:3000';
let token = null;
if (localStorage.getItem('user')) {
	token = JSON.parse(localStorage.getItem('user')).token;
}

const api = axios.create({
	baseURL: BASE_URL
});

const config = {
	headers: {
		Authorization: `Bearer ${token}`
	}
};

export const getAllPokemons = async (offset) => {
	const response = await api.get(`/pokemons?offset=${offset}`, config);
	return response.data;
};

export const getPokemonById = async (name) => {
	const response = await api.get(`/pokemons/${name}`, config);
	return response.data;
};

export const getAllAdoptedPokemons = async () => {
	const res = await api.get(`/user/pokemons`, config);
	return res.data.adoptedPokemons;
};

export const adoptPokemon = async (id) => {
	const res = await api.post(`/user/pokemons/${id}`, {}, config);
	return res.data;
};

export const unadoptPokemon = async (id) => {
	const res = await api.delete(`/user/pokemons/${id}`, {
		...config
	});
	return res.data;
};
