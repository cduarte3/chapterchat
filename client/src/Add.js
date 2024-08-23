import React from 'react';
import './index.css';
import AddBook from './components/Add';
import { useParams } from 'react-router-dom';
import Footer from './components/Footer';


function Add() {
  const { userId } = useParams();
  return (
    <>
    <div className="Add h-screen">
      <AddBook userId={userId} />
      
    </div>
    <Footer />
    </>
  );
}

export default Add;
