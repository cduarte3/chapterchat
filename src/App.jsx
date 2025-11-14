import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

function App() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token && userId && location.pathname === "/") {
      navigate(`/user/${userId}`, { state: { token: token } });
    }
  }, [token, userId, navigate, location.pathname]);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
