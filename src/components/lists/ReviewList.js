import React from "react";
import {
   ListItem,
   Typography,
   ListItemText,
   ListItemAvatar,
   Avatar,
   Box,
} from "@mui/material";
import { red, lightBlue, grey, green, deepPurple } from "@mui/material/colors";
import LoadingButton from "@mui/lab/LoadingButton";
import { Delete } from "@mui/icons-material";

function ReviewList({
   review,
   isCurrentUserReview,
   handleDeleteReview,
   isDeleteReview,
}) {
   return (
      <ListItem
         alignItems="flex-start"
         disableGutters
         disablePadding
         divider
         sx={
            isCurrentUserReview
               ? {
                    padding: 1,
                    borderRight: `3px solid ${green[500]}`,
                    transition: "150ms ease",
                    "&:hover": {
                       background: grey[50],
                    },
                 }
               : {
                    padding: 1,
                    borderLeft: `3px solid ${lightBlue[500]}`,
                    transition: "150ms ease",
                    "&:hover": {
                       background: grey[50],
                    },
                 }
         }
      >
         <ListItemAvatar>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>
               {review.reviewerName.charAt(0).toUpperCase()}
            </Avatar>
         </ListItemAvatar>
         <ListItemText
            primary={
               <Box
                  sx={{
                     display: "flex",
                     flexDirection: "row",
                     justifyContent: "space-between",
                  }}
               >
                  <Box
                     sx={{
                        display: "flex",
                        flexDirection: "column",
                        mb: 1,
                     }}
                  >
                     {isCurrentUserReview ? (
                        <Typography
                           variant="body1"
                           color="initial"
                           sx={{ fontSize: 14 }}
                        >
                           Me{" "}
                           <Typography
                              variant="caption"
                              sx={{ fontWeight: "thin" }}
                           >
                              ({review.reviewerName})
                           </Typography>
                        </Typography>
                     ) : (
                        <Typography
                           variant="body1"
                           color="initial"
                           sx={{ fontSize: 14 }}
                        >
                           {review.reviewerName}
                        </Typography>
                     )}

                     <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                           textTransform: "uppercase",
                           fontSize: 10,
                        }}
                     >
                        {review.date}
                     </Typography>
                  </Box>
                  {isCurrentUserReview && (
                     <LoadingButton
                        size="small"
                        onClick={() => handleDeleteReview(review.id)}
                        variant="contained"
                        disableElevation
                        loading={isDeleteReview}
                        sx={{
                           position: "absolute",
                           top: 10,
                           right: 5,
                           background: red[50],
                           color: red[500],
                           "&:hover": {
                              background: red[100],
                           },
                        }}
                        startIcon={
                           <Delete fontSize="small" sx={{ color: red[400] }} />
                        }
                     >
                        delete
                     </LoadingButton>
                  )}
               </Box>
            }
            secondary={
               <Typography
                  variant="body1"
                  color="initial"
                  //sx={{ px: 5 }}
               >
                  {review.text}
               </Typography>
            }
         />
      </ListItem>
   );
}

export default ReviewList;
