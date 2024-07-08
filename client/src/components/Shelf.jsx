import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Shelf({ userData }) {

  const navigate = useNavigate();

  const addBook = () => {
    navigate(`/user/${userData._id}/add`);
  };

  return (
    <div className="h-[100vh]">
      <div className=" mt-[2%] flex justify-between items-center px-6">
        <div className="font-bold md:w-[14%] w-[12%]">
          <Link to="/user/:userId/add">
            <img
              src="/add.png"
              alt="add book"
              className="mx-auto items-center lg:w-[60%]"
            ></img>
          </Link>
        </div>
        <nav>
          <ul className="h-[15vh] flex justify-center items-center space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
            <li className="md:px-5">
              <Link to="/faq">FAQ</Link>
            </li>
            <li className="md:px-5">
              <Link to="/user/:userId/profile">Profile</Link>
            </li>
            <li className="md:px-5">
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-[5rem] sm:w-[6rem] md:w-[7rem] lg:w-[8rem]"
                ></img>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <h1 className="font-bold mt-[2%] p-5 text-center flex flex-col md:text-8xl sm:text-6xl text-4xl mx-auto justify-center text-[rgb(64,63,68)]">
        <span style={{ wordBreak: "break-all" }}>{userData.username}'s</span>{" "}
        Shelf
      </h1>
      <hr className="xl:w-[75%] w-[90%] h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-[rgb(64,63,68)]" />
      <div className="text-center flex-col grid w-[90%] xl:w-[75%] md:grid-cols-4 grid-cols-2 mx-auto justify-items-center gap-12 sm:p-3">
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
