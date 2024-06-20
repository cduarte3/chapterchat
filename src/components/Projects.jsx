import React from "react";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <div className="min-h-screen">
      <h1 className="justify-center text-center mx:auto md:text-7xl sm:text-6xl text-4xl font-bold md:py-6 pt-[30px] text-white">Current Projects</h1>
      <div className="flex-grow grid max-w-[90%] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[50px] pt-[50px] pb-[50px] mx-auto text-white justify-center text-center">
        <div className="border-4 rounded-lg shadow bg-gray-800 border-white h-full p-[30px]">
          <img
            className="mx-auto rounded-lg lg:w-[60%]"
            src="https://pbs.twimg.com/profile_images/1641476962362302464/K8lb6OtN_400x400.jpg"
            alt="AWS Logo"
          />
          <div>
            <h5 className="pt-3 mb-2 text-2xl font-bold tracking-tight text-white">
              AWS Microservice
            </h5>
            <p className="mb-3 font-normal text-gray-400">
              Uses Parcel, Docker, and AWS (EC2, ECS, ECR, CLI, S3 bucket,
              dynamoDB, cloudWatch). Includes hurl, jest testing with CI/CD pipelines.
            </p>
            <Link
              to="https://www.youtube.com/watch?v=D5WmuvlWnvE"
              target="_blank"
            >
              <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                View Live Demo
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
        <div className="border-4 rounded-lg shadow bg-gray-800 border-white h-full p-[30px]">
          <img
            className="mx-auto rounded-lg lg:w-[60%]"
            src="https://media.istockphoto.com/id/1420518918/vector/blackjack-icon-flat-style-vector-illustration-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=a3WpuAt-cEzO1rNAPasLfi6FgwTTepKNm10194yOEUg="
            alt="Blackjack Cards"
          />
          <div>
            <h5 className="pt-3 mb-2 text-2xl font-bold tracking-tight text-white">
              BlackJack Pygame
            </h5>
            <p className="mb-3 font-normal text-gray-400">
              BlackJack demo game I made using PyGame. Single executable, can be downloaded and ran on any Windows device.
            </p>
            <Link to="https://christianduarte7.itch.io/blackjack-demo" target="_blank">
              <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Play Blackjack
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
        <div className="border-4 rounded-lg shadow bg-gray-800 border-white h-full p-[30px]">
          <img
            className="mx-auto rounded-lg lg:w-[60%]"
            src="https://play-lh.googleusercontent.com/AURm4IHjEIkewO_J3t7ZIy5FlFR7B8iTAWKEM_fjFPGW3Sfh8pbLPPsqB1vEC4rqEHU"
            alt="Connect 4 Chips"
          />
          <div>
            <h5 className="pt-3 mb-2 text-2xl font-bold tracking-tight text-white">
              Connect 4 Pygame
            </h5>
            <p className="mb-3 font-normal text-gray-400">
              Connect 4 Pygame with gametree logic, and custom UI. Can be downloaded and ran as a single file .exe for windows devices.
            </p>
            <Link to="https://christianduarte7.itch.io/connect-four" target="_blank">
              <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Play Connect 4
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
        <div className="border-4 rounded-lg shadow bg-gray-800 border-white h-full p-[30px]">
          <img
            className="mx-auto rounded-lg lg:w-[60%]"
            src="https://i.pinimg.com/originals/06/c4/f7/06c4f70ec5931e2342e703e8a3f0a253.png"
            alt="Weather App Icon"
          />
          <div>
            <h5 className="pt-3 mb-2 text-2xl font-bold tracking-tight text-white">
              Weather App
            </h5>
            <p className="mb-3 font-normal text-gray-400">
              Utilizes OpenWeather API and geocode.maps.co lat/long API and is
              simple a way to showcase some of my skills with API Data.
            </p>
            <Link to="https://weather-app-gamma-cyan-66.vercel.app/" target="_blank">
              <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Check the Weather
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
