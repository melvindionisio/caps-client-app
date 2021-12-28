import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { lightBlue } from "@mui/material/colors";
import Button from "@mui/material/Button";

import ReviewCard from "../cards/ReviewCard";
import TextField from "@mui/material/TextField";

const Reviews = () => {
  const [review, setReview] = useState();
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
          gap: 2,
          height: "50vh",
          overflowY: "auto",
          padding: "1rem 5px",
          borderRadius: 1,
          border: `1px solid ${lightBlue[400]}`,
        }}
      >
        <ReviewCard isMyReview={false} />
        <ReviewCard isMyReview={true} />
        <ReviewCard isMyReview={false} />
        <ReviewCard isMyReview={false} />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          width: "90%",
          position: "absolute",
          bottom: "5rem",
          right: "1rem",
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
        <Button size="small" variant="contained">
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default Reviews;
