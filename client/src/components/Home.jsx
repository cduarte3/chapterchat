import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { TiThMenu } from "react-icons/ti";
import { HiMiniHome } from "react-icons/hi2";
import {
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
  FaWindowClose,
} from "react-icons/fa";
import { TbBooks } from "react-icons/tb";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [cimg, setCimg] = useState("0");
  const nextCimg = () => {
    if (cimg === "0") {
      setCimg("1");
    } else if (cimg === "1") {
      setCimg("2");
    } else if (cimg === "2") {
      setCimg("0");
    }
  };

  const prevCimg = () => {
    setCimg(cimg === "0" ? "2" : cimg === "1" ? "0" : "1");
  };

  const images = [
    {
      url: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Person Reading",
    },
    {
      url: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Person Writing",
    },
    {
      url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "People talking over coffee",
    },
  ];

  const headings = ["READ", "REVIEW", "DISCUSS"];

  useEffect(() => {
    const timer = setInterval(() => {
      if (cimg === "0") {
        setCimg("1");
      } else if (cimg === "1") {
        setCimg("2");
      } else if (cimg === "2") {
        setCimg("0");
      }
    }, 7000);

    return () => clearInterval(timer);
  }, [cimg]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [nav, setNav] = useState(true);
  const navRef = useRef();

  const handleNav = () => {
    setNav(!nav);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const goHome = () => {
    if (token) {
      navigate("/user/" + userId);
      return;
    } else {
      navigate("/");
    }
  };

  const goProfile = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user/" + userId + "/profile");
      return;
    }
  };

  const goShelf = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user/" + userId);
      return;
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-[rgb(255,254,224)] z-50 px-4 flex justify-between items-center py-4 shadow-md">
        <nav>
          <ul className="flex justify-center items-center space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
            <li className="md:px-5">
              <img
                src="/logo.png"
                alt="ChapterChat Logo"
                className="w-20 md:w-28"
              ></img>
            </li>
          </ul>
        </nav>
        <nav className="hidden md:flex">
          <ul className="flex justify-center items-center font-bold space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
            <li className="md:px-3">
              <HiMiniHome size={60} onClick={goHome} />
            </li>
            {token && (
              <>
                <li className="md:px-3" onClick={goShelf}>
                  <TbBooks size={60} />
                </li>
                <li className="md:px-3" onClick={goProfile}>
                  <FaUserCircle size={60} />
                </li>
                <li className="md:px-5">
                  <FiLogOut size={60} onClick={logOut} />
                </li>
              </>
            )}
          </ul>
        </nav>
        <div onClick={handleNav} className="block md:hidden">
          {!nav ? (
            <FaWindowClose size={50} color="rgb(64,63,68)" />
          ) : (
            <TiThMenu size={50} color="rgb(64,63,68)" />
          )}
        </div>

        <div
          id="dark-grey-div"
          ref={navRef}
          className={
            !nav
              ? "fixed left-0 top-0 w-[50%] h-full border-r bg-[rgb(64,63,68)] opacity-95"
              : "fixed left-[-100%] top-0 w-[50%] h-full border-r"
          }
        >
          <ul className="pt-4 uppercase text-2xl text-[rgb(255,254,224)]">
            <li>
              <img
                src="/logo_white.png"
                alt="Logo in light beige"
                className="w-[10rem] justify-center mx-auto py-5"
              ></img>
            </li>
            <li className="p-4 font-bold">
              <Link>HOME</Link>
            </li>
            {token && (
              <>
                <li className="p-4 font-bold" onClick={goShelf}>
                  <Link>BOOKSHELF</Link>
                </li>
                <li className="p-4 font-bold" onClick={goProfile}>
                  <Link>PROFILE</Link>
                </li>
                <li className="p-4 font-bold" onClick={logOut}>
                  <Link>LOG OUT</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-3 relative w-full h-[500px] md:h-screen object-cover mb-8">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prevCimg}
            className="pl-2 pt-4 hover:text-[rgb(64,63,68)] text-[rgb(255,254,224)] transition"
          >
            <FaChevronLeft size={24} />
          </button>
          <div className="absolute bottom-0 left-0 p-8 z-10">
            <h1 className="text-[rgb(255,254,224)] text-7xl sm:text-8xl md:text-9xl lg:text-[200px] font-bold drop-shadow-lg">
              {headings[parseInt(cimg)]}
            </h1>
          </div>

          <button
            onClick={nextCimg}
            className="pr-2 pt-4 hover:text-[rgb(64,63,68)] text-[rgb(255,254,224)] transition"
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        <div className="h-full w-full overflow-hidden">
          <img
            src={images[parseInt(cimg)].url}
            alt={images[parseInt(cimg)].alt}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCimg(index.toString())}
              className={`h-1 rounded-full ${
                cimg === index.toString()
                  ? "bg-[rgb(255,254,224)] w-10"
                  : "bg-[rgb(64,63,68)] w-6"
              }`}
            />
          ))}
        </div>
      </div>

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
    </>
  );
}
