import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { TiThMenu } from "react-icons/ti";
import { HiMiniHome } from "react-icons/hi2";

export default function Feedback() {
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

  const goHome = () => {
    if (token) {
      navigate("/user/" + userId);
      return;
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className=" mt-[2%] flex justify-between items-center px-6">
        <nav>
          <ul className="h-[15vh] flex justify-center items-center space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
            <li className="md:px-5">
              <img
                src="/logo.png"
                alt="Delete Review"
                className="w-[6rem] sm:w-[7rem] md:w-[8rem] lg:w-[10rem]"
              ></img>
            </li>
          </ul>
        </nav>
        <nav className="hidden md:flex">
          <ul className="h-[15vh] flex justify-center items-center font-bold space-x-4 text-[rgb(64,63,68)] sm:text-3xl md:px-5 text-xl px-1">
            <li className="md:px-5">
              <HiMiniHome size={65} onClick={goHome} />
            </li>
            {token && (
              <li className="md:px-5">
                <FiLogOut size={65} onClick={logOut} />
              </li>
            )}
          </ul>
        </nav>
        <div onClick={handleNav} className="block md:hidden">
          {!nav ? (
            <FaWindowClose size={55} color="rgb(64,63,68)" />
          ) : (
            <TiThMenu size={55} color="rgb(64,63,68)" />
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
                alt="add book"
                className="w-[10rem] justify-center mx-auto py-5"
              ></img>
            </li>
            <li className="p-4 font-bold">
              <Link>HOME</Link>
            </li>
            <li className="p-4 font-bold">
              <Link>LOG OUT</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="lg:max-w-[80%] max-w-[80%] mx-auto items-center h-full min-h-screen">
        <h1 className="font-black mt-[2%] p-5 text-center flex flex-col xl:text-7xl md:text-6xl sm:text-6xl text-5xl mx-auto justify-center text-[rgb(64,63,68)]">
          Support Coming Soon...
        </h1>
      </div>
    </>
  );
}
