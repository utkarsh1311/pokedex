import React, { useContext, useEffect } from 'react';
import pokemonGroup from '../assets/pokemonGroup.png';
import bg from '../assets/2.svg';
import { Link, useNavigate } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import UserContext from '../context/userContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Toast from './Toast';

const Login = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm();

	const [, setUser] = useContext(UserContext);
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();

	const login = async (data) => {
		setLoading(true);
		const { username, password } = data;

		try {
			const registerdUser = await axios.post(`${import.meta.env.VITE_BASE_URI}/login`, {
				username,
				password
			});
			setUser(registerdUser.data);
			setLoading(false);
			localStorage.setItem('user', JSON.stringify(registerdUser.data));
			navigate('/');

		} catch (error) {
			toast.error("Username or password doesn't match");
			reset();
			setLoading(false);

		}
	};

	useEffect(() => {
		const exisitingUser = JSON.parse(localStorage.getItem('user'));
		if (exisitingUser) {
			navigate('/');
		}
	}, []);

	return (
		<div className="relative flex h-screen  justify-center overflow-hidden bg-gray-100 p-10 font-inter text-gray-600 md:flex-col">
			<Toast />
			<img
				src={bg}
				width={500}
				height={500}
				className="absolute w-1/2 md:-left-10 md:-top-10 md:z-0 md:w-full "
				alt=""
			/>
			<div className="z-10 flex w-1/2 flex-col justify-center gap-6 md:hidden ">
				<h1 className="text-6xl font-bold">
					Welcome to Pokemon <br /> adoption agency
				</h1>
				<p className="break-words text-lg">
					Here you can adopt your favorite pokemon and take care of them
				</p>
				<img
					className="w-5/6 drop-shadow-xl "
					src={pokemonGroup}
					alt=""
				/>
			</div>
			<div className="z-10 flex w-1/3 items-center justify-center px-8 py-10 md:w-full">
				<div className="flex flex-col rounded-xl border-2 bg-white p-10 shadow-xl ">
					<p className=" mb-8 self-start text-4xl font-bold">Login</p>
					<form className="flex flex-col gap-8">
						<div className="flex flex-col">
							<label
								className="text-lg font-semibold text-gray-700"
								htmlFor="username"
							>
								Username
							</label>
							<input
								{...register('username', {
									required: true
								})}
								placeholder="Enter your username"
								className="text-md rounded-md border-none bg-gray-200 px-4 py-2  focus:outline-none"
								type="text"
							/>
							{errors.username && (
								<p className="text-xs text-red-500">
									Please enter a valid username
								</p>
							)}
						</div>
						<div className="flex flex-col">
							<label
								className="text-lg font-semibold text-gray-700"
								htmlFor="password"
							>
								Password
							</label>
							<input
								{...register('password', {
									required: true,
									minLength: 8
								})}
								placeholder="Enter your password"
								className="text-md rounded-md border-none bg-gray-200 px-4 py-2 focus:outline-none"
								type="password"
							/>
							{errors.password && (
								<p className="text-xs text-red-500">
									Please enter a valid password
								</p>
							)}
						</div>
						<div className="flex flex-col">
							<button
								onClick={handleSubmit(login)}
								className=" w-full rounded-lg bg-blue-500 px-6 py-2 text-lg text-white"
								type="submit"
								disabled={loading}
							>
								{
									loading ? <div className='w-8 h-8 rounded-full mx-auto border-l-2 animate-spin border-white'>

									</div> : 'Login'
								}
							</button>
						</div>
					</form>
					<p className="mt-4 text-center text-sm text-gray-500">
						New user? Register
						<Link
							to="/register"
							className="text-blue-500 hover:cursor-pointer hover:font-bold hover:text-blue-700"
						>
							{' '}
							here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
