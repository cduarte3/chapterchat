import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { TiThMenu } from "react-icons/ti";
import { FaWindowClose, FaSort } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiMiniHome } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GradualBlur from "./GradualBlur";

export default function Shelf({ userData }) {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [nav, setNav] = useState(true);
  const navRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("titleAsc");

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const getLastName = (authorName) => {
    const names = authorName.split(" ");
    return names.length > 1 ? names[names.length - 1] : names[0];
  };

  const sortBooks = (books) => {
    return [...books].sort((a, b) => {
      switch (sortCriteria) {
        case "titleAsc":
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        case "titleDesc":
          return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
        case "authorAsc":
          return getLastName(a.author)
            .toLowerCase()
            .localeCompare(getLastName(b.author).toLowerCase());
        case "authorDesc":
          return getLastName(b.author)
            .toLowerCase()
            .localeCompare(getLastName(a.author).toLowerCase());
        case "genre":
          return a.genre.toLowerCase().localeCompare(b.genre.toLowerCase());
        default:
          return 0;
      }
    });
  };

  const addBook = () => {
    navigate(`/user/${userData.id}/add`);
  };

  const visitBook = (bookId) => {
    if (!bookId) {
      console.error("No bookId provided");
      return;
    }
    try {
      navigate(`/user/${userData.id}/book/${bookId}`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const goProfile = () => {
    navigate(`/user/${userData.id}/profile`);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  // goHome if needed will navigate to / route

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNav(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getPosessiveName = (name) => {
    return name.endsWith("s") ? `${name}'` : `${name}'s`;
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40">
        <GradualBlur
          target="parent"
          position="top"
          height="6rem"
          strength={1}
          divCount={10}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
      </div>
      <div className="min-h-screen bg-[url('/background-shelf.png')] bg-cover bg-no-repeat bg-fixed">
        <div className="min-h-screen mb-10">
          <div className="fixed top-0 left-0 right-0 px-4 flex justify-between items-center py-4 z-[100]">
            <nav>
              <ul className="flex justify-center items-center space-x-4 md:px-3 text-xl">
                <li>
                  <img
                    src="/add.png"
                    alt="add book"
                    className="w-[60px]"
                    onClick={addBook}
                  ></img>
                </li>
              </ul>
            </nav>
            <nav className="hidden md:flex">
              <ul className="flex justify-center items-center font-bold space-x-4 text-white text-2xl font-['Radley']">
                <li className="md:px-3" onClick={goProfile}>
                  <FaUserCircle size={60} />
                </li>
                <li className="md:px-3" onClick={logOut}>
                  <FiLogOut size={60} />
                </li>
              </ul>
            </nav>
            <div onClick={handleNav} className="block md:hidden">
              {!nav ? (
                <FaWindowClose size={55} color="rgb(64,63,68)" />
              ) : (
                <TiThMenu size={55} color="rgb(64,63,68)" />
              )}
            </div>

            <div
              id="dark-grey-div"
              ref={navRef}
              className={
                !nav
                  ? "fixed left-0 top-0 w-[50%] h-full border-r bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-70 border-gray-100"
                  : "fixed left-[-100%] top-0 w-[50%] h-full border-r"
              }
            >
              <ul className="pt-4 uppercase text-2xl text-white font-['Radley']">
                <li>
                  <img
                    src="/chaptr-logo-lg.png"
                    alt="Logo in light beige"
                    className="w-[10rem] justify-center mx-auto py-5"
                  ></img>
                </li>
                <li className="p-4 font-bold" onClick={goProfile}>
                  <Link>PROFILE</Link>
                </li>
                <li className="p-4 font-bold" onClick={logOut}>
                  <Link>LOG OUT</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-40 hidden landscape:max-lg:hidden landscape:block">
            <GradualBlur
              target="parent"
              position="bottom"
              height="6rem"
              strength={1}
              divCount={10}
              curve="bezier"
              exponential={true}
              opacity={1}
            />
          </div>

          <div className="pt-28">
            <h1 className="font-bold mt-[2%] p-5 text-center flex flex-col lg:text-8xl md:text-7xl sm:text-6xl text-5xl mx-auto justify-center text-white font-['Radley']">
              <span style={{ wordBreak: "break-all" }}>
                {getPosessiveName(userData.username)}
              </span>{" "}
              Shelf
            </h1>
            <hr className="xl:w-[75%] w-[90%] h-1 mx-auto my-4 border-0 rounded md:my-10 bg-white" />
            <div className="mt-4 md:mt-10 mb-10 mx-auto w-[75%] xl:max-w-[55%]">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search Author or Title"
                  className="border-4 border-white bg-[#242626] rounded-full pl-5 pr-16 h-16 md:pr-20 md:h-20 w-full text-xl md:text-2xl"
                ></input>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-white rounded-full h-16 w-16 md:h-20 md:w-20 absolute right-0 top-0 items-center justify-center mx-auto flex"
                >
                  <FaSort size={35} color="rgb(36,38,38)" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#242626] border-4 border-[rgb(64,63,68)] z-40">
                    <div className="py-1 font-bold">
                      {[
                        "titleAsc",
                        "titleDesc",
                        "authorAsc",
                        "authorDesc",
                        "genre",
                      ].map((criteria) => (
                        <button
                          key={criteria}
                          onClick={() => {
                            setSortCriteria(criteria);
                            setIsDropdownOpen(false);
                          }}
                          className={`
            block px-4 py-2 text-lg md:text-xl w-full text-left
            ${
              sortCriteria === criteria
                ? "bg-[rgb(64,63,68)] text-[rgb(255,254,224)]"
                : "text-[rgb(64,63,68)] hover:bg-gray-300"
            }
          `}
                        >
                          {criteria === "titleAsc" && "Title (A-Z)"}
                          {criteria === "titleDesc" && "Title (Z-A)"}
                          {criteria === "authorAsc" && "Author (A-Z)"}
                          {criteria === "authorDesc" && "Author (Z-A)"}
                          {criteria === "genre" && "Genre"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center flex-col grid w-[90%] xl:w-[75%] lg:grid-cols-4 grid-cols-2 mx-auto justify-items-center gap-12 sm:p-3">
              {userData.books &&
                sortBooks(userData.books)
                  .filter(
                    (book) =>
                      book.title.toLowerCase().includes(searchTerm) ||
                      book.author.toLowerCase().includes(searchTerm)
                  )
                  .map((book) => (
                    <div
                      key={book.id}
                      className="relative w-full cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        visitBook(book.id);
                      }}
                    >
                      <img
                        src="/book.png"
                        alt="User Avatar"
                        className="w-full shadow-custom-dark"
                      />
                      <img
                        src={book.cover}
                        alt="Cover"
                        className="absolute top-[1%] left-[7%] w-[92%] h-[98%] bottom-[-10%] object-cover shadow-custom-dark"
                      />
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
