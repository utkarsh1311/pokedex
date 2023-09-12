import React from "react";
import pokedex from "../assets/adopted.png";
import { colors } from "../constants"

const PokemonCard = ({ handleClick , pokemon }) => {


  // console.log('pokemon', pokemon)
  return (
    <div className="group duration-150 hover:shadow-xl hover:scale-105  rounded-xl bg-white flex flex-col justify-center aspect-video relative items-center py-4 shadow-lg">
      <div
        id={`${pokemon.id}`}
        onClick={handleClick}
        className=" min-w-full min-h-full absolute z-10 "></div>
      <div className="">
        <img
          style={{ filter: `drop-shadow(0px 8px 2px rgb(152,152,152))` }}
          className="absolute left-1/2 transform -translate-x-1/2 bottom-24 aspect-square max-h-16 group-hover:scale-125 duration-150"
          src={
            pokemon.sprites.versions["generation-v"]["black-white"].animated
              .front_default
          }
        />
      </div>
      <div className="mt-10 text-center">
        <p className="text-xs text-gray-400 font-bold">#{pokemon.id}</p>
        <p className=" font-bold text-gray-700">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </p>
        <div className="flex gap-1 justify-center mt-2">
          {pokemon.types.map((t, i) => (
            <p
              key={i}
              className="px-2 py-1 text-xs font-bold rounded-md text-white"
              style={{ backgroundColor: `${colors[t.type.name]} ` }}>
              {t.type.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
