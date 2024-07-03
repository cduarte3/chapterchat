import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Shelf from './components/Shelf';
//import Footer from './components/Footer';

export default function Profile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  console.log(userId);

  useEffect(() => {
    const url = `http://localhost:5000/users/${userId}`;

    const fetchUserData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return (
    <div className="w-full h-screen font-bold mx-auto text-center flex flex-col justify-center md:text-7xl text-5xl">
      Loading Bookshelf
    </div>
    );
  }

  console.log(userData);
  return (
    <div>
        <Shelf userData={userData} />
    </div>
    
  );
}