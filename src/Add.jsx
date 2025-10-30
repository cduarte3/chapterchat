import React from "react";
import { useParams } from "react-router-dom";
import AddBook from "./components/Add";

function Add() {
  const { userId } = useParams();
  return (
    <>
      <AddBook userId={userId} />
    </>
  );
}

export default Add;
