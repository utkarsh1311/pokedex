import React from 'react';
import pokedex from '../assets/adopted.png';
import { colors } from '../constants';

const PokemonCard = ({ handleClick, pokemon }) => {
	// console.log('pokemon', pokemon)
	return (
		<div className="group relative flex aspect-video  flex-col items-center justify-center rounded-xl bg-white py-4 shadow-lg duration-150 hover:scale-105 hover:shadow-xl">
			<div
				id={`${pokemon.id}`}
				onClick={handleClick}
				className=" absolute z-10 min-h-full min-w-full "
			></div>
			<div className="">
				<img
					style={{
						filter: `drop-shadow(0px 8px 2px rgb(152,152,152))`
					}}
					className="absolute bottom-24 left-1/2 aspect-square max-h-16 -translate-x-1/2 transform duration-150 group-hover:scale-125"
					src={pokemon.images.animated}
				/>
			</div>
			<div className="mt-10 text-center">
				<p className="text-xs font-bold text-gray-400">#{pokemon.id}</p>
				<p className=" font-bold text-gray-700">
					{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
				</p>
				<div className="mt-2 flex justify-center gap-1">
					{pokemon.types.map((t, i) => (
						<p
							key={i}
							className="rounded-md px-2 py-1 text-xs font-bold text-white"
							style={{
								backgroundColor: `${colors[t]} `
							}}
						>
							{t}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default PokemonCard;
