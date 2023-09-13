import Navbar from "./Navbar";
import Search from "./Search";
import bg from "../assets/2.svg";
import { useState, useEffect } from "react";
import PokemonGrid from "./PokemonGrid";
import PokemonDetail from "./PokemonDetail";
import { defPokemon } from "../constants";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selected, setSelected] = useState(defPokemon);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      const localPokemons = JSON.parse(localStorage.getItem("pokemons"));
      if (localPokemons) {
        setPokemons(localPokemons);
        return;
      }
      const list = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"
      );
      let data = await list.json();
      const pArr = data.results.map(async (res) => {
        const a = await fetch(res.url);
        return a.json();
      });

      const pokeList = await Promise.all(pArr);
      const finalList = pokeList.map((p) => {
        return {
          id: p.id,
          name: p.name,
          sprites: {
            other: {
              "official-artwork": {
                front_default:
                  p.sprites.other["official-artwork"].front_default,
              },
            },
            versions: {
              "generation-v": {
                "black-white": {
                  animated: {
                    front_default:
                      p.sprites.versions["generation-v"]["black-white"].animated
                        .front_default,
                  },
                },
              },
            },
          },
          types: p.types,
          abilities: p.abilities,
          height: p.height,
          weight: p.weight,
          stats: p.stats,
        };
      });
      localStorage.setItem("pokemons", JSON.stringify(finalList));
      setPokemons(finalList);
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    const searchPokemon = setTimeout(async () => {
      if (query.trim().length > 0) {
        const searchedPokemon = pokemons.filter((p) =>
          p.name.startsWith(query.toLowerCase())
        );
        if (searchedPokemon.length > 0) {
          setSelected(searchedPokemon[0]);
        } else {
          const newPokemon = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
          );
          if (newPokemon.status === 404) {
            setSelected(defPokemon);
            return;
          }

          const data = await newPokemon.json();

          const newPoke = {
            id: data.id,
            name: data.name,
            sprites: {
              other: {
                "official-artwork": {
                  front_default:
                    data.sprites.other["official-artwork"].front_default,
                },
              },
              versions: {
                "generation-v": {
                  "black-white": {
                    animated: {
                      front_default:
                        data.sprites.versions["generation-v"]["black-white"]
                          .animated.front_default,
                    },
                  },
                },
              },
            },
            types: data.types,
            abilities: data.abilities,
            height: data.height,
            weight: data.weight,
            stats: data.stats,
          };
          setSelected(newPoke);
        }
      }
    }, 1000);
    return () => clearTimeout(searchPokemon);
  }, [query]);

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
          <Search handleSearch={(e) => setQuery((prev) => e.target.value)} />
          <PokemonGrid handleClick={handleClick} pokemons={pokemons} />
          {pokemons && <PokemonDetail pokemon={selected} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
