import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicRating from "./Modify_rating";

export default function BookEdit({ bookData, userId, bookId }) {
  const [author, setAuthor] = useState(bookData.author);
  const [title, setTitle] = useState(bookData.title);
  const [review, setReview] = useState(bookData.review);
  const [rating, setRating] = useState(parseInt(bookData.rating, 10));
  const [cover, setCover] = useState(bookData.cover || null);
  const [showModal, setShowModal] = useState(false);
  const [foundCover, setFoundCover] = useState(true);
  const [genre, setGenre] = useState(bookData.genre || "");

  const navigate = useNavigate();

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

  function cancelForm(e) {
    // Add event parameter and prevent default
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      navigate(-1);
    } else {
      navigate("/login");
    }
  }

  async function submit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Create payload with only the changed values
    const updatedData = {
      author,
      title,
      review,
      rating: rating.toString(),
      genre,
      cover:
        cover ||
        "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(updatedData),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${userId}/book/${bookId}/edit`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      alert("Book updated successfully!");
      navigate(`/user/${userId}/book/${bookId}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating book. Please try again.");
    }
  }

  return (
    <>
      <div>
        <div className="flex h-full flex-col justify-center px-6 py-12 lg:px-8 my-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto w-[40%] lg:w-[60%]"
              src="/logo.png"
              alt="ChapterChat Logo"
              onClick={cancelForm}
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Edit Book
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="title"
                  className="block text-lg font-bold leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2 shadow">
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Title"
                    maxLength="30"
                    required
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgb(36,36,38)] text-lg sm:leading-6 pl-3"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="author"
                  className="block text-lg font-bold leading-6 text-gray-900"
                >
                  Author
                </label>
                <div className="mt-2 shadow">
                  <input
                    type="text"
                    value={author}
                    onChange={handleAuthorChange}
                    placeholder="Author"
                    maxLength="25"
                    required
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgb(36,36,38)] text-lg sm:leading-6 pl-3"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="cover"
                    className="block text-lg font-bold leading-6 text-gray-900"
                  >
                    Cover
                  </label>
                </div>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={fetchCover}
                    className="px-4 py-2 bg-[rgb(64,63,68)] text-amber-50 rounded-md hover:bg-[rgb(36,36,38)]"
                  >
                    Search
                  </button>
                  {cover && (
                    <button
                      type="button"
                      onClick={removeCover}
                      className="px-4 py-2 bg-red-600 text-amber-50 rounded-md hover:bg-[rgb(36,36,38)] ml-2"
                    >
                      Delete
                    </button>
                  )}
                </div>
                {!cover && (
                  <div>
                    <img
                      src="https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
                      alt="Book Cover"
                      className="mt-3 w-full border-2 rounded-lg border-gray-300"
                    />
                  </div>
                )}
                {cover && (
                  <div>
                    <img
                      src={cover}
                      alt="Book Cover"
                      className="mt-3 w-full border-2 rounded-lg border-[rgb(70,73,88)]"
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="genre"
                    className="block text-lg font-bold leading-6 text-gray-900"
                  >
                    Genre
                  </label>
                  <select
                    name="genre"
                    id="genre"
                    value={genre}
                    onChange={handleGenreChange}
                    className="rounded-lg border-2 border-gray-300 p-1"
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
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="review"
                    className="block text-lg font-bold leading-6 text-gray-900"
                  >
                    Review
                  </label>
                </div>
                <div className="mt-2 shadow">
                  <textarea
                    value={review}
                    onChange={handleReviewChange}
                    placeholder="Review"
                    maxLength="600"
                    required
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgb(36,36,38)] text-lg sm:leading-6 pl-3"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="rating"
                    className="block text-lg font-bold leading-6 text-gray-900"
                  >
                    Rating
                  </label>
                </div>
                <BasicRating value={rating} setRating={setRating} />
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[rgb(64,63,68)] px-3 py-2 text-2xl font-semibold leading-6 text-amber-50 shadow-sm hover:bg-[rgb(36,36,38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(36,36,38)]"
                  onClick={submit}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-[rgb(64,63,68)] px-3 mt-4 py-2 text-2xl font-semibold leading-6 text-amber-50 shadow-sm hover:bg-[rgb(36,36,38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(36,36,38)]"
                  onClick={cancelForm}
                >
                  Cancel
                </button>
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
