import React from "react";

export default function Hero() {
  return (
    <div className="max-w-[800px] w-full h-screen  mx-auto text-center flex flex-col justify-center">
      <img
        src="logo.png"
        alt="Christian"
        className="mx-auto rounded-lg lg:w-[50%] animate-jump animate-duration-[1200ms] animate-normal"
        style={{ display: "block" }}
      ></img>
      <div class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto sm:p-8">
        <button className="bg-[rgb(64,63,68)] hover:bg-[rgb(36,36,38)] text-amber-50 font-bold py-4 px-12 rounded text-5xl">
          Log In
        </button>
        <button className="bg-[rgb(64,63,68)] hover:bg-[rgb(36,36,38)] text-amber-50 font-bold py-4 px-12 rounded text-5xl">
          Sign Up
        </button>
      </div>
    </div>
  );
}
