import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Pokedex from "./components/Pokedex";
import Landing from "./components/Landing";
import Adopted from "./components/Adopted";

const App = () => {
  return (
    <div className="h-full">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Landing />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/adopted" element={<Adopted />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
