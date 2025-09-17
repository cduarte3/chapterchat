import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { TiThMenu } from "react-icons/ti";
import {
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
  FaWindowClose,
} from "react-icons/fa";
import { TbBooks } from "react-icons/tb";
import Silk from "./Silk";
import GradualBlur from "./GradualBlur";
import SpotlightCard from "./SpotlightCard";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [cimg, setCimg] = useState("0");
  const nextCimg = () => {
    if (cimg === "0") {
      setCimg("1");
    } else if (cimg === "1") {
      setCimg("2");
    } else if (cimg === "2") {
      setCimg("0");
    }
  };

  const prevCimg = () => {
    setCimg(cimg === "0" ? "2" : cimg === "1" ? "0" : "1");
  };

  const images = [
    {
      url: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Person Reading",
    },
    {
      url: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Person Writing",
    },
    {
      url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "People talking over coffee",
    },
  ];

  const headings = ["READ", "REVIEW", "CHAT"];

  useEffect(() => {
    const timer = setInterval(() => {
      if (cimg === "0") {
        setCimg("1");
      } else if (cimg === "1") {
        setCimg("2");
      } else if (cimg === "2") {
        setCimg("0");
      }
    }, 7000);

    return () => clearInterval(timer);
  }, [cimg]);

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
      <div className="relative w-full h-[120vh] overflow-hidden z-0">
        <div className="absolute inset-0 w-full h-full">
          <Silk
            speed={6}
            scale={1}
            color="#565656"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>

        <div className="relative z-10">
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
              <ul className="flex justify-center items-center space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
                <li className="md:px-5"></li>
              </ul>
            </nav>
            <nav className="hidden md:flex">
              <ul className="flex justify-center items-center font-bold space-x-4 text-white text-2xl font-['Inter']">
                {!token && (
                  <>
                    <li className="md:px-3 mt-3">
                      <Link to="/login" className="py-3 px-5">
                        Sign In
                      </Link>
                    </li>
                    <li className="md:px-3 mt-3">
                      <Link to="/signup" className="py-3 px-5">
                        Sign Up
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

          <div className="mt-3 w-full h-[75vh] md:h-screen object-cover mx-auto flex flex-col justify-center items-center">
            <img
              src="chapter-logo-lg.png"
              alt="Person Reading"
              className="w-[60%] h-auto"
            />
            <div className="pt-20">
              <div className="flex justify-center items-center gap-8 md:gap-16 lg:gap-56">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[7vw] font-['Radley'] italic select-none">
                  READ
                </h1>
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[7vw] font-['Radley'] italic select-none">
                  REVIEW
                </h1>
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[7vw] font-['Radley'] italic select-none">
                  CHAT
                </h1>
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

      <div className="-mt-8 relative w-full min-h-screen flex flex-col bg-[#242626]">
        <h1 className="text-white text-6xl sm:text-7xl lg:text-8xl drop-shadow-lg text-center font-['Radley'] mt-20">
          <span className="lg:hidden">
            Welcome to
            <br />
            ChapterChat
          </span>
          <span className="hidden lg:block">Welcome to ChapterChat</span>
        </h1>

        <div className="pt-20 hidden md:block">
          <div className="relative mx-auto border-[rgb(24,24,24)] bg-[rgb(24,24,24)] border-[8px] rounded-t-xl  h-[294px] max-w-[512px]">
            <div className="rounded-lg overflow-hidden h-[278px] bg-[rgb(24,24,24)]">
              <img
                src="desk-dash.png"
                className="h-[278px] w-full rounded-lg"
                alt=""
              />
            </div>
          </div>
          <div className="relative mx-auto bg-[rgb(150,150,150)] rounded-b-xl rounded-t-sm h-[21px] max-w-[597px] shadow-md">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[96px] h-[8px] bg-[rgb(80,80,80)]"></div>
          </div>
        </div>
      </div>

      <div className="mt-3 relative w-full h-[75vh] md:h-screen object-cover">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prevCimg}
            className="pl-2 pt-4 hover:text-[rgb(64,63,68)] text-[rgb(255,254,224)] transition"
          >
            <FaChevronLeft size={24} />
          </button>
          <div className="absolute bottom-0 left-0 p-8 z-10">
            <h1 className="text-[rgb(255,254,224)] text-7xl sm:text-8xl md:text-9xl lg:text-[20vh] xl:text-[30vh] drop-shadow-lg font-['Radley']">
              {headings[parseInt(cimg)]}
            </h1>
          </div>

          <button
            onClick={nextCimg}
            className="pr-2 pt-4 hover:text-[rgb(64,63,68)] text-[rgb(255,254,224)] transition"
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        <div className="h-full w-full overflow-hidden">
          <img
            src={images[parseInt(cimg)].url}
            alt={images[parseInt(cimg)].alt}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCimg(index.toString())}
              className={`h-1 rounded-full ${
                cimg === index.toString()
                  ? "bg-[rgb(255,254,224)] w-10"
                  : "bg-[rgb(64,63,68)] w-6"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="w-full min-h-screen flex flex-col bg-[rgb(64,63,68)] py-32">
        <div className="pt-20 md:hidden">
          <div className="relative mx-auto border-[rgb(24,24,24)] bg-[rgb(24,24,24)] border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
            <div className="h-[32px] w-[3px] bg-[rgb(24,24,24)] absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-[rgb(24,24,24)] absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-[rgb(24,24,24)] absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-[rgb(24,24,24)] absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-[rgb(24,24,24)]">
              <img src="dash.png" className="w-[272px] h-[572px]" alt="" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 pt-32">
          <div className="flex justify-center order-2 sm:order-1">
            <img
              src="/shelf.svg"
              alt="Bookshelf"
              className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80"
            />
          </div>
          <div className="flex items-center justify-center order-1 sm:order-2">
            <h1 className="text-center sm:text-right text-lg md:text-xl lg:text-3xl 2xl:text-4xl max-w-[90%] sm:pr-20 text-[rgb(255,254,224)] font-bold pb-10 sm:pb-0">
              ChapterChat is your digital collection for beloved reads. This
              creative platform empowers you to effortlessly curate a
              personalized virtual bookshelf, a testament to your literary
              journey.
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 pt-20">
          <div className="flex items-center justify-center">
            <h1 className="text-center sm:text-left text-lg md:text-xl lg:text-3xl 2xl:text-4xl max-w-[90%] sm:pl-20 text-[rgb(255,254,224)] font-bold pb-10 sm:pb-0">
              Simply record the details of each book you've read – Title,
              Author, Description, Genre, Rating (out of 5 stars), and a Cover
              Image.
            </h1>
          </div>
          <div className="flex justify-center">
            <img
              src="/chat.svg"
              alt="Bookshelf"
              className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 pt-20">
          <div className="flex justify-center order-2 sm:order-1">
            <img
              src="/book.svg"
              alt="Bookshelf"
              className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80"
            />
          </div>
          <div className="flex items-center justify-center order-1 sm:order-2">
            <h1 className="text-center sm:text-right text-lg md:text-xl lg:text-3xl 2xl:text-4xl max-w-[90%] sm:pr-20 text-[rgb(255,254,224)] font-bold pb-10 sm:pb-0">
              As your collection grows, ChapterChat becomes more than just a
              list of reviews; it transforms into a living archive of your
              literary history, allowing for a space to revisit past favorites,
              or share any critiques about a certain title.
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-[800px] w-full h-full  mx-auto text-center flex flex-col justify-center py-24 ">
        <h1 className="text-[rgb(64,63,68)] text-6xl sm:text-7xl lg:text-8xl drop-shadow-lg text-center font-['Radley'] pb-10">
          Get Started Now
        </h1>
        <img
          src="logo.png"
          alt="ChapterChat Logo"
          className="mx-auto w-[40%]"
          style={{ display: "block" }}
        ></img>
        <div className="grid max-w-screen-xl grid-cols-2 gap-8  mx-auto pt-10">
          <Link to="/login">
            <button className="bg-[rgb(64,63,68)] hover:bg-[rgb(36,36,38)] text-[rgb(255,254,224)] font-bold sm:py-4 md:px-9 py-3 px-5 rounded-full md:text-3xl text-2xl">
              Sign In
            </button>
          </Link>

          <Link to="/signup">
            <button className="bg-[rgb(64,63,68)] hover:bg-[rgb(36,36,38)] text-[rgb(255,254,224)] font-bold sm:py-4 md:px-9 py-3 px-5 rounded-full md:text-3xl text-2xl">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50">
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
    </>
  );
}
