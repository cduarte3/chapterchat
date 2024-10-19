import React, { useEffect, useState } from "react";
import BookEdit from "./components/BookEdit";
import { useParams, useNavigate } from "react-router-dom";

export default function Edit() {
  const { userId, bookId } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/users/${userId}/book/${bookId}`;

    const fetchBookData = async () => {
      try {
        if (!token) {
          console.error("Token is undefined");
          navigate("/");
          return;
        }
        const response = await fetch(url, {
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
        setBookData(data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, [userId, bookId, token, navigate]);

  if (!bookData) {
    return (
    <div className="w-full h-screen font-bold mx-auto text-center flex flex-col justify-center md:text-7xl text-5xl">
      Loading
    </div>
    );
  }
  return (
    <>
      <BookEdit bookData={bookData} userId={userId} bookId={bookId} />
    </>
  );
}
