import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Pokedex from './components/Pokedex';
import Landing from './components/Landing';
import Adopted from './components/Adopted';
import Login from './components/Login';

const App = () => {
	return (
		<div className="h-full">
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
			</Routes>
		</div>
	);
};

export default App;
