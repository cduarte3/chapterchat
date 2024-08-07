import React, { useState } from "react";
import Footer from "./Footer";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

// All modal usage was implemented with the help of this template https://www.creative-tim.com/twcomponents/component/modal-confirmation-with-alpine-js-with-style-headless-ui

export default function BookDetail({ bookData, userId }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const deleteBook = () => {
    setShowModal(true);
  };

  const confirmDelete = async () => {
    const bookId = bookData.id;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/book/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        navigate(-1);
      } else {
        console.error("Failed to delete the book");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editBook = () => {
    const currentPath = window.location.pathname;
    navigate(`${currentPath}/edit`);
  };

  const goHome = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(-1);
      return;
    }
  };

  return (
    <div>
      <div className="min-h-screen">
        <div className=" mt-[2%] flex justify-between items-center px-6">
          <nav>
            <ul className="h-[15vh] flex justify-center items-center space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
              <li className="md:px-5">
                <img
                  src="/delete.png"
                  alt="Delete Review"
                  className="w-[4rem] sm:w-[5rem] md:w-[6rem] lg:w-[7rem]"
                  onClick={deleteBook}
                ></img>
              </li>
              <li className="md:px-5">
                <img
                  src="/edit.png"
                  alt="edit Review"
                  className="w-[4rem] sm:w-[5rem] md:w-[6rem] lg:w-[7rem]"
                  onClick={editBook}
                ></img>
              </li>
            </ul>
          </nav>
          <nav>
            <ul className="h-[15vh] flex justify-center items-center space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
              <li className="md:px-5">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-[6rem] sm:w-[7rem] md:w-[9rem] lg:w-[10rem]"
                  onClick={goHome}
                ></img>
              </li>
            </ul>
          </nav>
        </div>
        <h1 className="font-bold mt-[2%] p-5 text-center flex flex-col xl:text-7xl md:text-6xl sm:text-6xl text-4xl mx-auto justify-center text-[rgb(64,63,68)]">
          {bookData.title}
        </h1>
        <hr className="xl:w-[75%] w-[90%] h-1 mx-auto my-4 border-0 rounded md:my-10 bg-[rgb(64,63,68)]" />
        <div className="justify-items-center flex-col grid w-[90%] xl:w-[80%] 2xl:grid-cols-2 grid-cols-1 mx-auto gap-5 sm:p-3">
          <div className="relative xl:w-[50%] md:w-[30%] w-[50%]">
            <img
              src="/book.png"
              alt="blank book"
              className="w-full shadow-custom-dark"
            />
            <img
              src={
                bookData.cover ? `data:image/png;base64,${bookData.cover}` : ""
              }
              alt="Cover"
              className="absolute top-[1%] left-[7%] w-[92%] h-[98%] max-h-[99%] bottom-[-10%] object-cover shadow-custom-dark object-fit"
            />
          </div>
          <div className="mx-5 sm:mx-0">
            <p
              className="text-[rgb(64,63,68)] text-xl font-bold"
              style={{ textIndent: "2em" }}
            >
              {bookData.review}
            </p>
            <div className="mt-10 flex justify-center">
              <Rating
                value={Number(bookData.rating)}
                readOnly
                sx={{
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3rem",
                    md: "4rem",
                    lg: "4.5rem",
                    xl: "5rem",
                  },
                }}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
      <Footer />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center h-screen">
          <div className="fixed inset-0 transition-opacity" onClick={() => setShowModal(false)}>
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-[rgb(255,254,229)] rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
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
            <div className="bg-[rgb(74,73,77)] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
