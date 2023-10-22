import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Pokedex from './components/Pokedex';
import Landing from './components/Landing';
import Adopted from './components/Adopted';
import Login from './components/Login';
import Register from './components/Register';
import UserContext from './context/userContext';
import { useEffect, useState } from 'react';

const App = () => {
	const [user, setUser] = useState(null);

	return (
		<div className="h-full">
			<UserContext.Provider value={[user, setUser]}>
				<Routes>
					<Route
						path="/"
						element={<Home />}>
						<Route
							index
							element={<Landing />}
						/>
						<Route
							path="/pokedex"
							element={<Pokedex />}
						/>
						<Route
							path="/adopted"
							element={<Adopted />}
						/>
					</Route>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/register"
						element={<Register />}
					/>
				</Routes>
			</UserContext.Provider>
		</div>
	);
};

export default App;
