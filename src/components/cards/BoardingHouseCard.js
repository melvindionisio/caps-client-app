import React, { useState, useContext } from "react";
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
import { LoginContext } from "../../contexts/LoginContext";
import useCurrentTimeDate from "../../hooks/useCurrentTimeDate";
import { domain } from "../../fetch-url/fetchUrl";

const BoardingHouseCard = ({ boardinghouse }) => {
   const { currentUser } = useContext(LoginContext);
   const [isBookmarked, setIsBookmarked] = useState(false);
   const time = useCurrentTimeDate();

   const handleAddBookmark = (boardinghouseId, boardinghouseName) => {
      fetch(`${domain}/api/bookmarks/add/${currentUser.id}`, {
         method: "POST",
         body: JSON.stringify({
            bookmarkDate: time,
            roomId: null,
            boardinghouseId: boardinghouseId,
            bookmarkType: "boardinghouse",
            bookmarkName: boardinghouseName,
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
            setIsBookmarked(true);
         })
         .catch((err) => console.log(err));
   };

   return (
      // <Grid item lg={6} md={4} sm={6} xs={12}>
      <Card
         sx={{
            transition: "150ms ease",
            "&:hover": {
               transform: "scale(1.01)",
            },
            "&:active": {
               transform: "scale(.98)",
            },
         }}
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
            action={
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
                  onClick={() =>
                     handleAddBookmark(boardinghouse.id, boardinghouse.name)
                  }
               >
                  {isBookmarked ? (
                     <BookmarkAddedIcon fontSize="small" />
                  ) : (
                     <BookmarkAddIcon fontSize="small" />
                  )}
               </IconButton>
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
         <CardActions>
            <Link
               to={`/boardinghouse/${boardinghouse.id}`}
               style={{ textDecoration: "none", width: "100%" }}
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
         </CardActions>
      </Card>
      // </Grid>
   );
};

export default BoardingHouseCard;
