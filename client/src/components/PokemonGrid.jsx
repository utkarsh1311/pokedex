import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonGrid = ({ handleNext, handleClick, pokemons }) => {
	return (
		<>
			<div className="  col-start-1 col-end-5 grid grid-cols-3 items-center justify-center gap-8 md:grid-cols-2">
				{pokemons.map((pokemon) => (
					<PokemonCard
						key={pokemon.id}
						handleClick={handleClick}
						pokemon={pokemon}
					/>
				))}
				<button
					id="prev"
					onClick={handleNext}
					className="col-start-1 mx-auto w-fit rounded-lg bg-blue-700 px-4 py-2  text-white">
					🡸 Prev
				</button>
				<button
					id="next"
					onClick={handleNext}
					className="col-start-3 mx-auto w-fit rounded-lg bg-blue-700 px-4 py-2  text-white">
					Next 🡺
				</button>
			</div>
		</>
	);
};

export default PokemonGrid;
