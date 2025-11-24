import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { TiThMenu } from "react-icons/ti";
import { HiMiniHome } from "react-icons/hi2";
import { FaWindowClose } from "react-icons/fa";
import GradualBlur from "./GradualBlur";
const Silk = lazy(() => import("./Silk"));

export default function Questions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
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

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 hidden landscape:max-lg:hidden landscape:block">
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
      <div className="fixed bottom-0 left-0 right-0 z-40 hidden landscape:max-lg:hidden landscape:block">
        <GradualBlur
          target="parent"
          position="bottom"
          height="2rem"
          strength={1}
          divCount={10}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
      </div>

      <div className="fixed inset-0 w-full h-full min-h-screen z-0">
        <Suspense
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800" />
          }
        >
          <Silk
            speed={6}
            scale={1}
            color="#565656"
            noiseIntensity={1.5}
            rotation={0}
          />
        </Suspense>
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
            <li className="md:px-3">
              <HiMiniHome size={60} onClick={goHome} />
            </li>
            {token && (
              <>
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
                <li className="p-4 font-bold" onClick={logOut}>
                  <Link>LOG OUT</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="relative lg:max-w-[80%] max-w-[80%] mx-auto items-center h-full pt-28 z-20 text-white">
        <h1 className="font-bold font-['Radley'] mt-[2%] p-5 text-center flex flex-col xl:text-7xl md:text-6xl sm:text-6xl text-5xl mx-auto justify-center">
          Frequently Asked Questions
        </h1>
        <div className="pt-10 md:pt-20">
          <h2 className="font-['Radley'] text-center flex flex-col xl:text-5xl md:text-4xl sm:text-4xl text-3xl mx-auto justify-center">
            What is Chaptr?
          </h2>
          <p className="pt-5 text-center flex flex-col  md:text-3xl sm:text-3xl text-xl mx-auto justify-center">
            Chaptr is your digital collection for beloved reads. This creative
            platform empowers you to effortlessly curate a personalized virtual
            bookshelf. Simply record the details of each book you've read –
            Title, Author, Description, Rating (out of 5 stars), and a Cover
            Image. As your collection grows, Chaptr becomes more than just a
            list; it transforms into a living archive of your literary passions,
            a space to revisit past favorites, or remember what you didn't enjoy
            about a certain title.
          </p>
        </div>
      </div>
      <div className="relative z-20">
        <div className="pt-5 flex-col grid lg:grid-cols-2 grid-cols-1">
          <div className="lg:pt-28 pt-10 lg:w-[110%]">
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] 2xl:h-[391px] md:max-w-[512px] 2xl:max-w-[690px]">
              <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] 2xl:h-[372px] bg-white dark:bg-gray-800">
                <img
                  src="desk-dash.png"
                  className="h-[156px] md:h-[278px] 2xl:h-[372px] w-full rounded-lg"
                  alt=""
                />
              </div>
            </div>
            <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] 2xl:h-[31px] md:max-w-[597px] 2xl:max-w-[770px]">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
            </div>
          </div>

          <div className="py-10 lg:py-5">
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
              <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
                <img src="dash.png" className="w-[272px] h-[572px]" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-20 lg:max-w-[80%] max-w-[80%] mx-auto items-center h-full pb-20 text-white">
        <div className="pt-20">
          <h2 className="font-['Radley'] text-center flex flex-col xl:text-5xl md:text-4xl sm:text-4xl text-3xl mx-auto justify-center">
            What information can I include about a book?
          </h2>
          <p className="pt-5 text-center flex flex-col xl:text-4xl md:text-3xl sm:text-3xl text-1xl mx-auto justify-center">
            Books you review can contain information fields such as Title,
            Author, Review Description, Genre, Star rating out of 5, and a cover
            that is applied for you automatically once inputting a title and
            author.
          </p>
        </div>
        <div className="pt-20">
          <h2 className="font-['Radley'] text-center flex flex-col xl:text-5xl md:text-4xl sm:text-4xl text-3xl mx-auto justify-center">
            How can I add a book to my shelf?
          </h2>
          <p className="pt-5 text-center flex flex-col xl:text-4xl md:text-3xl sm:text-3xl text-1xl mx-auto justify-center">
            Once you've signed up for an account or signed into your existing
            account, simply click on the '+' icon in the top left of your
            bookshelf to get started.
          </p>
        </div>
        <div className="pt-20">
          <h2 className="font-['Radley'] text-center flex flex-col xl:text-5xl md:text-4xl sm:text-4xl text-3xl mx-auto justify-center">
            What extra features will be added soon?
          </h2>
          <p className="pt-5 text-center flex flex-col xl:text-4xl md:text-3xl sm:text-3xl text-1xl mx-auto justify-center">
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
