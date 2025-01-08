import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicRating from "./Modify_rating";

export default function BookEdit({ bookData, userId, bookId }) {
  const [author, setAuthor] = useState(bookData.author);
  const [title, setTitle] = useState(bookData.title);
  const [review, setReview] = useState(bookData.review);
  const [rating, setRating] = useState(parseInt(bookData.rating, 10));
  const [cover, setCover] = useState(bookData.cover);

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

  const handleCoverChange = (event) => {
    setCover(event.target.files[0]);
  };

  const formData = new FormData();
  formData.append("author", author);
  formData.append("title", title);
  formData.append("review", review);
  formData.append("rating", rating);
  if (cover) {
    formData.append("cover", cover);
  }

  function cancelForm() {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/user/${userId}`);
      return;
    }
    else {
      navigate("/login");
    }
  }

  async function submit(e) {
    e.preventDefault();

    const url = `${process.env.REACT_APP_API_URL}/users/${userId}/book/${bookId}/edit`;
    const token = localStorage.getItem('token');

    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, requestOptions);
      if (response.status === 404 || token === null) {
        alert("Unauthorized access");
      } else {
        navigate(`/user/${userId}/book/${bookId}`);
      }
    } catch (error) {
      console.error("Error:", error);
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
                  style={{ maxHeight: '400px' }}
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="cover"
                  className="block text-lg font-bold leading-6 text-gray-900"
                >
                  Cover
                </label>
              </div>
              <div className="mt-2">
                <input type="file" onChange={handleCoverChange} required />
              </div>
            </div>
            <br />
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[rgb(64,63,68)] px-3 py-2 text-2xl font-semibold leading-6 text-amber-50 shadow-sm hover:bg-[rgb(36,36,38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(36,36,38)]"
                onClick={submit}
              >
                 Confirm
              </button>
              <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[rgb(64,63,68)] px-3 mt-4 py-2 text-2xl font-semibold leading-6 text-amber-50 shadow-sm hover:bg-[rgb(36,36,38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(36,36,38)]"
                  onClick={cancelForm}
                >
                  Cancel
                </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </>
  );
}