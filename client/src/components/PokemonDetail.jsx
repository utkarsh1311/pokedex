import { colors, statColor } from '../constants';

const PokemonDetail = ({ pokemon }) => {
	return (
		// center div with absolute position
		<div className="sm:order-2 relative col-start-5 col-end-7 flex h-fit flex-col gap-4 rounded-xl bg-white pb-8 drop-shadow-xl sm:col-start-1 sm:col-end-9">
			<img
				style={{ filter: `drop-shadow(0px 8px 6px rgb(152,152,152))` }}
				className="absolute -top-24 left-1/2 w-3/4 -translate-x-1/2 transform sm:relative sm:top-0"
				src={pokemon.images.official}
				alt=""
			/>
			<div className="mt-40 text-center sm:mt-0">
				<p className="text-xs text-gray-600">
					#{`${pokemon.id}`.padStart(3, '0')}
				</p>
				<p className="text-xl font-bold text-gray-800">
					{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
				</p>
				<div className="mt-2 flex justify-center gap-1">
					{pokemon.types.map((t, i) => (
						<p
							key={i}
							className="rounded-md px-2 py-1 text-xs font-bold"
							style={{
								backgroundColor: `${colors[t]} `
							}}>
							{t}
						</p>
					))}
				</div>
				<div className="mt-4 flex flex-col gap-4 ">
					<div>
						<p className="text-sm font-bold text-gray-700">ABILITIES</p>
						<div className="mt-2 flex justify-center gap-4">
							{pokemon.abilities.map((a) => {
								return (
									<p className="rounded-full border border-black px-2 py-1 text-xs text-gray-600">
										{a}
									</p>
								);
							})}
						</div>
					</div>
					<div className="grid grid-cols-2">
						<div className="flex flex-col text-sm font-semibold text-gray-700">
							<p className="text-sm">HEIGHT</p>
							<p className="mx-auto rounded-full bg-gray-200 px-4 py-1">
								{pokemon.height / 10}m
							</p>
						</div>
						<div className="flex flex-col text-sm font-semibold text-gray-700">
							<p className="">WEIGHT</p>
							<p className="mx-auto rounded-full bg-gray-200 px-4 py-1">
								{pokemon.weight / 10}kg
							</p>
						</div>
					</div>
					<div>
						<p className="text-sm font-bold text-gray-700">STATS</p>
						<div className="mt-2 flex flex-wrap justify-around px-4">
							{pokemon.stats.map((s) => {
								return (
									<div className="flex flex-col justify-center gap-2 rounded-xl bg-gray-100">
										<p
											className="rounded-full p-2 text-xs font-bold text-white"
											style={{
												backgroundColor: `${statColor[s.name].color}`
											}}>
											{statColor[s.name].name}
										</p>
										<p className="text-xs font-semibold text-gray-600">
											{s.value}
										</p>
									</div>
								);
							})}
						</div>
					</div>
					<div className="mt-2">
						<button className="rounded-lg bg-blue-700 px-6 py-2 text-white hover:animate-spin hover:scale-110 hover:shadow-2xl">
							Adopt Me
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokemonDetail;
