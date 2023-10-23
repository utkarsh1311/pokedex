import React, { useContext, useEffect, useState } from 'react';
import { getAllAdoptedPokemons, unadoptPokemon } from '../api/api';
import snorlax from '../assets/snorlax.png';
import { colors } from '../constants';
import UserContext from '../context/userContext';
import { toast } from 'react-toastify';
const Adopted = () => {
	const [user] = useContext(UserContext);

	const [adoptedPokemons, setAdoptedPokemons] = useState([]);

	useEffect(() => {
		if (!user) return;
		const getAdoptedPokemons = async () => {
			const adopted = await getAllAdoptedPokemons();
			setAdoptedPokemons(adopted);
		};
		getAdoptedPokemons();
	}, []);

	const handleUnadoption = async (e) => {
		const pokemonId = e.target.id;
		try {
			const res = await unadoptPokemon(pokemonId);
			toast.success(res.message);
			const newAdoptedPokemons = adoptedPokemons.filter(
				(pokemon) => pokemon.id !== +pokemonId
			);
			setAdoptedPokemons((prev) => [...newAdoptedPokemons]);
		} catch (e) {
			console.log(e);
			toast.error(e.response.data.error);
		}
	};
	return (
		<div className="relative col-span-6 text-gray-600">
			<h2 className="text-4xl font-bold">Here are your pokemons...</h2>
			<div className="mt-6 grid grid-cols-3 gap-8">
				{adoptedPokemons.length > 0 ? (
					adoptedPokemons.map((pokemon) => (
						<div
							key={pokemon.id}
							className="flex flex-col items-center rounded-md bg-white p-4 shadow-lg sm:col-span-3">
							<div className="w-1/4">
								<img
									style={{
										filter: `drop-shadow(0px 8px 2px rgb(152,152,152))`
									}}
									className="aspect-square w-full duration-150 group-hover:scale-125"
									src={pokemon.images.official}
									alt={pokemon.name}
								/>
							</div>
							<div className="flex flex-grow flex-col items-center text-center">
								<p className="text-xl">{pokemon.name}</p>
								<div className="mt-2 flex gap-1">
									{pokemon.types.map((type, i) => (
										<p
											key={i}
											className="rounded-md px-2 py-1 text-xs font-bold text-white"
											style={{
												backgroundColor: `${colors[type]} `
											}}>
											{type}
										</p>
									))}
								</div>
								<div className="m-3 w-full">
									<p className=" ">HP 40/100</p>
									<div className="h-2 w-full rounded-full bg-gray-200">
										<div className="h-2 w-1/2 rounded-full bg-green-700"></div>
									</div>
								</div>
								<div className="flex gap-4">
									<button className="rounded-lg  bg-blue-600 px-4 py-2 text-xs text-white duration-150 hover:scale-110">
										Feed Me
									</button>
									<button
										id={pokemon.id}
										onClick={handleUnadoption}
										className="rounded-lg  bg-blue-600 px-4 py-2 text-xs text-white duration-150 hover:scale-110">
										Unadopt me
									</button>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="col-span-3 grid h-full place-content-center ">
						<img
							className="w-1/2 mx-auto drop-shadow-xl"
							src={snorlax}
							alt="snorlax"
						/>
						<p className='text-center  text-3xl mt-8'>You have not adopted any pokemons. 😢😢</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Adopted;
