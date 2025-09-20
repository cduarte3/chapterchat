import React from "react";
import Rating from "@mui/material/Rating";

export default function BasicRating({ value, setRating }) {
  return (
    <div>
      <div className="my-5">
        <Rating
          value={value}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          sx={{
            fontSize: {
              xs: "2.5rem", // On extra-small devices
              sm: "2.5rem", // On small devices
              md: "3rem", // On medium devices
              lg: "3.5rem", // On large devices
              xl: "4rem", // On extra-large devices
            },
          }}
        />
      </div>
    </div>
  );
}