import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { TiThMenu } from "react-icons/ti";
import { HiMiniHome } from "react-icons/hi2";
import {
  FaUserCircle,
  FaWindowClose,
} from "react-icons/fa";
import { TbBooks } from "react-icons/tb";

export default function Questions() {
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
      <div className="fixed top-0 left-0 right-0 bg-[rgb(255,254,224)] z-50 px-4 flex justify-between items-center py-4 shadow-md">
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
                  <li className="p-4 font-bold" onClick={goHome}>
                    <Link>HOME</Link>
                  </li>
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
      <div className="lg:max-w-[80%] max-w-[80%] mx-auto items-center h-full pt-28">
        <h1 className="font-black mt-[2%] p-5 text-center flex flex-col xl:text-7xl md:text-6xl sm:text-6xl text-5xl mx-auto justify-center text-[rgb(64,63,68)]">
          Frequently Asked Questions
        </h1>
        <div className="pt-10 md:pt-20">
          <h2 className="font-bold text-center flex flex-col xl:text-5xl md:text-4xl sm:text-4xl text-3xl mx-auto justify-center text-[rgb(64,63,68)]">
            What is ChapterChat?
          </h2>
          <p className="pt-5 text-center flex flex-col  md:text-3xl sm:text-3xl text-xl mx-auto justify-center text-[rgb(64,63,68)]">
            ChapterChat is your digital collection for beloved reads. This
            creative platform empowers you to effortlessly curate a personalized
            virtual bookshelf, a testament to your literary journey. Simply
            record the details of each book you've read – Title, Author,
            Description, Rating (out of 5 stars), and a Cover Image. As your
            collection grows, ChapterChat becomes more than just a list; it
            transforms into a living archive of your literary passions, a space
            to revisit past favorites, or remember what you didn't enjoy about a
            certain title. Explore the magic of reading now with ChapterChat.
          </p>
        </div>
      </div>
      <div>
        <div className="pt-5 flex-col grid lg:grid-cols-2 grid-cols-1">
          <div className="lg:pt-28 pt-10 lg:w-[110%]">
            <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] 2xl:h-[391px] md:max-w-[512px] 2xl:max-w-[690px]">
              <div class="rounded-lg overflow-hidden h-[156px] md:h-[278px] 2xl:h-[372px] bg-white dark:bg-gray-800">
                <img
                  src="desk-dash.png"
                  class="h-[156px] md:h-[278px] 2xl:h-[372px] w-full rounded-lg"
                  alt=""
                />
              </div>
            </div>
            <div class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] 2xl:h-[31px] md:max-w-[597px] 2xl:max-w-[770px]">
              <div class="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
            </div>
          </div>

          <div className="py-10 lg:py-5">
            <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
              <div class="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
              <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
              <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
              <div class="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
              <div class="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
                <img src="dash.png" class="w-[272px] h-[572px]" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:max-w-[80%] max-w-[80%] mx-auto items-center h-full pb-20">
        <div className="pt-20">
          <h2 className="font-bold text-center flex flex-col xl:text-5xl md:text-4xl sm:text-4xl text-3xl mx-auto justify-center text-[rgb(64,63,68)]">
            How can I add a book to my shelf?
          </h2>
          <p className="pt-5 text-center flex flex-col xl:text-4xl md:text-3xl sm:text-3xl text-1xl mx-auto justify-center text-[rgb(64,63,68)]">
            Once you've signed up for an account or signed into your existing
            account, simply click on the '+' icon in the top left of your
            bookshelf to get started.
          </p>
        </div>
        <div className="pt-20">
          <h2 className="font-bold text-center flex flex-col xl:text-5xl md:text-4xl sm:text-4xl text-3xl mx-auto justify-center text-[rgb(64,63,68)]">
            What image formats can I use?
          </h2>
          <p className="pt-5 text-center flex flex-col xl:text-4xl md:text-3xl sm:text-3xl text-1xl mx-auto justify-center text-[rgb(64,63,68)]">
            ChapterChat will automatically convert images to the preferred image
            size and format on upload. Simply choose your desired cover art, and
            changes will be made automatically.
          </p>
          <img
            src="https://static1.squarespace.com/static/60f1a490a90ed8713c41c36c/6115a1d8295f857705d9e51d/6115a2048c97ac3ad5f0220a/1702413883836/36-design-powers-image-file-format.jpg?format=1500w"
            alt=""
            className="mx-auto rounded-2xl mt-10 max-h-[350px]"
          />
        </div>
        <div className="pt-20">
          <h2 className="font-bold text-center flex flex-col xl:text-5xl md:text-4xl sm:text-4xl text-3xl mx-auto justify-center text-[rgb(64,63,68)]">
            What information can I include about a book?
          </h2>
          <p className="pt-5 text-center flex flex-col xl:text-4xl md:text-3xl sm:text-3xl text-1xl mx-auto justify-center text-[rgb(64,63,68)]">
            Books you review can contain information fields such as Title,
            Author, Review Description, Star rating out of 5, and an uploaded
            cover. Cover images will be monitored to ensure content is fairly
            used and appropriate.
          </p>
        </div>
        <div className="pt-20">
          <h2 className="font-bold text-center flex flex-col xl:text-5xl md:text-4xl sm:text-4xl text-3xl mx-auto justify-center text-[rgb(64,63,68)]">
            What extra features will be added soon?
          </h2>
          <p className="pt-5 text-center flex flex-col xl:text-4xl md:text-3xl sm:text-3xl text-1xl mx-auto justify-center text-[rgb(64,63,68)]">
            To view upcoming additions to the site, click the 'Features' button
            below. To request new features, and/or report a bug or other issue
            with the site, please visit the 'Support' Button below. Any feedback
            is greatly appreciated and helps contribute to the growth,
            usability, and success of ChapterChat.
          </p>
          <div className="md:pt-20 pt-10 flex-col grid grid-cols-2">
            <div className="flex justify-center md:justify-end md:pr-10">
              <Link
                to="https://github.com/cduarte3/chapterchat?tab=readme-ov-file#what-extra-features-will-be-added-soon"
                target="_blank"
              >
                <button className="flex md:w-[250px] justify-center rounded-xl bg-[rgb(64,63,68)] px-3 py-5 md:text-2xl text-xl font-semibold leading-6 text-amber-50 shadow-sm hover:bg-[rgb(36,36,38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(36,36,38)]">
                  Features
                </button>
              </Link>
            </div>

            <div className="flex justify-center md:justify-start md:pl-10">
              <Link to="/support">
                <button className="flex md:w-[250px] justify-center rounded-xl bg-[rgb(64,63,68)] px-3 py-5 md:text-2xl text-xl font-semibold leading-6 text-amber-50 shadow-sm hover:bg-[rgb(36,36,38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(36,36,38)]">
                  Support
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
