
import React from "react";
import { useState } from "react";

export default function UserProfile() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    function submitForm(event){
        event.preventDefault();
        
    }

    function formValidation(username, email, password){
        const regex_Username = /^[A-Za-z](?=.*\d)[A-Za-z\d]*$/;
        const regex_Email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regex_Password = / ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!regex_Username.test(username)){
            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium"></span> Enter Correct Username.
</div>
        }
        if (!regex_Email.test(email)){
            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium"></span>Enter Correct Email.
</div>
        }
        if (!regex_Password.test(password) || password.length < 8){
            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Error!!Password does not meet requirements</span> .
</div>
        }
    }

  return (
    <div>
      <div class="w-full max-w-lg justify-center items-center p-4 mx-auto my-20  border-gray-200 rounded-xl sm:p-6 md:p-8  dark:bg-gray-800 dark:border-gray-700">
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <img
            className="mx-auto w-[40%] lg:w-[60%]"
            src="/logo.png"
            alt="ChapterChat Logo"
          />

          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Profile
            </h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={formValidation}>
              <div>
                <label
                  for="title"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div class="mt-2 shadow">
                  <input
                    type="text"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                    placeholder="JDOE"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div class="flex items-center my-4 justify-between ">
                  <label
                    for="Email"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                </div>
                <div class="mt-2 shadow">
                  <input
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                    placeholder="myemail@gmail.com"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div class="flex items-center my-4 justify-between">
                  <label
                    for="Password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div class="mt-2 shadow">
                  <input
                       type="password"
                       value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    placeholder="Review"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full my-6 justify-center rounded-md bg-[rgb(64,63,68)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[rgb(36,36,38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={submitForm}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
