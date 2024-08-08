import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function Shelf({ userData }) {
  const navigate = useNavigate();

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
                className="w-[4rem] sm:w-[6rem] md:w-[7rem] lg:w-[8rem]"
                onClick={addBook}
              ></img>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="h-[15vh] flex justify-center items-center space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
            <li className="md:px-5">
              <Link to="/faq">FAQ</Link>
            </li>
            <li className="md:px-5"
            onClick={goProfile}>
              Profile
            </li>
            <li className="md:px-5">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-[6rem] sm:w-[7rem] md:w-[9rem] lg:w-[11rem]"
                  onClick={logOut}
                ></img>
            </li>
          </ul>
        </nav>
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
