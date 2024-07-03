import React from "react";
import { Link } from "react-router-dom";

export default function Navbar () {

    <div className="bg-[rgb(64,63,68)] h-16 flex justify-between items-center px-4">
        <div className="text-white font-bold">My Shelf</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                Books
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
}