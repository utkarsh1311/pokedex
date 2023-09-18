import search from '../assets/search.png';

const Search = ({ handleSearch }) => {
	return (
		<div className="group relative col-start-1 col-end-5 flex items-center">
			<input
				onChange={handleSearch}
				className="w-full rounded-lg px-6 py-4 font-semibold text-gray-600 outline-none focus:outline-none group-hover:shadow-lg"
				type="text"
				placeholder="Search your pokemon"
			/>
			<img
				className=" absolute right-4 w-10 rounded-xl drop-shadow-lg group-hover:shadow-lg group-hover:shadow-red-500"
				src={search}
				alt=""
			/>
		</div>
	);
};

export default Search;
