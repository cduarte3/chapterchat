import React from "react";
import Rating from "@mui/material/Rating";

export default function BasicRating({ value, setRating }) {
  return (
    <div>
      <div className="text-center justify-center p-4">
        <Rating
          value={value}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          sx={{
            fontSize: {
              xs: "2.5rem",
              sm: "2.5rem",
              md: "3rem",
              lg: "3.5rem",
              xl: "4rem",
            },
          }}
        />
      </div>
    </div>
  );
}