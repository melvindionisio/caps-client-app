import React, { useContext, useEffect, useState } from "react";
import {
   Card,
   CardHeader,
   CardContent,
   CardActions,
   Typography,
   Button,
   Box,
   Grid,
} from "@mui/material";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import { amber } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Link as Nlink } from "@mui/material";
import AddBookmarkButton from "../../components/AddBookmarkButton";
import { domain } from "../../fetch-url/fetchUrl";
import { LoginContext } from "../../contexts/LoginContext";

const BoardingHouseCard = ({ boardinghouse }) => {
   const [isBookmarked, setIsBookmarked] = useState(false);
   const { currentUser, isLoggedIn } = useContext(LoginContext);

   useEffect(() => {
      const abortCont = new AbortController();
      //CHECK IF THE BOARDINGHOUSE IS EXISTING IN BOOKMARKS
      fetch(
         `${domain}/api/bookmarks/boardinghouse/isbookmarked/${boardinghouse.id}/${currentUser.id}`
      )
         .then((res) => res.json())
         .then((data) => {
            setIsBookmarked(data.isBookmarked);
         })
         .catch((err) => console.log(err));
      return () => {
         abortCont.abort();
      };
   }, [boardinghouse, currentUser]);

   return (
      <Grid item lg={6} md={4} sm={6} xs={12}>
         <Card
            sx={{
               transition: "150ms ease",
               "&:hover": {
                  transform: "scale(1.01)",
               },
               "&:active": {
                  transform: "scale(.98)",
               },
               borderRadius: 2,
            }}
         >
            <CardHeader
               sx={{
                  paddingBottom: 0,
               }}
               title={
                  <Link
                     to={`/boardinghouse/${boardinghouse.id}`}
                     style={{ textDecoration: "none", width: "100%" }}
                  >
                     <Typography
                        variant="h6"
                        sx={{
                           fontFamily: "Quicksand",
                           color: "#2C2C2C",
                           "&:hover": {
                              textDecoration: "underline",
                           },
                        }}
                     >
                        {boardinghouse.name}
                     </Typography>
                  </Link>
               }
               subheader={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                     <GradeIcon sx={{ mr: 0.5, color: amber[600] }} />
                     <Typography variant="body2">
                        {boardinghouse.popularity ?? 0} stars
                     </Typography>
                  </Box>
               }
               action={
                  isLoggedIn.isLoggedIn && (
                     <AddBookmarkButton
                        boardinghouseId={boardinghouse.id}
                        boardinghouseName={boardinghouse.name}
                        bookmarkType={"boardinghouse"}
                        isBookmarked={isBookmarked}
                        setIsBookmarked={setIsBookmarked}
                     />
                  )
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
      </Grid>
   );
};

export default BoardingHouseCard;
