import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { TiThMenu } from "react-icons/ti";
import { FaUserCircle, FaWindowClose } from "react-icons/fa";
import { TbBooks } from "react-icons/tb";
import Silk from "./Silk";
import GradualBlur from "./GradualBlur";
import SpotlightCard from "./SpotlightCard";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
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

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [nav, setNav] = useState(true);
  const navRef = useRef();

  const handleNav = () => {
    setNav(!nav);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const goProfile = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user/" + userId + "/profile");
      return;
    }
  };

  const goShelf = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user/" + userId);
      return;
    } else {
      navigate("/");
    }
  };

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
          <ul className="flex justify-center items-center font-bold space-x-4 text-white text-2xl font-['Radley']">
            {!token && (
              <>
                <li className="md:px-3 py-3">
                  <Link to="/login" className="px-5 hover:text-[rgb(82,82,82)]">
                    SIGN IN
                  </Link>
                </li>
                <li className="md:px-3 py-3">
                  <Link
                    to="/signup"
                    className="px-5 hover:text-[rgb(82,82,82)]"
                  >
                    SIGN UP
                  </Link>
                </li>
              </>
            )}
            {token && (
              <>
                <li className="md:px-3" onClick={goShelf}>
                  <TbBooks size={60} />
                </li>
                <li className="md:px-3" onClick={goProfile}>
                  <FaUserCircle size={60} />
                </li>
                <li className="md:px-5">
                  <FiLogOut size={60} onClick={logOut} />
                </li>
              </>
            )}
          </ul>
        </nav>
        <div onClick={handleNav} className="block md:hidden">
          {!nav ? (
            <FaWindowClose size={50} color="white" />
          ) : (
            <TiThMenu size={50} color="white" />
          )}
        </div>

        <div
          id="dark-grey-div"
          ref={navRef}
          className={
            !nav
              ? "fixed left-0 top-0 w-[50%] h-full border-r bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-70 border-gray-100"
              : "fixed left-[-100%] top-0 w-[50%] h-full border-r"
          }
        >
          <ul className="pt-4 uppercase text-2xl text-white">
            <li>
              <img
                src="/chaptr-logo-lg.png"
                alt="Logo in light beige"
                className="w-[10rem] justify-center mx-auto py-5"
              ></img>
            </li>
            {!token && (
              <>
                <li className="p-4 font-bold">
                  <Link to="login">SIGN IN</Link>
                </li>
                <li className="p-4 font-bold">
                  <Link to="/signup">SIGN UP</Link>
                </li>
              </>
            )}
            {token && (
              <>
                <li className="p-4 font-bold" onClick={goShelf}>
                  <Link>BOOKSHELF</Link>
                </li>
                <li className="p-4 font-bold" onClick={goProfile}>
                  <Link>PROFILE</Link>
                </li>
                <li className="p-4 font-bold" onClick={logOut}>
                  <Link>LOG OUT</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-40 hidden landscape:max-lg:hidden landscape:block">
        <GradualBlur
          target="parent"
          position="bottom"
          height="6rem"
          strength={1}
          divCount={10}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
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

        <div className="relative z-10 min-h-screen">
          <div className="min-h-screen w-full mx-auto justify-center items-center flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-2 pt-20 mx-auto justify-center items-center content-center pb-20 lg:pb-0">
              <img
                src="chaptr-logo-lg.png"
                alt="Chaptr logo"
                className="w-auto h-[55%] mx-auto"
              />
              <div className="md:block hidden">
                <img
                  src="macbook.png"
                  className="w-auto mx-auto px-10 lg:pr-10"
                  alt="laptop with app screenshot"
                />
              </div>
              <div className="pt-20 md:hidden">
                <div className="relative mx-auto border-[rgb(24,24,24)] bg-[rgb(24,24,24)] border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
                  <div className="h-[32px] w-[3px] bg-[rgb(24,24,24)] absolute -start-[17px] top-[72px] rounded-s-lg"></div>
                  <div className="h-[46px] w-[3px] bg-[rgb(24,24,24)] absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                  <div className="h-[46px] w-[3px] bg-[rgb(24,24,24)] absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                  <div className="h-[64px] w-[3px] bg-[rgb(24,24,24)] absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                  <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-[rgb(24,24,24)]">
                    <img
                      src="dash.png"
                      className="w-[272px] h-[572px]"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="waves.svg"
          alt="Waves"
          className="w-full rotate-180 relative z-20"
        />
      </div>

      <div className="-mt-[1px] relative w-full min-h-screen flex flex-col bg-[#242626]">
        <h1 className="text-white text-6xl sm:text-7xl lg:text-8xl drop-shadow-lg text-center font-['Radley'] mt-20">
          <span className="lg:hidden">
            Welcome to
            <br />
            Chaptr
          </span>
          <span className="hidden lg:block">Welcome to Chaptr</span>
        </h1>

        <SpotlightCard
          className="custom-spotlight-card w-[80%] sm:w-[70%] lg:w-[50%] xl:max-w-[40%] mx-auto mt-44 mb-10 border border-gray-100 flex flex-col items-center text-center justify-center"
          spotlightColor="rgba(255, 255, 255, 0.2)"
        >
          <img
            src="/shelf.svg"
            alt="Bookshelf"
            className="w-28 h-28 md:w-52 md:h-52 lg:w-72 lg:h-72"
          />
          <h1 className="py-10 text-center text-2xl md:text-3xl 2xl:text-4xl max-w-[90%] sm:max-w-[80%] text-white font-bold">
            Chaptr is your digital collection for beloved reads using a
            personalized virtual bookshelf.
          </h1>
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card w-[80%] sm:w-[70%] lg:w-[50%] xl:max-w-[40%] mx-auto my-10 border border-gray-100 flex flex-col items-center text-center justify-center"
          spotlightColor="rgba(255, 255, 255, 0.2)"
        >
          <img
            src="/chat.svg"
            alt="Text bubble"
            className="w-28 h-28 md:w-52 md:h-52 lg:w-72 lg:h-72"
          />
          <h1 className="py-10 text-center text-2xl md:text-3xl 2xl:text-4xl max-w-[90%] sm:max-w-[80%] text-white font-bold">
            Simply record the Title, Author, Description, Genre, Rating, and
            select a Cover Image.
          </h1>
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card w-[80%] sm:w-[70%] lg:w-[50%] xl:max-w-[40%] mx-auto my-10 border border-gray-100 flex flex-col items-center text-center justify-center"
          spotlightColor="rgba(255, 255, 255, 0.2)"
        >
          <img
            src="/book-icon.png"
            alt="Open book"
            className="w-28 h-28 md:w-52 md:h-52 lg:w-72 lg:h-72"
          />
          <h1 className="py-10 text-center text-2xl md:text-3xl 2xl:text-4xl max-w-[90%] sm:max-w-[80%] text-white font-bold">
            As your collection grows, Chaptr becomes a living archive of your
            thoughts and past favourites.
          </h1>
        </SpotlightCard>

        <div className="flex flex-col mx-auto pt-10 mb-[8rem] font-['Radley'] items-center">
          <h1 className="text-white text-6xl sm:text-7xl lg:text-8xl drop-shadow-lg text-center mt-20">
            <span className="lg:hidden">
              Get Started
              <br />
              Now
            </span>
            <span className="hidden lg:block">Get Started Now</span>
          </h1>
          <Link to="/login" className="mt-10 mb-1">
            <button className="w-[300px] md:w-[400px] lg:w-[500px] bg-white border-transparent border-2 hover:border-[#404040] hover:bg-[rgb(36,36,38)] hover:text-white text-[#404040] font-bold sm:py-4 md:px-9 py-3 px-5 rounded-full md:text-3xl text-2xl">
              Sign In
            </button>
          </Link>

          <Link to="/signup" className="mt-10">
            <button className="w-[300px] md:w-[400px] lg:w-[500px] bg-[#404040] border-transparent border-2 hover:border-[#404040] hover:bg-[rgb(36,36,38)] text-white font-bold sm:py-4 md:px-9 py-3 px-5 rounded-full md:text-3xl text-2xl">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
