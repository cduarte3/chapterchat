import React from "react";
import {Link} from "react-router-dom";

export default function Hero() {

  return (
    <div className="max-w-[800px] w-full h-screen  mx-auto text-center flex flex-col justify-center">
      <img
        src="logo.png"
        alt="Christian"
        className="mx-auto rounded-lg md:w-[50%] w-[70%]"
        style={{ display: "block" }}
      ></img>
      <div class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto sm:p-8">
        <Link to="/login">
          <button className="bg-[rgb(64,63,68)] hover:bg-[rgb(36,36,38)] text-amber-50 font-bold md:py-4 md:px-12 py-2 px-3 rounded md:text-5xl text-2xl">
          Log In
        </button>
        </Link>
        
        <button className="bg-[rgb(64,63,68)] hover:bg-[rgb(36,36,38)] text-amber-50 font-bold md:py-4 md:px-9 py-2 px-3 rounded md:text-5xl text-2xl">
          Sign Up
        </button>
      </div>
    </div>
  );
}
