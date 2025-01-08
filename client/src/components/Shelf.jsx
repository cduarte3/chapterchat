import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { TiThMenu } from "react-icons/ti";
import { FaWindowClose } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function Shelf({ userData }) {
  const navigate = useNavigate();
  const [nav, setNav] = useState(true);
  const navRef = useRef();

  const handleNav = () => {
    setNav(!nav);
  };

  const addBook = () => {
    navigate(`/user/${userData._id}/add`);
  };

  const visitBook = (bookId) => {
    navigate(`/user/${userData._id}/book/${bookId}`);
  };

  const goProfile = () => {
    navigate(`/user/${userData._id}/profile`);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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

  return (
    <div className="min-h-screen">
      <div className="min-h-screen mb-10 lg:mb-0 xl:mb-10">
        <div className=" mt-[2%] flex justify-between items-center px-6">
          <nav>
            <ul className="h-[15vh] flex justify-center items-center space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
              <li className="md:px-5">
                <img
                  src="/add.png"
                  alt="add book"
                  className="w-[5rem] sm:w-[6rem] md:w-[7rem] lg:w-[8rem]"
                  onClick={addBook}
                ></img>
              </li>
            </ul>
          </nav>
          <nav className="hidden md:flex">
            <ul className="h-[15vh] flex justify-center items-center font-bold space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
              <li className="md:px-5">
                <Link to="/faq">FAQ</Link>
              </li>
              <li className="md:px-5" onClick={goProfile}>
                <Link>PROFILE</Link>
              </li>
              <li className="md:px-5" onClick={logOut}>
              <FiLogOut size={65} />
              </li>
              <li className="md:px-5">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-[6rem] sm:w-[7rem] md:w-[9rem] lg:w-[11rem]"
                ></img>
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
                ? "fixed left-0 top-0 w-[50%] h-full border-r bg-[rgb(64,63,68)] opacity-95"
                : "fixed left-[-100%] top-0 w-[50%] h-full border-r"
            }
          >
            <ul className="pt-4 uppercase text-2xl text-[rgb(255,254,224)]">
              <li>
                <img
                  src="/logo_white.png"
                  alt="add book"
                  className="w-[10rem] justify-center mx-auto py-5"
                ></img>
              </li>
              <li className="p-4 font-bold" onClick={logOut}>
                <Link>SIGN OUT</Link>
              </li>
              <li className="p-4 font-bold">
                <Link to="/faq">FAQ</Link>
              </li>
              <li className="p-4 font-bold" onClick={goProfile}>
                <Link>PROFILE</Link>
              </li>
            </ul>
          </div>
        </div>
        <h1 className="font-bold mt-[2%] p-5 text-center flex flex-col md:text-8xl sm:text-6xl text-4xl mx-auto justify-center text-[rgb(64,63,68)]">
          <span style={{ wordBreak: "break-all" }}>{userData.username}'s</span>{" "}
          Shelf
        </h1>
        <hr className="xl:w-[75%] w-[90%] h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-[rgb(64,63,68)]" />
        <div className="text-center flex-col grid w-[90%] xl:w-[75%] lg:grid-cols-4 grid-cols-2 mx-auto justify-items-center gap-12 sm:p-3">
          {userData.books.map((book) => (
            <div key={book.id} className="relative w-full">
              <img
                src="/book.png"
                alt="User Avatar"
                className="w-full shadow-custom-dark"
              />
              <img
                src={book.cover ? `data:image/png;base64,${book.cover}` : ""}
                alt="Cover"
                className="absolute top-[1%] left-[7%] w-[92%] h-[98%] bottom-[-10%] object-cover shadow-custom-dark"
                onClick={() => visitBook(book.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
