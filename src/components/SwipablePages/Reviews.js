import React, { useState, useContext } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ReviewCard from "../cards/ReviewCard";
import TextField from "@mui/material/TextField";
import useCurrentTimeDate from "../../hooks/useCurrentTimeDate";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";

const Reviews = () => {
   const { currentUser } = useContext(LoginContext);
   const dateTime = useCurrentTimeDate();
   const [reviewText, setReviewText] = useState("");
   const { bhId } = useParams();

   const handleAddReview = () => {
      if (reviewText) {
         fetch(`http://localhost:3500/api/reviews/add/${bhId}`, {
            method: "POST",
            body: JSON.stringify({
               seekerId: currentUser.id,
               boardinghouseId: bhId,
               reviewDate: dateTime,
               reviewerName: currentUser.name,
               reviewText: reviewText,
            }),
            headers: {
               "Content-Type": "application/json",
            },
         })
            .then((res) => {
               return res.json();
            })
            .then((data) => {
               console.log(data.message);
            })
            .catch((err) => console.log(err));
      } else {
         console.log("please fill");
      }
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
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
               />
               <Button
                  size="small"
                  variant="contained"
                  onClick={handleAddReview}
               >
                  Send
               </Button>
            </Box>
         </Box>
      </Container>
   );
};

export default Reviews;
