import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonGrid = ({ handleNext, handleClick, pokemons }) => {
  return (
    <>
      <div className=" grid grid-cols-3 gap-8 col-start-1 col-end-5 md:grid-cols-2 items-center justify-center">
        {pokemons.map((pokemon) => (
          <PokemonCard handleClick={handleClick} pokemon={pokemon} />
        ))}
        <button
          id="prev"
          onClick={handleNext}
          className="col-start-1 bg-blue-700 w-fit mx-auto px-4 py-2 text-white  rounded-lg">
          🡸 Prev
        </button>
        <button
          id="next"
          onClick={handleNext}
          className="col-start-3 bg-blue-700 w-fit mx-auto px-4 py-2 text-white  rounded-lg">
          Next 🡺
        </button>
      </div>
    </>
  );
};

export default PokemonGrid;
