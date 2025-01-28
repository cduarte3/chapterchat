import { useState, React, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import { TiThMenu } from "react-icons/ti";
import { FaWindowClose } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [nav, setNav] = useState(true);
  const navRef = useRef();

  const handleNav = () => {
    setNav(!nav);
  };

  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNav(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function submit(e) {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/login`,
        requestOptions
      );

      if (!response.ok) {
        if (response.status === 401) {
          alert("Password is incorrect. Please try again.");
          return;
        }
        if (response.status === 404) {
          alert("Email not found. Please sign up.");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.id);
      navigate(`/user/${data.id}`, { state: { token: data.token } });
    } catch (error) {
      console.error("Error:", error);
      alert("Connection error. Please try again later.");
    }
  }

  return (
    <div>
      <div className="top-0 left-0 right-0 bg-[rgb(255,254,224)] z-50 px-4 flex justify-between items-center py-4 shadow-md">
        <nav>
          <ul className="flex justify-center items-center space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
            <li className="md:px-5">
              <img
                src="/logo.png"
                alt="ChapterChat Logo"
                className="w-20 md:w-28"
              ></img>
            </li>
          </ul>
        </nav>
        <nav className="hidden md:flex">
          <ul className="flex justify-center items-center font-bold space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
            <li className="md:px-3">
              <HiMiniHome size={60} onClick={goHome} />
            </li>
          </ul>
        </nav>
        <div onClick={handleNav} className="block md:hidden">
          {!nav ? (
            <FaWindowClose size={50} color="rgb(64,63,68)" />
          ) : (
            <TiThMenu size={50} color="rgb(64,63,68)" />
          )}
        </div>

        <div
          id="dark-grey-div"
          ref={navRef}
          className={
            !nav
              ? "fixed left-0 top-0 w-[50%] h-full border-r bg-[rgb(64,63,68)] opacity-95"
              : "fixed left-[-100%] top-0 w-[50%] h-full border-r"
          }
        >
          <ul className="pt-4 uppercase text-2xl text-[rgb(255,254,224)]">
            <li>
              <img
                src="/logo_white.png"
                alt="Logo in light beige"
                className="w-[10rem] justify-center mx-auto py-5"
              ></img>
            </li>
            <li className="p-4 font-bold">
              <Link to="/">HOME</Link>
            </li>
            <li className="p-4 font-bold">
              <Link to="/login">SIGN IN</Link>
            </li>
            <li className="p-4 font-bold">
              <Link to="/signup">SIGN UP</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto w-[40%] lg:w-[60%]"
            src="logo.png"
            alt="ChapterChat Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={submit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-bold leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2 shadow">
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgb(36,36,38)] text-lg sm:leading-6 pl-3"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-lg font-bold leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 shadow">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgb(36,36,38)] text-lg sm:leading-6 pl-3"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[rgb(64,63,68)] px-3 py-2 text-2xl font-semibold leading-6 text-amber-50 shadow-sm hover:bg-[rgb(36,36,38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(36,36,38)]"
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
