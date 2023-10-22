import React, { useContext } from 'react';
import pokedex from '../assets/pokedex.png';
import adopted from '../assets/adopted.png';
import menu from '../assets/menu.svg';
import home from '../assets/home.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UserContext from '../context/userContext';

const Navbar = () => {
	const [user, setUser] = useContext(UserContext);
	const navigate = useNavigate();

	const [toggle, setToggle] = useState(false);

	const handleLogOut = () => {
		setUser(null);
		localStorage.clear();
		navigate('/login');
	};

	return (
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
					} items-center transition-all duration-500 ease-in`}>
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
					{user && (
						<li className=" ml-auto pr-2 sm:m-0 sm:w-full ">
							<button
								onClick={handleLogOut}
								className="rounded-md border-2 px-4 py-2 font-bold transition-all duration-150 hover:scale-110 hover:bg-gray-700 hover:text-white sm:w-full  ">
								Log out
							</button>
						</li>
					)}
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
