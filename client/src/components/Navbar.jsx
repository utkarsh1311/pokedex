import React from 'react';
import pokedex from '../assets/pokedex.png';
import adopted from '../assets/adopted.png';
import menu from '../assets/menu.svg';
import home from '../assets/home.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
	// const [active, setActive] = useState('Home');
	const [toggle, setToggle] = useState(false);

	return (
		<>
			<div className="">
				<nav className="relative rounded-lg bg-white px-6 py-4 font-bold text-gray-600 drop-shadow-xl">
					<img
						onClick={() => setToggle(!toggle)}
						src={menu}
						className="hidden w-8 cursor-pointer sm:flex"
						alt=""
					/>
					<ul
						className={`flex gap-10 overflow-hidden sm:flex-col sm:justify-around sm:gap-2 ${
							toggle ? 'sm:max-h-96' : ' sm:max-h-0'
						} transition-all duration-500 ease-in`}>
						<li onClick={() => setToggle(!toggle)}>
							<Link
								to={'/'}
								className="flex items-center gap-2 sm:mt-4">
								<img
									className="w-10
									sm:hidden"
									src={home}
									alt=""
								/>
								<span className="">Home</span>
							</Link>
						</li>
						<li onClick={() => setToggle(!toggle)}>
							<Link
								to={'/pokedex'}
								className="flex items-center gap-2 ">
								<img
									src={pokedex}
									alt=""
									className="sm:hidden"
								/>
								<span className="">Pokedex</span>
							</Link>
						</li>
						<li onClick={() => setToggle(!toggle)}>
							<Link
								to={'/adopted'}
								className="flex items-center gap-2 ">
								<img
									className=" w-12 sm:hidden"
									src={adopted}
									alt=""
								/>
								<span>Adopted</span>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
};

export default Navbar;
