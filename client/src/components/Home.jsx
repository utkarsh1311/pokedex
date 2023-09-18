import Navbar from './Navbar';
import bg from '../assets/2.svg';

import { Outlet } from 'react-router-dom';

const Home = () => {
	return (
		<div className="max-w-screen grid h-full grid-cols-8 bg-gray-100 p-6 font-inter">
			<img
				className="absolute -left-20 -top-10 z-0 w-1/4"
				src={bg}
				alt=""
			/>
			<div className="col-start-2 col-end-8 flex flex-col">
				<Navbar />
				<div className=" mt-6 grid w-full flex-grow grid-cols-6 gap-6">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Home;
