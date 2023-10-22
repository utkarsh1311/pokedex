import React, { useContext } from 'react';
import pokemonGroup from '../assets/pokemonGroup.png';
import pikachu from '../assets/pikachu.png';
import UserContext from '../context/userContext';
import { useOutletContext } from 'react-router-dom';
const Landing = () => {
	
	const [user] = useContext(UserContext);
	return (
		<div className="relative col-span-6 flex w-full items-center text-gray-600 md:flex-col sm:mt-10">
			<div className="flex flex-col gap-4">
				<h1 className="mb-10 text-6xl font-bold md:text-5xl">
					Welcome, <br /> {user?.name}
				</h1>
				<p className="md:text-md text-lg md:text-base">
					{/* write some text for user when they log in to the pokemon adoption agency app  */}
					Welcome to the Pokemon Adoption Agency! Here you can adopt your very
					own Pokemon. You can also view all the Pokemon in the Pokedex.{' '}
					<img
						className="inline"
						src={pikachu}
						alt=""
					/>
				</p>
				<p className="md:text-sm">
					Click on the <span className="font-bold">Pokedex</span> link in the
					navigation bar to view all the Pokemon.
				</p>
				<p className="md:text-sm">
					Click on the <span className="font-bold">Adopted</span> link to view
					all the Pokemon you have adopted.
				</p>
			</div>
			<div>
				<img
					className="drop-shadow-xl md:drop-shadow-2xl "
					src={pokemonGroup}
					alt=""
				/>
			</div>
		</div>
	);
};

export default Landing;
