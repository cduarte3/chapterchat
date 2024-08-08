import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserProfile from "./components/Profile";
import Footer from "./components/Footer";

export default function User() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  // This function fetches the user bookshelf information
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // if the token is undefined, send the user to the login page
        if (!token) {
          console.error("Token is not available");
          navigate("/login");
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
    fetchUserData();
  }, [userId, token, navigate]);
  
  if (!userData) {
    // While the data loads, let the user know
    return (
      <div className="w-full h-screen font-bold mx-auto text-center flex flex-col justify-center md:text-7xl text-5xl">
        Loading Profile
      </div>
    );
  }
  return (
    <>
      <UserProfile userData={userData} />
      <Footer/>
    </>
  );
}
