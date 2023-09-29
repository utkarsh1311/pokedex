import React from 'react';
import PokemonCard from './PokemonCard';
import Lottie from 'lottie-react';
import pokeballAnimation from '../assets/pokeball.json';

const PokemonGrid = ({ handleNext, handleClick, pokemons, loading }) => {
	return (
		<>
			<div className="  col-start-1 col-end-5 grid  grid-cols-3 items-center justify-center  gap-8 sm:col-start-1 sm:col-end-8 md:grid-cols-4">
				{loading ? (
					<div className="col-span-3 flex items-center justify-center sm:col-span-4">
						<div className="w-1/6 sm:w-1/4 ">
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
				<div className="col-span-3 flex justify-between px-4 sm:col-span-4">
					<button
						id="prev"
						onClick={handleNext}
						className=" w-fit rounded-lg bg-blue-700 px-4 py-2  text-white transition-all duration-150 hover:scale-110 hover:bg-blue-900">
						🡸 Prev
					</button>
					<button
						id="next"
						onClick={handleNext}
						className=" w-fit rounded-lg bg-blue-700 px-4 py-2  text-white transition-all duration-150 hover:scale-110 hover:bg-blue-900">
						Next 🡺
					</button>
				</div>
			</div>
		</>
	);
};

export default PokemonGrid;
