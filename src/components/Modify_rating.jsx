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
              xs: "3.5rem", // On extra-small devices
              sm: "4rem", // On small devices
              md: "4rem", // On medium devices
              lg: "4.5rem", // On large devices
              xl: "5rem", // On extra-large devices
            },
            "& .MuiRating-iconEmpty": {
              color: "gray",
            },
          }}
        />
      </div>
    </div>
  );
}
