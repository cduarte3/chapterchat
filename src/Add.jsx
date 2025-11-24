import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddBook from "./components/Add";
import { isOwnProfile } from "./utils/auth";

function Add() {
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const isCurrentUserProfile = isOwnProfile(userId);

  useEffect(() => {
    if (!token) {
      console.error("Token is not available");
      navigate("/login");
    } else if (!isCurrentUserProfile) {
      console.error("User ID is incorrect for profile access");
      navigate("/");
    }
  }, [token, isCurrentUserProfile, navigate]);

  if (!token || !isCurrentUserProfile) {
    return null;
  }

  return (
    <>
      <AddBook userId={userId} />
    </>
  );
}

export default Add;
