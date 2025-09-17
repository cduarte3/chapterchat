import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Shelf from "./components/Shelf";

export default function Bookshelf() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // This function fetches the user bookshelf information
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          console.error("Token is not available");
          navigate("/login");
          return;
        }

        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          mode: "cors",
        };

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users/${userId}`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [userId, token, navigate]);

  if (!userData) {
    // While the data loads, let the user know
    return (
      <div className="w-full h-screen font-bold mx-auto text-center flex flex-col justify-center md:text-7xl text-5xl">
        Loading Bookshelf
      </div>
    );
  }
  return (
    // Once the data is fetched and loaded, it will display in the shelf grid
    <>
      <Shelf userData={userData} />
    </>
  );
}
