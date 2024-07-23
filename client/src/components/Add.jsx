import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ userId }) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [cover, setCover] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCoverChange = (event) => {
    setCover(event.target.files[0]);
  };

  const formData = new FormData();
  formData.append("title", title);
  formData.append("review", review);
  formData.append("rating", rating);
  if (cover) {
    formData.append("cover", cover, cover.name);
  }
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    const url = `http://localhost:5000/users/${userId}`;

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(url, requestOptions);
      if (response.status === 404) {
        alert("User not found. Please sign up.");
      } else {
        const data = await response.json();
        console.log(data);
        navigate(`/user/${userId}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Book
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label
                for="title"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Title"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="review"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Review
                </label>
              </div>
              <div class="mt-2">
                <textarea
                  value={review}
                  onChange={handleReviewChange}
                  placeholder="Review"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="rating"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Rating
                </label>
              </div>
              <div class="mt-2">
                <input
                  type="number"
                  value={rating}
                  onChange={handleRatingChange}
                  placeholder="Rating"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="cover"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover
                </label>
              </div>
              <div class="mt-2">
                <input type="file" onChange={handleCoverChange} />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={submit}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
