import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonGrid = ( { handleClick ,pokemons }) => {
  return (
    <div className=" grid grid-cols-3 gap-10 col-start-1 col-end-5 md:grid-cols-2">
      {pokemons.map((pokemon) => (
        <PokemonCard handleClick={handleClick}  pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonGrid;
