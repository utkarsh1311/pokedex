import Navbar from "./Navbar";
import bg from "../assets/2.svg";

import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="font-inter bg-gray-100 grid grid-cols-8 max-w-screen h-full p-6">
      <img className="absolute w-1/4 -left-20 -top-10 z-0" src={bg} alt="" />
      <div className="col-start-2 col-end-8 flex flex-col">
        <Navbar />
        <div className=" w-full grid grid-cols-6 mt-6 gap-6 flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
