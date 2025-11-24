import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Login from "./components/Login";

function Log() {
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token || userId) {
      console.error("Already signed in");
      navigate("/");
    }
  }, [token, userId, navigate]);

  if (token || userId) {
    return null;
  }

  return (
    <div className="Login">
      <Login />
    </div>
  );
}

export default Log;
