import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import NotFound from './404';
import Log from './login';
import Sign from './signup';
import Profile from './Profile';
import Add from './Add';
import Book from './Book';
import Protected from './Protected';
import User from './User';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Log />} />
        <Route path="signup" element={<Sign />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user/:userId" element={<Protected><Profile/></Protected>} />
        <Route path="/user/:userId/add" element={<Protected><Add/></Protected>} />
        <Route path="/user/:userId/book/:bookId" element={<Protected><Book/></Protected>} />
        <Route path="/user/:userId/profile" element={<Protected><User/></Protected>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
