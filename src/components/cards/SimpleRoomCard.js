import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import {
   CardContent,
   CardActionArea,
   Typography,
   Button,
   Box,
   Grid,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useHistory, Link } from "react-router-dom";
import AddBookmarkButton from "../../components/AddBookmarkButton";
import { domain } from "../../fetch-url/fetchUrl";
import { LoginContext } from "../../contexts/LoginContext";
import { blue, orange, green } from "@mui/material/colors";

const SimpleRoomCard = ({ room }) => {
   const [isBookmarked, setIsBookmarked] = useState(false);
   const history = useHistory();
   const [houseName, setHouseName] = useState("");
   const { currentUser, isLoggedIn } = useContext(LoginContext);

   useEffect(() => {
      const abortCont = new AbortController();
      //CHECK IF THE BOARDINGHOUSE IS EXISTING IN BOOKMARKS
      fetch(
         `${domain}/api/bookmarks/room/isbookmarked/${room.id}/${currentUser.id}`,
         {
            signal: abortCont.signal,
         }
      )
         .then((res) => res.json())
         .then((data) => {
            setIsBookmarked(data.isBookmarked);
         })
         .catch((err) => console.log(err));

      fetch(`${domain}/api/boarding-houses/${room.boardinghouseId}`, {
         signal: abortCont.signal,
      })
         .then((res) => res.json())
         .then((data) => {
            setHouseName(data.name);
         })
         .catch((err) => {
            if (err.name === "AbortError") {
               console.log("fetch aborted");
            }
         });

      return () => {
         abortCont.abort();
      };
   }, [room, currentUser]);

   return (
      <>
         {room && (
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
               <Card
                  sx={{
                     overflow: "hidden",
                     borderRadius: 2,
                     transition: "150ms ease",
                     "&:hover": {
                        transform: "scale(1.02)",
                     },
                     "&:active": {
                        transform: "scale(.98)",
                     },
                  }}
               >
                  <Box sx={{ p: 1 }}>
                     <CardActionArea>
                        <CardMedia
                           sx={{ borderRadius: 2 }}
                           onClick={() => history.push(`/rooms/${room.id}`)}
                           component="img"
                           height="130"
                           alt="room-image"
                           //image="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2057&q=80"
                           image={room.picture}
                        />
                     </CardActionArea>
                  </Box>
                  <CardHeader
                     title={
                        <Typography
                           variant="h6"
                           sx={{
                              fontFamily: "Quicksand",
                              padding: 0,
                           }}
                        >
                           {room.name}
                        </Typography>
                     }
                     subheader={
                        <Link
                           to={`/boardinghouse/${room.boardinghouseId}`}
                           style={{ textDecoration: "none", width: "100%" }}
                        >
                           <Typography
                              variant="body2"
                              sx={{
                                 color: "#2C2C2C",

                                 textDecoration: "underline",
                                 mt: -0.5,
                                 mb: "3px",
                              }}
                           >
                              Room by {houseName}
                           </Typography>
                        </Link>
                     }
                     action={
                        isLoggedIn.isLoggedIn && (
                           <AddBookmarkButton
                              roomId={room.id}
                              roomName={room.name}
                              bookmarkType={"room"}
                              isBookmarked={isBookmarked}
                              setIsBookmarked={setIsBookmarked}
                           />
                        )
                     }
                     sx={{ py: 0, pt: 1 }}
                  />
                  <CardContent
                     sx={{ p: 2, py: 1, flexGrow: 2, display: "flex", gap: 1 }}
                  >
                     <Typography
                        variant="caption"
                        sx={{ px: 1, background: blue[200], borderRadius: 1 }}
                     >
                        Total: {`${room.totalSlots}`}
                     </Typography>
                     <Typography
                        variant="caption"
                        sx={{ px: 1, background: orange[200], borderRadius: 1 }}
                     >
                        Occupied: {`${room.occupiedSlots}`}
                     </Typography>

                     <Typography
                        variant="caption"
                        sx={{ px: 1, background: green[200], borderRadius: 1 }}
                     >
                        Available: {`${room.totalSlots - room.occupiedSlots}`}
                     </Typography>
                  </CardContent>
                  <CardActions>
                     <Button
                        size="small"
                        color="primary"
                        disableElevation
                        variant="contained"
                        fullWidth
                        endIcon={<ArrowForwardIosIcon fontSize="small" />}
                        onClick={() => history.push(`/rooms/${room.id}`)}
                     >
                        View
                     </Button>
                  </CardActions>
               </Card>
            </Grid>
         )}
      </>
   );
};

export default SimpleRoomCard;
