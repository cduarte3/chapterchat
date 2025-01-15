import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {

  return (
    <div className="flex justify-center items-center h-24 mx-auto px-4 bg-[rgb(64,63,68)] text-[rgb(255,254,224)] mt-auto">
      <Link to="https://portv2-three.vercel.app" target="_blank">
      <h1 className="font-bold pr-4">2024 - Christian Duarte</h1>
      </Link>
      <h1 className="font-bold">|</h1>
      <Link to="/faq">
        <h1 className="font-bold px-4">FAQ</h1>
      </Link>
      <h1 className="font-bold">|</h1>
      <Link to="/support">
        <h1 className="font-bold px-4">Support</h1>
      </Link>
    </div>
  );
}
