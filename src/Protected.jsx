import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === undefined) {
      navigate("/");
    }
  }, [token, navigate]);

  return <>{children}</>;
}
