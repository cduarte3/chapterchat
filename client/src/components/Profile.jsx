import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile({ userData }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate();

  function cancelForm() {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/user/${userData._id}`);
      return;
    }
  }

  async function formValidation(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
      try {
        // if the token is undefined, send the user to the login page
        if (!token) {
          console.error("Token is not available");
          navigate("/login");
          return;
        }
        const response = await fetch(`http://localhost:5000/users/${email}/${username}`, {
          method: "GET",
          credentials: "include",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          alert("Account profile updated");
          navigate(`/user/${userData._id}`);
        }
        if (response.status === 409) {
          const message = await response.json();
          setValidationMessage(message.message);
          return;
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
  }
    /*
    The following was used to validate the username and password fields.

    It has been changed for functionality purposes.

      const regex_Username = /^[A-Za-z](?=.*\d)[A-Za-z\d]*$/;
          const regex_Password =
            / ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

          if (!regex_Username.test(username)) {
            alert("Error!! Enter a valid username");
          }

          if (!regex_Password.test(password) || password.length < 8) {
              alert("Error!! Password does not meet requirements");
          }
    */ 

  return (
    <div>
      <div className="flex h-full flex-col justify-center px-6 py-12 lg:px-8 my-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto w-[40%] lg:w-[60%]"
            src="/logo.png"
            alt="ChapterChat Logo"
          />

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {userData.username}'s Profile
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={formValidation}>
              <div className="mb-8">
                <label
                  htmlFor="title"
                  className="block text-lg font-bold leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2 shadow">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={userData.username}
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgb(36,36,38)] text-lg sm:leading-6 pl-3"
                  />
                </div>
              </div>
              <div className="mb-8">
                <div className="flex items-center my-4 justify-between ">
                  <label
                    htmlFor="Email"
                    className="block text-lg font-bold leading-6 text-gray-900"
                  >
                    Email
                  </label>
                </div>
                <div className="mt-2 shadow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={userData.email}
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgb(36,36,38)] text-lg sm:leading-6 pl-3"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center my-4 justify-between">
                  <label
                    htmlFor="Password"
                    className="block text-lg font-bold leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 shadow">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgb(36,36,38)] text-lg sm:leading-6 pl-3"
                  />
                </div>
              </div>
              <div className="justify-center text-center my-5">
              <h1>{validationMessage}</h1>
            </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[rgb(64,63,68)] px-3 py-2 text-2xl font-semibold leading-6 text-amber-50 shadow-sm hover:bg-[rgb(36,36,38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(36,36,38)]"
                >
                  Update
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
      </div>
    </div>
  );
}
