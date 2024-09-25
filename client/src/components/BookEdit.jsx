import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookEdit({bookData, userId}) {
  const [author, setAuthor] = useState(bookData.author);
  const [title, setTitle] = useState(bookData.title);
  const [review, setReview] = useState(bookData.review);
  const [rating, setRating] = useState(bookData.rating);
  const [cover, setCover] = useState(bookData.cover);

  const navigate = useNavigate();

  function cancelForm() {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/user/${userId}`);
      return;
    }
    else {
      navigate("/login");
    }
  }

  return (
    <>

    </>
  );
}