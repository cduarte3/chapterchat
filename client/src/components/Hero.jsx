import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="max-w-[800px] w-full h-screen  mx-auto text-center flex flex-col justify-center">
      <img
        src="logo.png"
        alt="ChapterChat Logo"
        className="mx-auto rounded-lg md:w-[50%] w-[70%]"
        style={{ display: "block" }}
      ></img>
      <div className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto sm:p-8">
        <Link to="/login">
          <button className="bg-[rgb(64,63,68)] hover:bg-[rgb(36,36,38)] text-amber-50 font-bold sm:py-4 md:px-9 py-3 px-5 rounded md:text-5xl text-3xl">
            Sign In
          </button>
        </Link>

        <Link to="/signup">
          <button className="bg-[rgb(64,63,68)] hover:bg-[rgb(36,36,38)] text-amber-50 font-bold sm:py-4 md:px-9 py-3 px-5 rounded md:text-5xl text-3xl">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
