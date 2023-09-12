import React from "react";
import search from "../assets/search.png";


const Search = () => {
  return (
    <div className="relative flex items-center col-start-1 col-end-5 group">
      <input
        className="w-full px-6 py-4 rounded-lg outline-none focus:outline-none font-semibold text-gray-600 group-hover:shadow-lg"
        type="text"
        placeholder="Search your pokemon"
      />
      <img
        className=" group-hover:shadow-red-500 group-hover:shadow-lg absolute right-4 rounded-xl w-10 drop-shadow-lg"
        src={search}
        alt=""
      />
    </div>
  );
};

export default Search;
