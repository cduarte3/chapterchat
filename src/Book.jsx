import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookDetail from "./components/BookDetail";

export default function Profile() {
  const { userId, bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/users/${userId}/book/${bookId}`;

    const fetchBookData = async () => {
      try {
        if (!token) {
          console.error("Token is undefined");
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

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBookData(data);
      } catch (error) {
        console.error("Error fetching book data:", error);
        navigate("/");
      }
    };

    fetchBookData();
  }, [userId, bookId, token, navigate]);

  if (!bookData) {
    return (
      <div className="w-full h-screen font-bold mx-auto text-center flex flex-col justify-center md:text-7xl text-5xl">
        Loading Book
      </div>
    );
  }
  return (
    <>
      <BookDetail bookData={bookData} userId={userId} />
    </>
  );
}
