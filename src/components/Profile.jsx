import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GradualBlur from "./GradualBlur";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function UserProfile({ userData }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [modalIcon, setModalIcon] = useState("/alert.png");
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("Error");
  const [open, setOpen] = React.useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isModalLocked, setIsModalLocked] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (!isModalLocked) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  function cancelForm() {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(-1);
      return;
    } else {
      navigate("/login");
    }
  }

  const getPosessiveName = (name) => {
    return name.endsWith("s") ? `${name}'` : `${name}'s`;
  };

  async function formValidation(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        console.error("Token is not available");
        navigate("/login");
        return;
      } else if (
        username === userData.username ||
        email === userData.email ||
        (username === "" && email === "" && password === "")
      ) {
        setModalIcon("/alert.png");
        setModalHeader("No Changes");
        setModalMessage("All empty or non-changed fields.");
        setIsModalLocked(false);
        handleOpen();
        return;
      } else if (password && password !== confirmPassword) {
        setModalIcon("/alert.png");
        setModalHeader("Password Mismatch");
        setModalMessage("Passwords do not match.");
        setIsModalLocked(false);
        handleOpen();
        return;
      } else if (password && password.length < 6) {
        setModalIcon("/lock.png");
        setModalHeader("Weak Password");
        setModalMessage("Password must be at least 6 characters.");
        setIsModalLocked(false);
        handleOpen();
        return;
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({ username, email, password }),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userData.id}/update`,
        requestOptions
      );
      if (response.status === 200) {
        setModalIcon("/success.png");
        setModalHeader("Success!");
        setModalMessage("Profile updated successfully.");
        setIsModalLocked(true);
        setCountdown(5);
        handleOpen();

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate(`/user/${userData.id}`);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
      if (response.status === 409) {
        setModalIcon("/alert.png");
        setModalHeader("Conflict!");
        setModalMessage("Username OR Email already exists.");
        setIsModalLocked(false);
        handleOpen();
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
      <div>
        <IoMdArrowRoundBack
          size={60}
          color="white"
          onClick={cancelForm}
          className="z-50 h-12 md:h-16 fixed mx-auto left-2 md:left-10 mt-6 cursor-pointer"
        />
        <img
          src="/chaptr-logo-sm.png"
          alt="Chaptr Logo"
          className="z-50 h-12 md:h-16 fixed mx-auto left-0 right-0 mt-6"
        />
      </div>
      <div className="min-h-screen bg-[url('/background-shelf.png')] bg-cover bg-no-repeat bg-fixed">
        <div className="flex h-full flex-col">
          <h2 className="flex flex-wrap justify-center items-center gap-4 text-white mt-40 md:mt-48 py-0 md:py-3 text-center mx-auto text-6xl font-bold tracking-tight font-['Radley'] max-w-[85%]">
            <span>{getPosessiveName(userData.username)}</span>
            <span>Profile</span>
          </h2>

          <div className="mt-10 mx-auto">
            <form onSubmit={formValidation} className="mb-10 lg:mb-15">
              <div className="space-y-6">
                <label
                  htmlFor="title"
                  className="block text-4xl font-bold text-white font-['Radley']"
                >
                  Username
                </label>
                <div className="mt-2 shadow">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={userData.username}
                    className="block w-full border-transparent border-2 border-white bg-[rgb(36,36,38)] text-white font-bold sm:py-4 md:px-6 py-3 px-5 rounded-3xl md:text-2xl text-2xl"
                  />
                </div>
              </div>
              <div className="mb-8">
                <div className="flex items-center my-4 justify-between ">
                  <label
                    htmlFor="Email"
                    className="block text-4xl font-bold text-white font-['Radley']"
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
                    className="block w-full border-transparent border-2 border-white bg-[rgb(36,36,38)] text-white font-bold sm:py-4 md:px-6 py-3 px-5 rounded-3xl md:text-2xl text-2xl"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center my-4 justify-between">
                  <label
                    htmlFor="Password"
                    className="block text-4xl font-bold text-white font-['Radley']"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 shadow">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full border-transparent border-2 border-white bg-[rgb(36,36,38)] text-white font-bold sm:py-4 md:px-6 py-3 px-5 rounded-3xl md:text-2xl text-2xl"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center my-4 justify-between">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-4xl font-bold text-white font-['Radley']"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2 shadow">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full border-transparent border-2 border-white bg-[rgb(36,36,38)] text-white font-bold sm:py-4 md:px-6 py-3 px-5 rounded-3xl md:text-2xl text-2xl"
                  />
                </div>
              </div>
              <div className="mt-10 mb-20">
                <button
                  type="submit"
                  className="flex w-[200px] sm:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] mx-auto justify-center rounded-full py-4 px-5 text-2xl font-semibold bg-[rgb(36,36,38)] border-2 border-white text-white hover:bg-[rgb(52,52,53)]"
                >
                  Confirm
                </button>
                <button
                  type="submit"
                  onClick={cancelForm}
                  className="mt-5 flex w-[200px] sm:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] mx-auto justify-center rounded-full py-4 px-5 text-2xl font-semibold bg-red-600 hover:bg-red-900 border-white border-2 text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown={isModalLocked}
      >
        <Box className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12  bg-[#242626] border-2 border-white rounded-3xl p-6 max-w-[80%] sm:max-w-md">
          <img
            src={modalIcon}
            alt="Alert icon"
            className="mx-auto w-[40%]"
          ></img>
          <h1 className="text-white font-bold text-3xl mt-2 font-['Radley']">
            {modalHeader}
          </h1>
          <h2 className="text-white text-xl mt-2 font-['Libre Baskerville']">
            {modalMessage}
          </h2>
          {countdown > 0 && (
            <h2 className="text-white text-lg mt-2 font-['Libre Baskerville']">
              Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
            </h2>
          )}
        </Box>
      </Modal>
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
    </>
  );
}
