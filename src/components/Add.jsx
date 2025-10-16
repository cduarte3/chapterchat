import Reacr, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BasicRating from "./Modify_rating";
import GradualBlur from "./GradualBlur";

export default function AddBook({ userId }) {
  useEffect(() => {
    window.scrollTo(0, 0);

    const textareaStyle = document.createElement("style");
    textareaStyle.textContent = `
    textarea {
      overflow: overlay; /* This helps with rounded corners */
    }
    
    textarea::-webkit-scrollbar {
      width: 8px;
    }
    
    textarea::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 4px;
      margin: 8px 0; /* Add margin to keep scrollbar away from corners */
    }
    
    textarea::-webkit-scrollbar-thumb {
      background: #ffffff;
      border-radius: 4px;
      margin: 8px 0; /* Add margin to keep scrollbar away from corners */
    }
    
    textarea::-webkit-scrollbar-thumb:hover {
      background: #e0e0e0;
    }
    
    textarea::-webkit-scrollbar-corner {
      background: transparent; /* Hide corner where scrollbars meet */
    }

        select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 1.5em 1.5em;
      padding-right: 3rem; /* Add space for the arrow */
    }

    select:hover {
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e0e0e0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
    }

    /* Style the dropdown options */
    select option {
      background-color: rgb(36,36,38);
      color: white;
      padding: 8px;
    }

    select option:hover {
      background-color: rgb(52,52,53);
    }
  `;
    document.head.appendChild(textareaStyle);

    return () => {
      document.head.removeChild(textareaStyle);
    };
  }, []);

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(3);
  const [cover, setCover] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [foundCover, setFoundCover] = useState(true);
  const [genre, setGenre] = useState("");

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const formatUrlParameter = (str) => {
    return str.trim().replace(/\s+/g, "+");
  };

  const goHome = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(-1);
      return;
    }
  };

  const removeCover = () => {
    setCover(null);
  };

  const fetchCover = async () => {
    if (!title || !author) {
      setShowModal(true);
      return;
    }

    try {
      const encodedTitle = formatUrlParameter(title);
      const encodedAuthor = formatUrlParameter(author);
      const response = await fetch(
        `https://bookcover.longitood.com/bookcover?book_title=${encodedTitle}&author_name=${encodedAuthor}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cover");
      }

      const data = await response.json();
      setFoundCover(true);
      setCover(data.url);
    } catch (error) {
      console.error("Error fetching cover:", error);
      setFoundCover(false);
      setShowModal(true);
    }
  };

  const formData = new FormData();
  formData.append("author", author);
  formData.append("title", title);
  formData.append("review", review);
  formData.append("rating", rating);
  if (cover) {
    formData.append("cover", cover);
  } else {
    formData.append(
      "cover",
      "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
    );
  }
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    const storedUserId = localStorage.getItem("userId");
    const activeUserId = userId || storedUserId;

    if (!activeUserId) {
      alert("No user ID found. Please log in again.");
      navigate("/login");
      return;
    }

    if (!title || !review || !author || !rating || !genre) {
      alert("All fields must be filled");
      return;
    }

    const submissionCover =
      cover ||
      "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png";
    const url = `${import.meta.env.VITE_API_URL}/users/${activeUserId}`;
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author,
        title,
        review,
        rating,
        cover: submissionCover,
        genre,
      }),
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(await response.text());
      }

      // const data = await response.json();
      navigate(`/user/${activeUserId}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding book. Please try again.");
    }
  }

  return (
    <>
      {" "}
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
      <img
        src="/chaptr-logo-sm.png"
        alt="Chaptr Logo"
        className="z-50 h-16 fixed mx-auto left-0 right-0 mt-6"
      />
      <div className="min-h-screen bg-[url('/background-shelf.png')] bg-cover bg-no-repeat bg-fixed">
        <div className="flex h-full flex-col">
          <h2 className="text-white mt-48 py-3 text-center text-6xl font-bold leading-9 tracking-tight font-['Radley']">
            Add Book Review
          </h2>

          <div className="mt-20">
            <div className="text-red-500 text-2xl cursor-pointer z-50 hover:underline items-start mb-5 w-[40%] flex mx-auto">
              <h1 onClick={goHome} className="font-['Radley']">
                Go Back
              </h1>
            </div>
            <form
              action="#"
              method="POST"
              className="lg:max-w-[40%] grid grid-cols-1 lg:grid-cols-2 mx-auto items-stretch"
            >
              <div className="space-y-6 flex flex-col">
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Title"
                  maxLength="50"
                  required
                  className="block w-full border-transparent border-2 border-white bg-[rgb(36,36,38)] text-white font-bold sm:py-4 md:px-6 py-3 px-5 rounded-3xl md:text-2xl text-2xl"
                />

                <input
                  type="text"
                  value={author}
                  onChange={handleAuthorChange}
                  placeholder="Author"
                  maxLength="25"
                  required
                  className="block w-full border-transparent border-2 border-white bg-[rgb(36,36,38)] text-white font-bold sm:py-4 md:px-6 py-3 px-5 rounded-3xl md:text-2xl text-2xl"
                />
                <select
                  name="genre"
                  id="genre"
                  value={genre}
                  onChange={handleGenreChange}
                  className={`block w-full border-transparent border-2 border-white bg-[rgb(36,36,38)] text-white font-bold sm:py-4 md:px-6 py-3 px-5 rounded-3xl md:text-2xl text-2xl ${
                    genre === "" ? "text-gray-400" : "text-white"
                  } `}
                >
                  <option value="" disabled>
                    Select a genre...
                  </option>
                  <option value="crime">Crime / Mystery</option>
                  <option value="romance">Romance</option>
                  <option value="fantasy">Fantasy / Sci Fi</option>
                  <option value="action">Action / Adventure</option>
                  <option value="horror">Horror / Thriller</option>
                  <option value="graphic">Graphic Novel</option>
                  <option value="comedy">Comedy</option>
                  <option value="poetry">Poetry</option>
                  <option value="drama">Drama</option>
                  <option value="historical">Historical</option>
                  <option value="children">Children's</option>
                  <option value="philo">Philosophical / Religious</option>
                  <option value="Biography">Biography / Autobiography</option>
                </select>

                <textarea
                  value={review}
                  onChange={handleReviewChange}
                  placeholder="Review"
                  maxLength="600"
                  required
                  className="resize-none block w-full border-transparent border-2 border-white bg-[rgb(36,36,38)] text-white font-bold sm:py-4 md:px-6 py-3 px-5 rounded-3xl md:text-2xl text-2xl"
                  style={{ maxHeight: "300px", minHeight: "300px" }}
                />

                <div className="mx-auto">
                  <BasicRating value={rating} setRating={setRating} />
                </div>

                <button
                  type="submit"
                  className="flex w-[70%] mx-auto justify-center rounded-full py-3 px-5 text-2xl font-semibold bg-white border-transparent border-2 hover:border-[#404040] hover:bg-[rgb(36,36,38)] hover:text-white text-[#404040]"
                  onClick={submit}
                >
                  Confirm
                </button>
                {/* This button will take the user back to the home page 
                  <button
                    type="submit"
                    className="flex w-[70%] mx-auto justify-center rounded-full py-3 px-5 text-2xl font-semibold bg-white border-transparent border-2 hover:border-[#404040] hover:bg-[rgb(36,36,38)] hover:text-white text-[#404040]"
                    onClick={goHome}
                  >
                    Cancel
                  </button>
                  */}
              </div>

              <div className="ml-10 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <label
                    htmlFor="cover"
                    className="block font-bold text-white text-4xl font-['Radley']"
                  >
                    Cover
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={fetchCover}
                      className="px-4 py-2 bg-[rgb(36,36,38)] border-2 border-white text-white rounded-full hover:bg-[rgb(52,52,53)] text-xl"
                    >
                      Search
                    </button>
                    {cover && (
                      <button
                        type="button"
                        onClick={removeCover}
                        className="px-4 py-2 bg-red-600 hover:bg-red-900 border-2 border-white text-white rounded-full text-xl"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  {!cover && (
                    <img
                      src="/no-book.png"
                      alt="Book Cover"
                      className="h-full w-auto border-2 rounded-3xl border-white object-cover"
                    />
                  )}
                  {cover && (
                    <img
                      src={cover}
                      alt="Book Cover"
                      className="h-full w-auto border-2 rounded-3xl border-white object-cover"
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setShowModal(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-[rgb(255,254,229)] rounded-xl overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full border-2">
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
                      Cannot Find Cover
                    </h3>
                    <div className="mt-2">
                      {!foundCover && (
                        <p className="text-sm text-gray-800">
                          Book cover cannot be found. You may need to change the
                          title and/or author. Please try again.
                        </p>
                      )}
                      {foundCover && (
                        <p className="text-sm text-gray-800">
                          Book cover cannot be found without a title and author.
                          Please enter, and try again.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[rgb(70,73,88)] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
