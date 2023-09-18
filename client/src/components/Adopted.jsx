import React from "react";
import { useState } from "react";
import { defPokemon } from "../constants";
import { colors } from "../constants";

const Adopted = () => {
  const [adopted, setAdopted] = useState([
    defPokemon,
    defPokemon,
    defPokemon,
    defPokemon,
    defPokemon,
  ]);

  return (
    <div className="col-span-6 relative text-gray-600">
      <h2 className="text-4xl font-bold">Here are your pokemons...</h2>
      <div className="grid grid-cols-3 gap-8 mt-6">
        {adopted.map((pokemon) => {
          return (
            <div className="bg-white rounded-md p-4 flex flex-col items-center shadow-lg">
              <div className="w-1/4">
                <img
                  style={{
                    filter: `drop-shadow(0px 8px 2px rgb(152,152,152))`,
                  }}
                  className="w-full aspect-square group-hover:scale-125 duration-150"
                  src={pokemon.sprites.animated}
                  alt=""
                />
              </div>
              <div className="flex-grow flex flex-col items-center text-center">
                <p className="text-xl">{pokemon.name}</p>
                <div className="flex gap-1 mt-2">
                  {pokemon.types.map((t, i) => (
                    <p
                      key={i}
                      className="px-2 py-1 text-xs font-bold rounded-md text-white"
                      style={{ backgroundColor: `${colors[t.type.name]} ` }}>
                      {t.type.name}
                    </p>
                  ))}
                </div>
                <div className="m-3 w-full">
                  <p className=" ">HP 40/100</p>
                  <div className="bg-gray-200 rounded-full h-2 w-full">
                    <div className="bg-green-700 rounded-full h-2 w-1/2"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="hover:scale-110  duration-150 text-xs px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Feed Me
                  </button>
                  <button className="hover:scale-110  duration-150 text-xs px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Unadopt me
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Adopted;
