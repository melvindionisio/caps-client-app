import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import { IconButton, CardContent, Typography } from "@mui/material";
import { grey, pink } from "@mui/material/colors";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const RoomCard = ({ room }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        ":hover": {
          boxShadow: "0px 1px 4px rgba(0,0,0,0.2)",
        },
        // ":active": {
        //   transform: " scale(.99)",
        // },
        transition: "150ms ease",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CardMedia
          image={room.imagesPath}
          component="img"
          alt="room-picture"
          title={room.roomName}
          sx={{ width: 160 }}
        />
        <Box
          sx={{
            alignSelft: "flex-start",
            p: 1,
            flexGrow: 2,
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
          <CardContent>{`${room.occupiedBed}/${room.totalBed}`}</CardContent>
          <CardActions
            sx={{
              p: 0,
              m: 0,
              pt: ".2rem",
              pl: 1,
              display: "flex",
              ">*": {
                mr: 1,
              },
              justifyContent: "start",
            }}
          >
            <IconButton
              size="medium"
              sx={{
                background: grey[100],
                color: pink[500],
              }}
            >
              <ThumbUpIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="medium"
              sx={{
                background: grey[100],
                color: pink[500],
              }}
            >
              <BookmarkAddIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="medium"
              sx={{
                background: grey[100],
                color: pink[500],
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
};

export default RoomCard;
