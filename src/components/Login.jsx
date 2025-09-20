import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import { TiThMenu } from "react-icons/ti";
import { FaWindowClose } from "react-icons/fa";
import Silk from "./Silk";
import GradualBlur from "./GradualBlur";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Login() {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        `${import.meta.env.VITE_API_URL}/login`,
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
    <>
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
      <div className="fixed top-0 left-0 right-0 px-4 flex justify-between items-center py-4 z-[100]">
        <nav>
          <ul className="flex justify-center items-center space-x-4 md:px-5 text-xl px-1">
            <li>
              <img
                src="chaptr-logo-sm.png"
                className="w-[150px]"
                alt="Chaptr Logo"
              />
            </li>
          </ul>
        </nav>
        <nav className="hidden md:flex">
          <ul className="flex justify-center items-center font-bold space-x-4 text-white sm:text-3xl md:px-5 text-xl px-1">
            <li>
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

      <div className="relative w-full min-h-screen overflow-hidden z-0">
        <div className="absolute inset-0 w-full h-full min-h-screen">
          <Silk
            speed={6}
            scale={1}
            color="#565656"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>

        <div className="mt-[3rem]  relative flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 z-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto w-[40%] lg:w-[60%]"
              src="chaptr-logo-lg.png"
              alt="Chaptr Logo"
            />
            <h2 className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-white font-['Radley']">
              Sign in
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
                  className="font-['Radley'] block text-2xl text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="bg-[#242626] block w-full border-0 py-4 px-4 text-white shadow-sm ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgb(36,36,38)] text-lg sm:leading-6 rounded-[15px]"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="font-['Radley'] block text-2xl text-white"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="bg-[#242626] block w-full border-0 py-4 px-4 text-white shadow-sm ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgb(36,36,38)] text-lg sm:leading-6 rounded-[15px]"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center mx-auto rounded-[15px] py-3 px-5 text-xl font-semibold bg-white border-transparent border-2 hover:border-[#404040] hover:bg-[rgb(36,36,38)] hover:text-white text-[#404040]"
                >
                  Sign in
                </button>
                <h2 className="mt-4 text-center text-2xl leading-9 tracking-tight text-white">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="font-bold hover:underline text-blue-300"
                  >
                    Sign up
                  </a>
                </h2>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
