import search from '../assets/search.png';

const Search = ({ handleSearch }) => {
	return (
		<div className="group relative col-start-1 col-end-5 flex items-center sm:col-end-8 sm:h-min">
			<input
				onChange={handleSearch}
				className="w-full rounded-lg px-6 py-4 font-semibold text-gray-600 outline-none focus:outline-none group-hover:shadow-lg"
				type="text"
				placeholder="Search your pokemon"
			/>
			<img
				className="absolute right-4 w-10 rounded-lg shadow-xl drop-shadow-xl group-hover:animate-bounce"
				src={search}
				alt=""
			/>
		</div>
	);
};

export default Search;
