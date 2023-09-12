import React from "react";
import pokedex from "../assets/pokedex.png";
import adopted from "../assets/adopted.png";

const Navbar = () => {
  return (
    <nav className="py-4 rounded-lg drop-shadow-xl bg-white px-6 font-bold text-gray-600 ">
      <ul className="flex items-center gap-10">
        <li className="flex gap-2 items-center ">
          <img src={pokedex} alt="" />
          <span className="">Pokedex</span>
        </li>
        <li className="flex gap-2 items-center ">
          <img className=" w-12" src={adopted} alt="" />
          <span>Adopted</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
