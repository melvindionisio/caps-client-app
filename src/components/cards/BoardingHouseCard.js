import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import { amber } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Link as Nlink } from "@mui/material";
import { grey, pink } from "@mui/material/colors";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

const BoardingHouseCard = ({ boardinghouse }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleAddBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // const abortCont = new AbortController();
    // if (isBookmarked) {
    //   fetch(`http://localhost:3500/api/bookmarks/add${seekerId}`, {
    //     signal: abortCont.signal,
    //   })
    //     .then((res) => {
    //       if (!res.ok) {
    //         throw Error("Something went wrong!");
    //       }
    //       return res.json();
    //     })
    //     .then((boardinghouse) => {
    //       setIsBookmarked(true);
    //     })
    //     .catch((err) => {
    //       if (err.name === "AbortError") {
    //         console.log("fetch aborted");
    //       } else {
    //         console.log(err);
    //         setIsBookmarked(false);
    //       }
    //     });
    //   return () => {
    //     abortCont.abort();
    //   };
    // } else {
    //
    // }
  };

  return (
    // <Grid item lg={6} md={4} sm={6} xs={12}>
    <Card
    // variant="outlined"
    // sx={{
    //   background: `linear-gradient(to bottom right, ${lightBlue[400]}, ${blue[500]})`,
    // }}
    >
      <CardHeader
        sx={{
          paddingBottom: 0,
        }}
        title={
          <Typography variant="h6" sx={{ fontFamily: "Quicksand" }}>
            {boardinghouse.name}
          </Typography>
        }
        subheader={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <GradeIcon sx={{ mr: 0.5, color: amber[600] }} />
            <Typography variant="caption">
              {boardinghouse.popularity ?? 0} stars
            </Typography>
          </Box>
        }
      />
      <CardContent sx={{ paddingBottom: 0, paddingTop: 0 }}>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <PhoneOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
          <Nlink
            underline="hover"
            color="primary"
            href={`tel: ${boardinghouse.contacts}`}
          >
            {boardinghouse.contacts}
          </Nlink>
        </Typography>

        <Typography
          variant="body2"
          gutterBottom
          color="textSecondary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <RoomOutlinedIcon fontSize="small" sx={{ mr: 1 }} />{" "}
          {boardinghouse.completeAddress}
        </Typography>
        {/* `/boardingHouse/${boardinghouse.id}` */}
      </CardContent>
      <CardActions sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            to={`/boardinghouse/${boardinghouse.id}`}
            style={{ textDecoration: "none", width: "70%" }}
          >
            <Button
              size="small"
              color="primary"
              disableElevation
              variant="contained"
              fullWidth
              endIcon={<CallMadeOutlinedIcon fontSize="small" />}
              // onClick={() =>
              //   history.push(
              //     `/boarding-houses/${room.bhname
              //       .replace(/\s+/g, "-")
              //       .replace(/'/g, "")
              //       .toLowerCase()}/${room.roomName
              //       .replace(/\s+/g, "")
              //       .toLowerCase()}`
              //   )
              // }
            >
              Visit
            </Button>
          </Link>

          <IconButton
            size="medium"
            sx={
              isBookmarked
                ? {
                    background: grey[100],
                    ml: 1,
                    color: pink[500],
                  }
                : {
                    background: grey[100],
                    ml: 1,
                    color: grey[500],
                  }
            }
            onClick={handleAddBookmark}
          >
            {isBookmarked ? (
              <BookmarkAddedIcon fontSize="small" />
            ) : (
              <BookmarkAddIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
    // </Grid>
  );
};

export default BoardingHouseCard;
