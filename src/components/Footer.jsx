import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="relative font-['Radley'] text-lg flex justify-center items-center h-24 mx-auto px-4 text-white mt-auto">
      <Link to="https://cduarte.ca" target="_blank">
        <h1 className="font-bold pr-4 hover:text-[#828383]">2024 - cduarte</h1>
      </Link>
      <h1 className="font-bold">|</h1>
      <Link to="/faq">
        <h1 className="font-bold px-4 hover:text-[#828383]">FAQ</h1>
      </Link>
      <h1 className="font-bold">|</h1>
      <Link to="/support">
        <h1 className="font-bold px-4 hover:text-[#828383]">Support</h1>
      </Link>
    </div>
  );
}
