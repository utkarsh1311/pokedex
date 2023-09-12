import Navbar from "./Navbar";
import Search from "./Search";
import bg from "../assets/2.svg";
import { useState, useEffect } from "react";
import PokemonGrid from "./PokemonGrid";
import PokemonDetail from "./PokemonDetail";
import { defPokemon } from "../constants";

const Home = () => {
  //

  const [pokemons, setPokemons] = useState([]);
  const [selected, setSelected] = useState(defPokemon);

  useEffect(() => {
    const fetchPokemon = async () => {
      const localPokemons = JSON.parse(localStorage.getItem("pokemons"));
      if (localPokemons) {
        setPokemons(localPokemons);
        return;
      }
      console.log("fetching")
      const list = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
      let data = await list.json();
      const pArr = data.results.map(async (res) => {
        const a = await fetch(res.url);
        return a.json();
      });

      const pokeList = await Promise.all(pArr);
      localStorage.setItem("pokemons", JSON.stringify(pokeList));
      setPokemons(pokeList);
    };

    fetchPokemon();
  }, []);

  const handleClick = (e) => {
    let pokemonId = e.target.id;
    let pokemon = pokemons.find((p) => p.id === parseInt(pokemonId));
    setSelected(pokemon);
  };

  return (
    <div className="font-inter bg-gray-100 grid grid-cols-8 max-w-screen h-full p-6">
      <img className="absolute w-1/4 -left-20 -top-10" src={bg} alt="" />
      <div className="col-start-2 col-end-8">
        <Navbar />
        <div className="w-full grid grid-cols-6 mt-6 gap-6">
          <Search />
          <PokemonGrid handleClick={handleClick} pokemons={pokemons} />
          {pokemons && <PokemonDetail pokemon={selected} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
