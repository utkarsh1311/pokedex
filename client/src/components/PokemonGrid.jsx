import React from 'react';
import PokemonCard from './PokemonCard';
import Lottie from 'lottie-react';
import pokeballAnimation from '../assets/pokeball.json';

const PokemonGrid = ({ handleNext, handleClick, pokemons, loading }) => {
	return (
		<>
			<div className="  col-start-1 col-end-5 grid grid-cols-3 items-center justify-center gap-8 md:grid-cols-2">
				{loading ? (
					<div className="col-span-3 flex items-center justify-center">
						<div className="w-1/6">
							<Lottie
								animationData={pokeballAnimation}
								loop={true}
							/>
						</div>
					</div>
				) : (
					pokemons.map((p) => (
						<PokemonCard
							key={p.id}
							handleClick={handleClick}
							pokemon={p}
						/>
					))
				)}
				<button
					id="prev"
					onClick={handleNext}
					className="col-start-1 mx-auto w-fit rounded-lg bg-blue-700 px-4 py-2  text-white transition-all duration-150 hover:scale-110 hover:bg-blue-900">
					🡸 Prev
				</button>
				<button
					id="next"
					onClick={handleNext}
					className="col-start-3 mx-auto w-fit rounded-lg bg-blue-700 px-4 py-2  text-white transition-all duration-150 hover:scale-110 hover:bg-blue-900">
					Next 🡺
				</button>
			</div>
		</>
	);
};

export default PokemonGrid;
