import { colors, statColor } from "../constants";

const PokemonDetail = ({ pokemon }) => {
  return (
    <div className="col-start-5 col-end-7 bg-white relative drop-shadow-xl rounded-xl flex flex-col gap-4 h-fit pb-8">
      <img
        style={{ filter: `drop-shadow(0px 8px 6px rgb(152,152,152))` }}
        className="w-3/4 absolute -top-24 left-1/2 transform -translate-x-1/2 "
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt=""
      />
      <div className="mt-40 text-center">
        <p className="text-xs text-gray-600">
          #{`${pokemon.id}`.padStart(3, "0")}
        </p>
        <p className="text-xl font-bold text-gray-800">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </p>
        <div className="flex gap-1 justify-center mt-2">
          {pokemon.types.map((t, i) => (
            <p
              key={i}
              className="px-2 py-1 text-xs font-bold rounded-md"
              style={{ backgroundColor: `${colors[t.type.name]} ` }}>
              {t.type.name}
            </p>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-4 ">
          <div>
            <p className="text-sm font-bold text-gray-700">ABILITIES</p>
            <div className="flex gap-4 justify-center mt-2">
              {pokemon.abilities.map((a) => {
                return (
                  <p className="text-xs text-gray-600 border border-black px-2 py-1 rounded-full">
                    {a.ability.name}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col text-sm font-semibold text-gray-700">
              <p className="text-sm">HEIGHT</p>
              <p className="bg-gray-200 px-4 py-1 rounded-full mx-auto">
                {pokemon.height / 10}m
              </p>
            </div>
            <div className="flex flex-col text-sm font-semibold text-gray-700">
              <p className="">WEIGHT</p>
              <p className="bg-gray-200 px-4 py-1 rounded-full mx-auto">
                {pokemon.weight/10}kg
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">STATS</p>
            <div className="flex justify-around mt-2 px-4 flex-wrap">
              {pokemon.stats.map((s) => {
                return (
                  <div className="flex gap-2 justify-center flex-col bg-gray-100 rounded-xl">
                    <p
                      className="text-white rounded-full p-2 text-xs font-bold"
                      style={{
                        backgroundColor: `${statColor[s.stat.name].color}`,
                      }}>
                      {statColor[s.stat.name].name}
                    </p>
                    <p className="text-xs font-semibold text-gray-600">
                      {s.base_stat}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-2">
            <button className="bg-blue-700 px-6 py-2 text-white rounded-lg">Adopt Me</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
