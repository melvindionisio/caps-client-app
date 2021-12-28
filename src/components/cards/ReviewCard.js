import { Paper, Avatar, Typography, Box, IconButton } from "@mui/material";
import { red, lightBlue } from "@mui/material/colors";
import React from "react";
import { Delete } from "@mui/icons-material";

const ReviewCard = ({ isMyReview }) => {
  return (
    <Box
      sx={
        isMyReview
          ? { display: "flex", justifyContent: "start" }
          : { display: "flex", justifyContent: "end" }
      }
    >
      <Paper
        elevation={isMyReview ? 1 : 0}
        sx={
          isMyReview
            ? {
                padding: 2,
                border: `1px solid ${lightBlue[500]}`,
                borderRadius: "1.5rem 1.5rem 1.5rem 0rem",
                width: 270,
              }
            : {
                padding: 2,
                // border: `1px solid ${purple[500]}`,
                borderRadius: "1.5rem 0rem 1.5rem 1.5rem",
                width: 270,
              }
        }
      >
        <Box sx={{ display: "flex", gap: 1, position: "relative" }}>
          <Avatar></Avatar>
          <Box
            sx={{ display: "flex", flexDirection: "column", paddingBottom: 1 }}
          >
            <Typography variant="body1" color="initial">
              Reviewee's name
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: "uppercase", fontStyle: "italic" }}
            >
              Review Date
            </Typography>
          </Box>
          {isMyReview && (
            <IconButton
              sx={{
                position: "absolute",
                top: 1,
                right: 1,
              }}
            >
              <Delete sx={{ color: red[400] }} />
            </IconButton>
          )}
        </Box>
        <Typography variant="body1" color="initial">
          The condtent of the actual review and comments
        </Typography>
      </Paper>
    </Box>
  );
};

export default ReviewCard;
