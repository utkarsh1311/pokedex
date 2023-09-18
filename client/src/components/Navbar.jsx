import React from 'react';
import pokedex from '../assets/pokedex.png';
import adopted from '../assets/adopted.png';
import home from '../assets/home.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="rounded-lg bg-white px-6 py-4 font-bold text-gray-600 drop-shadow-xl ">
			<ul className="flex items-center gap-10">
				<Link
					to={'/'}
					className="flex items-center gap-2 "
				>
					<img
						className="w-10"
						src={home}
						alt=""
					/>
					<span className="">Home</span>
				</Link>
				<Link
					to={'/pokedex'}
					className="flex items-center gap-2 "
				>
					<img
						src={pokedex}
						alt=""
					/>
					<span className="">Pokedex</span>
				</Link>
				<Link
					to={'/adopted'}
					className="flex items-center gap-2 "
				>
					<img
						className=" w-12"
						src={adopted}
						alt=""
					/>
					<span>Adopted</span>
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
