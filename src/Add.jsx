import React from "react";
import { useParams } from "react-router-dom";
import AddBook from "./components/Add";
import Footer from "./components/Footer";

function Add() {
  const { userId } = useParams();
  return (
    <>
      <div className="min-h-screen h-full">
        <AddBook userId={userId} />
      </div>
      <Footer />
    </>
  );
}

export default Add;
