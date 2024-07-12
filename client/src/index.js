import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import NotFound from "./404";
import Log from "./login";
import Sign from "./signup";
import Profile from "./Profile";
import Add from "./Add";
import User from "./User";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Log />} />
        <Route path="signup" element={<Sign />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/user/:userId/add" element={<Add />} />
        <Route path="user/:userId/profile" element={<User />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
