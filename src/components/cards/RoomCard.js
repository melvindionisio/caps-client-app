import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import { IconButton, CardContent, Typography, Button } from "@mui/material";
import { grey, pink, amber } from "@mui/material/colors";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

const RoomCard = ({ room }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <Card
      variant="outlined"
      // elevation={2}
      sx={{
        // ":hover": {
        //   boxShadow: "0px 5px 10px rgba(0,0,0,0.3)",
        //   // transform: " scale(1.01)",
        // },
        // ":active": {
        //   transform: " scale(.99)",
        // },
        transition: "150ms ease",
        overflow: "hidden",
        borderRadius: 2,
        padding: 0,
      }}
    >
      <Box sx={{ display: "flex", height: "inherit" }}>
        <Box sx={{ width: "45%", overflow: "hidden" }}>
          <CardMedia
            image={room.imagesPath}
            component="img"
            alt="room-picture"
            title={room.roomName}
            sx={{
              height: "100%",
              width: "100%",
              ":hover": {
                transform: " scale(1.2)",
              },
              transition: "150ms ease",
            }}
          />
        </Box>
        <Box
          sx={{
            alignSelft: "flex-start",
            p: 1,
            flexGrow: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader
            title={
              <Typography variant="h6" sx={{ fontFamily: "Quicksand" }}>
                {room.roomName}
              </Typography>
            }
            subheader={<Typography variant="body2">{room.bhname}</Typography>}
            sx={{ p: 1, pb: 0 }}
          />
          <CardContent
            sx={{ p: 1, pt: 1, flexGrow: 2 }}
          >{`${room.occupiedBed}/${room.totalBed}`}</CardContent>
          <CardActions
            sx={{
              p: 0,
              m: 0,
              pt: ".2rem",
              pl: 1,
              pr: 1,
              display: "flex",
              ">*": {
                mr: 1,
              },
              justifyContent: "end",
              alignSelf: "flex-end",
            }}
          >
            {isLiked ? (
              <IconButton
                size="medium"
                sx={{
                  background: grey[100],
                  color: amber[500],
                }}
                onClick={() => setIsLiked(!isLiked)}
              >
                <ThumbUpIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton
                size="medium"
                sx={{
                  background: grey[100],
                  color: grey[500],
                }}
                onClick={() => setIsLiked(!isLiked)}
              >
                <ThumbUpOffAltIcon fontSize="small" />
              </IconButton>
            )}

            {isBookmarked ? (
              <IconButton
                size="medium"
                sx={{
                  background: grey[100],
                  color: pink[500],
                }}
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <BookmarkAddedIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton
                size="medium"
                sx={{
                  background: grey[100],
                  color: grey[500],
                }}
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <BookmarkAddIcon fontSize="small" />
              </IconButton>
            )}

            <Button
              size="medium"
              color="primary"
              disableElevation
              variant="text"
              sx={{
                background: grey[100],
              }}
              endIcon={<ArrowForwardIosIcon fontSize="small" />}
            >
              Visit
            </Button>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
};

export default RoomCard;
