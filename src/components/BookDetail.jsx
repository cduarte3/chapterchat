import React, { useState, useRef, useEffect } from "react";
import Footer from "./Footer";
import Rating from "@mui/material/Rating";
import { useNavigate, Link } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { TiThMenu } from "react-icons/ti";
import { TbBooks } from "react-icons/tb";
import { HiMiniHome } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";

// All modal usage was implemented with the help of this template https://www.creative-tim.com/twcomponents/component/modal-confirmation-with-alpine-js-with-style-headless-ui

export default function BookDetail({ bookData, userId }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [nav, setNav] = useState(true);
  const navRef = useRef();

  const getGenreDisplay = (genreValue) => {
    const genreMap = {
      crime: "Crime / Mystery",
      romance: "Romance",
      fantasy: "Fantasy / Sci Fi",
      action: "Action / Adventure",
      horror: "Horror / Thriller",
      graphic: "Graphic Novel",
      comedy: "Comedy",
      poetry: "Poetry",
      drama: "Drama",
      historical: "Historical",
      children: "Children's",
      philo: "Philosophical / Religious",
      Biography: "Biography / Autobiography",
    };
    return genreMap[genreValue] || genreValue;
  };

  const handleNav = () => {
    setNav(!nav);
  };

  const deleteBook = () => {
    setShowModal(true);
  };

  const confirmDelete = async () => {
    const bookId = bookData.id;
    const token = localStorage.getItem("token");

    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/book/${bookId}`,
        requestOptions
      );

      if (response.ok) {
        navigate("/user/" + userId);
      } else {
        console.error("Failed to delete the book");
        alert("Error deleting book. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Connection error. Please try again later.");
    }
  };

  const editBook = () => {
    const currentPath = window.location.pathname;
    navigate(`${currentPath}/edit`);
  };

  const goHome = () => {
    navigate("/");
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

  const goProfile = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user/" + userId + "/profile");
      return;
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
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
    <div>
      <div className="min-h-screen mb-10">
        <div className="fixed top-0 left-0 right-0 bg-[rgb(255,254,224)] py-4 flex justify-between items-center px-6 shadow-md z-50">
          <nav>
            <ul className="flex justify-center items-center space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
              <li>
                <img
                  src="/delete.png"
                  alt="Delete Review"
                  className="w-16 md:w-24"
                  onClick={deleteBook}
                ></img>
              </li>
              <li className="pl-2">
                <img
                  src="/edit.png"
                  alt="edit Review"
                  className="w-16 md:w-24"
                  onClick={editBook}
                ></img>
              </li>
            </ul>
          </nav>
          <nav className="hidden md:flex">
            <ul className="flex justify-center items-center font-bold space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
              <li className="md:px-3" onClick={goHome}>
                <HiMiniHome size={60} />
              </li>
              <li className="md:px-3" onClick={goShelf}>
                <TbBooks size={60} />
              </li>
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
              <li className="p-4 font-bold" onClick={goHome}>
                <Link>HOME</Link>
              </li>
              <li className="p-4 font-bold" onClick={goShelf}>
                <Link>BOOKSHELF</Link>
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
        <div className="pt-28">
          <h1 className="font-['Radley'] font-bold mt-[2%] p-5 text-center flex flex-col xl:text-8xl sm:text-7xl text-5xl mx-auto justify-center text-[rgb(64,63,68)]">
            {bookData.title}
          </h1>
          <h2 className="font-bold text-center flex flex-col xl:text-5xl md:text-4xl sm:text-4xl text-2xl mx-auto justify-center text-[rgb(64,63,68)]">
            {bookData.author}
          </h2>
          <hr className="xl:w-[75%] w-[90%] h-1 mx-auto my-4 border-0 rounded md:my-10 bg-[rgb(64,63,68)]" />
          <div className="justify-items-center flex-col grid w-[90%] xl:w-[80%] lg:grid-cols-2 grid-cols-1 mx-auto gap-5 sm:p-3">
            <div className="relative w-[60%] sm:w-[55%] md:w-[50%] lg:w-[70%] 2xl:w-[60%] aspect-[3/4]">
              <img
                src="/book.png"
                alt="blank book"
                className="w-full shadow-custom-dark"
              />
              <img
                src={bookData.cover}
                alt="Cover"
                className="absolute top-[1%] left-[7%] w-[92%] h-[98%] max-h-[99%] bottom-[-10%] object-cover shadow-custom-dark object-fit"
              />
            </div>
            <div className="mx-5 sm:mx-0 flex flex-col justify-center h-full mt-3 lg:mt-0">
              <p className="text-[rgb(64,63,68)] text-2xl xl:text-3xl 2xl:text-4xl text-center">
                {bookData.review}
              </p>
              <div className="mt-6 flex justify-center">
                <Rating
                  value={Number(bookData.rating)}
                  readOnly
                  sx={{
                    fontSize: {
                      xs: "4rem",
                      sm: "4rem",
                      md: "4rem",
                      lg: "4.5rem",
                      xl: "5rem",
                    },
                  }}
                />
              </div>
              <div>
                <h2 className="text-center flex flex-col xl:text-4xl text-3xl mx-auto justify-center text-[rgb(64,63,68)] mt-6">
                  <b className="mb-2">Genre:</b>{" "}
                  {getGenreDisplay(bookData.genre)}
                </h2>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>

      <Footer />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center h-screen">
          <div
            className="fixed inset-0 transition-opacity"
            onClick={() => setShowModal(false)}
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-[rgb(255,254,229)] rounded-xl overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full border-2 border-red-600">
            <div className="bg-[rgb(255,254,229)] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 border-2 border-red-600 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    width="64px"
                    height="64px"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ef4444"
                    strokeWidth="0.456"
                  >
                    <path
                      d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
                      fill="#ef4444"
                    ></path>
                    <path
                      d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                      fill="#ef4444"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.2944 4.47643C9.36631 3.11493 10.5018 2.25 12 2.25C13.4981 2.25 14.6336 3.11493 15.7056 4.47643C16.7598 5.81544 17.8769 7.79622 19.3063 10.3305L19.7418 11.1027C20.9234 13.1976 21.8566 14.8523 22.3468 16.1804C22.8478 17.5376 22.9668 18.7699 22.209 19.8569C21.4736 20.9118 20.2466 21.3434 18.6991 21.5471C17.1576 21.75 15.0845 21.75 12.4248 21.75H11.5752C8.91552 21.75 6.84239 21.75 5.30082 21.5471C3.75331 21.3434 2.52637 20.9118 1.79099 19.8569C1.03318 18.7699 1.15218 17.5376 1.65314 16.1804C2.14334 14.8523 3.07658 13.1977 4.25818 11.1027L4.69361 10.3307C6.123 7.79629 7.24019 5.81547 8.2944 4.47643ZM9.47297 5.40432C8.49896 6.64148 7.43704 8.51988 5.96495 11.1299L5.60129 11.7747C4.37507 13.9488 3.50368 15.4986 3.06034 16.6998C2.6227 17.8855 2.68338 18.5141 3.02148 18.9991C3.38202 19.5163 4.05873 19.8706 5.49659 20.0599C6.92858 20.2484 8.9026 20.25 11.6363 20.25H12.3636C15.0974 20.25 17.0714 20.2484 18.5034 20.0599C19.9412 19.8706 20.6179 19.5163 20.9785 18.9991C21.3166 18.5141 21.3773 17.8855 20.9396 16.6998C20.4963 15.4986 19.6249 13.9488 18.3987 11.7747L18.035 11.1299C16.5629 8.51987 15.501 6.64148 14.527 5.40431C13.562 4.17865 12.8126 3.75 12 3.75C11.1874 3.75 10.4379 4.17865 9.47297 5.40432Z"
                      fill="#ef4444"
                    ></path>
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Delete Item
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-800">
                      Are you sure you want to delete{" "}
                      <span className="font-bold">{bookData.title}</span>? This
                      action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[rgb(70,73,88)] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={confirmDelete}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
