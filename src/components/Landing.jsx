import React from "react";
import pokemonGroup from "../assets/pokemonGroup.png";
import pikachu from "../assets/pikachu.png";
const Landing = () => {
  return (
    <div className="w-full col-span-6 relative text-gray-600 flex items-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-bold mb-10">Welcome, Trainer!</h1>
        <p className="text-lg ">
          {/* write some text for user when they log in to the pokemon adoption agency app  */}
          Welcome to the Pokemon Adoption Agency! Here you can adopt your very
          own Pokemon. You can also view all the Pokemon in the Pokedex.{" "}
          <img  className="inline" src={pikachu} alt="" />
        </p>
        <p>
          Click on the <span className="font-bold">Pokedex</span> link in the
          navigation bar to view all the Pokemon.
        </p>
        <p>
          Click on the <span className="font-bold">Adopted</span> link to view
          all the Pokemon you have adopted.
        </p>
      </div>
      <div>
        <img className="drop-shadow-xl" src={pokemonGroup} alt="" />
      </div>
    </div>
  );
};

export default Landing;
