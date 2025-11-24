import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserProfile from "./components/Profile";
import { isOwnProfile } from "./utils/auth";

export default function User() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const isCurrentUserProfile = isOwnProfile(userId);

  // This function fetches the user profile information
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          console.error("Token is not available");
          navigate("/login");
          return;
        }

        if (!isCurrentUserProfile) {
          console.error("User ID is incorrect for profile access");
          navigate("/");
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
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
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
  }, [userId, token, navigate, isCurrentUserProfile]);

  if (!userData) {
    return (
      <div className="w-full h-screen font-bold mx-auto text-center flex flex-col justify-center md:text-7xl text-5xl text-white font-['Radley']">
        Loading Profile
      </div>
    );
  }
  return (
    <>
      <UserProfile userData={userData} />
    </>
  );
}
