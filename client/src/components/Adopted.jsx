import React from "react";
import { useState } from "react";

const Adopted = () => {
//   const [adopted, setAdopted] = useState([
//     {
//       id: 1,
//       name: "bulbasaur",
//       sprites: {
//         versions: {
//             "generation-v": {
//                 "black-white": {
//                     animated: {
//                         front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif"
//       },
//       health: 100,
//       type: ["grass", "poison"],
//     },

//   ]);

  return (
    <div className="relative col-span-6 text-gray-600">
      <h4 className="text-2xl">Here are your adopted pokemons</h4>
      <div className="grid grid-cols-4 ">
        {adopted.map((pokemon) => (
          <div className="flex flex-col items-center gap-2">
            <img
              className="w-32"
              src={pokemon.sprites.other.animated.front_default}
              alt=""
            />
            <p className="text-lg font-bold">{pokemon.name}</p>
            <p className="text-lg font-bold">{pokemon.health}</p>
            <p className="text-lg font-bold">{pokemon.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adopted;
