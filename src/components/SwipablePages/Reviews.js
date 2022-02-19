import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";

import { Modal, Fade, Backdrop } from "@mui/material";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RateReviewIcon from "@mui/icons-material/RateReview";

import useCurrentTimeDate from "../../hooks/useCurrentTimeDate";
import { LoginContext } from "../../contexts/LoginContext";
import { domain } from "../../fetch-url/fetchUrl";
import LoadingState from "../LoadingState";
import ReviewCard from "../cards/ReviewCard";

const Reviews = () => {
   const { currentUser, isLoggedIn } = useContext(LoginContext);
   let scroller = useRef(null);
   const dateTime = useCurrentTimeDate();
   const [reviewText, setReviewText] = useState("");
   const { bhId } = useParams();
   const history = useHistory();

   const [reviews, setReviews] = useState([]);
   const [isEmpty, setIsEmpty] = useState(false);
   const [isPending, setIsPending] = useState(true);
   const [isSendingReview, setIsSendingReview] = useState(false);
   const [isDeleteReview, setIsDeleteReview] = useState(false);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const handleModalClose = () => {
      setIsModalOpen(false);
   };

   const handleAddReview = () => {
      if (reviewText !== "") {
         setIsSendingReview(true);
         fetch(`${domain}/api/reviews/add/${bhId}`, {
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
               //window.location.reload(false);
               console.log(data.message);
               setIsSendingReview(false);
               setIsModalOpen(false);
               setIsPending(true);
               setReviewText("");
               fetch(`${domain}/api/reviews/bh/${bhId}`)
                  .then((res) => {
                     if (!res.ok) {
                        throw Error("Something went wrong!");
                     }
                     return res.json();
                  })
                  .then((data) => {
                     setIsPending(false);
                     if (data) {
                        setReviews(data);
                        setTimeout(() => {
                           scroller.current.scrollIntoView();
                        }, 3000);
                     }
                  })
                  .catch((err) => {
                     console.log(err);
                  });
            })
            .catch((err) => console.log(err));
      } else {
         console.log("please fill");
      }
   };

   useEffect(() => {
      const abortCont = new AbortController();

      setTimeout(() => {
         fetch(`${domain}/api/reviews/bh/${bhId}`, {
            signal: abortCont.signal,
         })
            .then((res) => {
               if (!res.ok) {
                  throw Error("Something went wrong!");
               }
               return res.json();
            })
            .then((data) => {
               if (data) {
                  setReviews(data);
                  setIsPending(false);
                  //scroller.current.scrollIntoView();
               }
               if (data.length <= 0) {
                  setIsEmpty(true);
               }
            })
            .catch((err) => {
               if (err.name === "AbortError") {
                  console.log("fetch aborted");
               } else {
                  console.log(err);
               }
            });
      }, 0);

      return () => {
         abortCont.abort();
      };
   }, [bhId]);

   //useEffect(() => {
   //scroller.current.scrollIntoView();
   //}, [reviews]);

   const handleDeleteReview = async (reviewId) => {
      setIsDeleteReview(true);
      fetch(`${domain}/api/reviews/${reviewId}`, {
         method: "DELETE",
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            setReviews(() =>
               reviews.filter((review) => review.id !== reviewId)
            );
            console.log(data.message);
            setIsDeleteReview(false);
         })
         .catch((err) => console.log(err));
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
         <Modal
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
            open={isModalOpen}
            onClose={handleModalClose}
         >
            <Fade in={isModalOpen}>
               <Container
                  maxWidth="xl"
                  disableGutters
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "100%",
                     mt: -7,
                     px: 2,
                  }}
               >
                  <Box
                     sx={{
                        zIndex: 100,
                        bgcolor: "background.paper",
                        width: 400,
                        borderRadius: ".5rem",
                        boxShadow: 10,
                        p: 1,
                        height: "max-content",
                        flexDirection: "column",
                        display: "flex",
                        gap: 1,
                     }}
                  >
                     <CloseOutlined
                        sx={{ alignSelf: "flex-end" }}
                        onClick={handleModalClose}
                        color="warning"
                     />
                     <Box
                        sx={{
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "center",
                           gap: 1,
                        }}
                     >
                        <RateReviewIcon
                           sx={{
                              height: "3rem",
                              width: "3rem",
                              color: "text.secondary",
                           }}
                        />
                        <Typography
                           align="center"
                           variant="h6"
                           sx={{
                              textTransform: "uppercase",
                              fontFamily: "Quicksand",
                              mt: -1,
                              color: "text.secondary",
                           }}
                        >
                           Send a review
                        </Typography>
                     </Box>

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
                     <LoadingButton
                        size="small"
                        variant="contained"
                        onClick={handleAddReview}
                        loading={isSendingReview}
                     >
                        Send
                     </LoadingButton>
                  </Box>
               </Container>
            </Fade>
         </Modal>

         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
               gap: 1,
               height: "50vh",
               overflowY: "auto",
               padding: "1rem 5px",
               borderRadius: 1,
               position: "relative",
            }}
         >
            {isPending && <LoadingState loadWhat="Reviews" />}

            {reviews &&
               reviews.map((review) => (
                  <ReviewCard
                     key={review.id}
                     review={review}
                     isCurrentUserReview={
                        review.reviewerId === currentUser.id ? true : false
                     }
                     handleDeleteReview={handleDeleteReview}
                     isDeleteReview={isDeleteReview}
                  />
               ))}

            {isEmpty && (
               <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 4 }}
               >
                  Reviews is empty!
               </Typography>
            )}
            <Typography
               ref={scroller}
               align="center"
               style={{
                  marginTop: 7,
                  display: "flex",
                  justifyContent: "center",
               }}
            >
               <Typography
                  align="center"
                  variant="caption  "
                  style={{
                     height: 10,
                     width: 10,
                     borderRadius: 50,
                     background: grey[400],
                  }}
               ></Typography>
            </Typography>
         </Box>
         <Box
            sx={{
               marginTop: 1,
               display: "flex",
               justifyContent: "center",
            }}
         >
            {isLoggedIn.isLoggedIn ? (
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     gap: 1,
                     width: "100%",
                     padding: 1,
                     borderRadius: 1,
                  }}
               >
                  <Button
                     variant="contained"
                     size="medium"
                     color="success"
                     startIcon={<AddOutlinedIcon />}
                     onClick={() => setIsModalOpen(true)}
                     disableElevation
                  >
                     Add review
                  </Button>
               </Box>
            ) : (
               <Box
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "center",
                  }}
               >
                  <Typography
                     variant="body1"
                     align="center"
                     color="text.secondary"
                  >
                     You must logged in to submit a review.
                  </Typography>
                  <Box
                     sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        mt: 2,
                     }}
                  >
                     <Button
                        variant="contained"
                        size="small"
                        onClick={() => history.push("/login")}
                     >
                        Login
                     </Button>
                     <Button
                        variant="contained"
                        size="small"
                        onClick={() => history.push("/register")}
                     >
                        Register
                     </Button>
                  </Box>
               </Box>
            )}
         </Box>
      </Container>
   );
};

export default Reviews;
