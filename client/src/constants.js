export const colors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD'
};

export const defPokemon = {
	id: 1,
	name: 'bulbasaur',
	images: {
		animated:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif',
		official:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
	},
	types: ['grass', 'poison'],
	abilities: ['overgrow', 'chlorophyll'],
	height: 7,
	weight: 69,
	stats: [
		{
			name: 'hp',
			value: 45
		},
		{
			name: 'attack',
			value: 49
		},
		{
			name: 'defense',
			value: 49
		},
		{
			name: 'special-attack',
			value: 65
		},
		{
			name: 'special-defense',
			value: 65
		},
		{
			name: 'speed',
			value: 45
		}
	]
};

export const statColor = {
	hp: {
		name: 'HP',
		color: '#0096FF'
	},
	attack: {
		name: 'ATK',
		color: 'orange'
	},
	defense: {
		name: 'DEF',
		color: '#ffd700'
	},
	'special-attack': {
		name: 'SpA',
		color: '#dc143c'
	},
	'special-defense': {
		name: 'SpD',
		color: '#00ff7f'
	},
	speed: {
		name: 'SPD',
		color: '#ff69b4'
	}
};
