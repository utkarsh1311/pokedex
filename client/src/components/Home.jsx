import Navbar from './Navbar';
import bg from '../assets/2.svg';

import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import Toast from './Toast';

const Home = () => {
	const [user] = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, []);

	return (
		<div className="max-w-screen grid h-full grid-cols-8 bg-gray-100 p-6 font-inter">
			<Toast />

			<img
				className="absolute -left-20 -top-10 z-0 w-1/4 md:w-1/2 sm:w-3/4"
				src={bg}
				alt=""
			/>
			<div className="col-start-2 col-end-8 flex flex-col sm:col-start-1 sm:col-end-9">
				<Navbar />
				<div className=" mt-6 grid w-full flex-grow grid-cols-6 gap-6 ">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Home;
