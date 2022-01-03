import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ReviewCard from "../cards/ReviewCard";
import TextField from "@mui/material/TextField";

const Reviews = () => {
  const [review, setReview] = useState();
  const handleAddReview = () => {
    console.log("Review Added");
  };

  return (
    <Container
      maxWidth="md"
      disableGutters
      sx={{
        padding: 2,
        paddingBottom: "5rem",
        height: "85vh",
        overflowY: "none",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          height: "50vh",
          overflowY: "auto",
          padding: "1rem 5px",
          borderRadius: 1,
        }}
      >
        <ReviewCard isMyReview={false} />
        <ReviewCard isMyReview={true} />
        <ReviewCard isMyReview={false} />
        <ReviewCard isMyReview={false} />
      </Box>
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            width: "100%",
            padding: 1,
            background: "#fff",
            borderRadius: 1,
          }}
        >
          <TextField
            id="review-field"
            label="Enter your review..."
            size="small"
            fullWidth
            multiline
            rows={3}
            variant="filled"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Button size="small" variant="contained" onClick={handleAddReview}>
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Reviews;
