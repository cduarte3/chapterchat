import React from "react";
import Footer from "./Footer";
import Rating from "@mui/material/Rating";
import { Link, useNavigate } from "react-router-dom";

export default function BookDetail({ bookData }) {
  const navigate = useNavigate();

  const deleteBook = () => {
    const currentPath = window.location.pathname;
    navigate(`${currentPath}/delete`);
  };

  const editBook = () => {
    const currentPath = window.location.pathname;
    navigate(`${currentPath}/edit`);
  };

  return (
    <div>
    <div className="h-[100vh] mb-[20%] xl:mb-[2%]">
      <div className=" mt-[2%] flex justify-between items-center px-6">
        <nav>
          <ul className="h-[15vh] flex justify-center items-center space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
            <li className="md:px-5">
              <img
                src="/delete.png"
                alt="Delete Review"
                className="w-[4rem] sm:w-[6rem] md:w-[7rem] lg:w-[8rem]"
                onClick={deleteBook}
              ></img>
            </li>
            <li className="md:px-5">
              <img
                src="/edit.png"
                alt="edit Review"
                className="w-[4rem] sm:w-[6rem] md:w-[7rem] lg:w-[8rem]"
                onClick={editBook}
              ></img>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="h-[15vh] flex justify-center items-center space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
            <li className="md:px-5">
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-[6rem] sm:w-[7rem] md:w-[9rem] lg:w-[11rem]"
                ></img>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <h1 className="font-bold mt-[2%] p-5 text-center flex flex-col md:text-8xl sm:text-6xl text-4xl mx-auto justify-center text-[rgb(64,63,68)]">
        {bookData.title}
      </h1>
      <hr className="xl:w-[75%] w-[90%] h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-[rgb(64,63,68)]" />
      <div className="justify-items-center flex-col grid w-[90%] xl:w-[80%] xl:grid-cols-2 grid-cols-1 mx-auto gap-5 sm:p-3">
        <div className="relative w-[50%]">
          <img
            src="/book.png"
            alt="User Avatar"
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
              value={bookData.rating}
              readOnly
              sx={{
                fontSize: {
                  xs: "4rem",
                  sm: "4rem",
                  md: "4.5rem",
                  lg: "5rem",
                  xl: "5.5rem",
                },
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <br />
      
    </div>
    <Footer/>
    </div>
  );
}
