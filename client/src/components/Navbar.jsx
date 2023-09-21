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
			<div className='sm:hidden'>
				<nav className="rounded-lg bg-white px-6 py-4 font-bold text-gray-600 drop-shadow-xl">
					<ul className="flex items-center gap-10">
						<Link
							to={'/'}
							className="flex items-center gap-2 ">
							<img
								className="w-10"
								src={home}
								alt=""
							/>
							<span className="">Home</span>
						</Link>
						<Link
							to={'/pokedex'}
							className="flex items-center gap-2 ">
							<img
								src={pokedex}
								alt=""
							/>
							<span className="">Pokedex</span>
						</Link>
						<Link
							to={'/adopted'}
							className="flex items-center gap-2 ">
							<img
								className=" w-12"
								src={adopted}
								alt=""
							/>
							<span>Adopted</span>
						</Link>
					</ul>
				</nav>
			</div>
			<div className="bg-red-800">
				<nav className='md:hidden'>
					<img
						onClick={() => setToggle(!toggle)}
						src={menu}
						alt=""
						className="w-8 lg:hidden"
					/>
					{toggle && (
						<div className="absolute left-0 top-10 z-10 w-full rounded-lg bg-white px-6 py-4 font-bold text-gray-600 drop-shadow-xl transition-all duration-500 ease-in-out lg:hidden ">
							<ul className="flex flex-col gap-5 lg:hidden">
								<Link
									onClick={() => setToggle(!toggle)}
									to={'/'}
									className=" rounded-md p-2">
									<span className="">Home</span>
								</Link>
								<Link
									onClick={() => setToggle(!toggle)}
									to={'/pokedex'}
									className="rounded-md p-2">
									<span className="">Pokedex</span>
								</Link>
								<Link
									onClick={() => setToggle(!toggle)}
									to={'/adopted'}
									className="rounded-md p-2">
									<span>Adopted</span>
								</Link>
							</ul>
						</div>
					)}
				</nav>
			</div>
		</>
	);
};

export default Navbar;
