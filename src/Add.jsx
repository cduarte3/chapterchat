import React from "react";
import { useParams } from "react-router-dom";
import AddBook from "./components/Add";

function Add() {
  const { userId } = useParams();
  return (
    <>
      <div className="">
        <AddBook userId={userId} />
      </div>
    </>
  );
}

export default Add;
