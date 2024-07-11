import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Shelf from "./components/Shelf";

export default function Profile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const token = location.state?.token;
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          console.error("Token is not available");
          return;
        }
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    } else {
      console.error("Token is undefined");
    }
  }, [userId, token]);

  if (token === undefined || token === null || !token) {
    return (
      navigate("/404")
    );
  }
  if (!userData) {
    return (
      <div className="w-full h-screen font-bold mx-auto text-center flex flex-col justify-center md:text-7xl text-5xl">
        Loading Bookshelf
      </div>
    );
  }
  return (
    <>
      <Shelf userData={userData} />
    </>
  );
}
