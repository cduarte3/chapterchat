import React from "react";
import "./index.css";
import Questions from "./components/Questions";
import Footer from "./components/Footer";

function FAQ() {
  return (
    <>
      <div className="h-full">
        <Questions />
      </div>
      <Footer />
    </>
  );
}

export default FAQ;
