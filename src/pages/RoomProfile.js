import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { domain } from "../fetch-url/fetchUrl";
import ReusableNavigation from "../components/Navigations/ReusableNavigation";
import {
   Slide,
   Container,
   Typography,
   ListItem,
   ListItemAvatar,
   Avatar,
   ListItemText,
   CardMedia,
   Card,
   CardHeader,
   CardActionArea,
   Grid,
   Box,
   IconButton,
   Modal,
   Backdrop,
   Fade,
   Chip,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { lightBlue, red, green, orange } from "@mui/material/colors";
import AddBookmarkButton from "../components/AddBookmarkButton";
import LoadingState from "../components/LoadingState";
import DetailsCard from "../components/cards/DetailsCard";
import { LoginContext } from "../contexts/LoginContext";
import HouseIcon from "@mui/icons-material/House";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseOutlined from "@mui/icons-material/CloseOutlined";

const InfoItem = ({ icon, primaryText, secondaryText }) => {
   return (
      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
         <ListItemAvatar>
            <Avatar sx={{ background: lightBlue[500] }}>{icon}</Avatar>
         </ListItemAvatar>
         <ListItemText
            primary={primaryText}
            secondary={secondaryText}
            sx={{
               ".MuiListItemText-primary": {
                  fontFamily: "Quicksand",
               },
            }}
         />
      </ListItem>
   );
};
const RoomProfile = (props) => {
   const { roomId } = useParams();
   const [room, setRoom] = useState(null);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);
   const [isBookmarked, setIsBookmarked] = useState(false);
   const [boardinghouse, setBoardinghouse] = useState();
   const [isBoardinghousePending, setBoardinghouseIsPending] = useState(false);
   const { isLoggedIn, currentUser } = useContext(LoginContext);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const handleModalClose = () => {
      setIsModalOpen(false);
   };

   const [genderAllowed, setGenderAllowed] = useState(null);
   const [roomDescription, setRoomDescription] = useState(null);

   useEffect(() => {
      const abortCont = new AbortController();
      fetch(`${domain}/api/rooms/${roomId}`, { signal: abortCont.signal })
         .then((res) => res.json())
         .then((data) => {
            setRoom(data);

            setIsPending(false);
            setError(null);
            setBoardinghouseIsPending(true);

            let genderAllowed = data.genderAllowed;
            let genderAllowedArr = genderAllowed?.split("/");
            setGenderAllowed(genderAllowedArr);

            let roomDescription = data.description;
            let roomDescriptionArr = roomDescription?.split("/");
            setRoomDescription(roomDescriptionArr);

            fetch(`${domain}/api/boarding-houses/${data.boardinghouseId}`)
               .then((res) => res.json())
               .then((data) => {
                  setBoardinghouse(data);
                  setBoardinghouseIsPending(false);
               })
               .catch((err) => console.log(err));
         })
         .catch((err) => {
            console.log(err);
            setError(err);
            setIsPending(false);
            setRoom(null);
         });
   }, [roomId]);

   useEffect(() => {
      const abortCont = new AbortController();
      //CHECK IF THE BOARDINGHOUSE IS EXISTING IN BOOKMARKS
      fetch(
         `${domain}/api/bookmarks/room/isbookmarked/${roomId}/${currentUser.id}`,
         {
            signal: abortCont.signal,
         }
      )
         .then((res) => res.json())
         .then((data) => {
            setIsBookmarked(data.isBookmarked);
            console.log("Fetch bookmark status");
         })
         .catch((err) => console.log(err));
      return () => {
         abortCont.abort();
      };
   }, [roomId, currentUser]);

   return (
      <Slide in={true} direction="up">
         <Container
            maxWidth="xl"
            disableGutters
            sx={{
               height: "100vh",
               overflow: "hidden",
            }}
         >
            {error && (
               <Typography variant="body1" align="center">
                  {error}
               </Typography>
            )}
            {isPending && <LoadingState loadWhat="Room" />}
            {room && (
               <>
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
                              <Card>
                                 <CardMedia
                                    component="img"
                                    width="400"
                                    alt="room-image"
                                    image={room.picture}
                                 />
                              </Card>
                           </Box>
                        </Container>
                     </Fade>
                  </Modal>
                  <ReusableNavigation spaceCenter={true}>
                     <Box
                        sx={{
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "center",
                        }}
                     >
                        <Typography variant="body1" align="center">
                           {room.name}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontSize: 12 }}>
                           {boardinghouse && boardinghouse.name}
                        </Typography>
                     </Box>

                     {isLoggedIn.isLoggedIn ? (
                        <AddBookmarkButton
                           roomId={room.id}
                           roomName={room.name}
                           bookmarkType={"room"}
                           isBookmarked={isBookmarked}
                           setIsBookmarked={setIsBookmarked}
                        />
                     ) : (
                        <IconButton sx={{ opacity: 0 }}>
                           <LocationOnIcon />
                        </IconButton>
                     )}
                  </ReusableNavigation>
                  <Box
                     sx={{
                        height: "100vh",
                        overflowY: "auto",
                        paddingBottom: "5rem",
                     }}
                  >
                     <Card
                        sx={{ borderRadius: 0, position: "relative" }}
                        onClick={() => setIsModalOpen(true)}
                     >
                        <CardActionArea>
                           <CardMedia
                              component="img"
                              height="250"
                              alt="room-image"
                              //image="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2057&q=80"
                              image={room.picture}
                           />
                        </CardActionArea>

                        <Box
                           style={{
                              position: "absolute",
                              bottom: 10,
                              left: 15,
                           }}
                           sx={{
                              display: "flex",
                              gap: 2,
                           }}
                        >
                           <CardHeader
                              sx={{
                                 padding: 1,
                                 pr: 3,
                                 pl: 2,
                                 background: "#fff",
                                 borderRadius: 2,
                                 boxShadow: "2px 2px 8px rgba(0,0,0,0.4)",
                              }}
                              title={
                                 <Typography
                                    variant="h6"
                                    sx={
                                       room.status.toLowerCase() === "available"
                                          ? {
                                               textTransform: "uppercase",
                                               fontFamily: "Quicksand",
                                               "&::before": {
                                                  content: '" "',
                                                  height: 10,
                                                  mr: 1.5,
                                                  mb: 0.3,
                                                  borderRadius: "50%",
                                                  display: "inline-block",
                                                  width: 10,
                                                  background: green[500],
                                                  boxShadow: `0px 0px 3px 3px ${green[100]}`,
                                               },
                                            }
                                          : {
                                               textTransform: "uppercase",
                                               fontFamily: "Quicksand",
                                               "&::before": {
                                                  content: '" "',
                                                  height: 10,
                                                  mr: 1.5,
                                                  mb: 0.3,
                                                  borderRadius: "50%",
                                                  display: "inline-block",
                                                  width: 10,
                                                  background: red[500],
                                                  boxShadow: `0px 0px 3px 3px ${red[100]}`,
                                               },
                                            }
                                    }
                                 >
                                    {room.name}
                                 </Typography>
                              }
                           />

                           <Box
                              sx={{
                                 background: orange[100],
                                 borderRadius: 10,
                                 boxShadow: "2px 2px 8px rgba(0,0,0,0.4)",
                                 px: 2,
                                 display: "flex",
                                 justifyContent: "center",
                                 alignItems: "center",
                                 color: orange[700],
                                 fontWeight: "bold",
                                 fontFamily: "Quicksand",
                                 fontSize: 18,
                              }}
                           >
                              <span
                                 style={{
                                    marginRight: 8,
                                 }}
                              >
                                 ₱
                              </span>
                              <span>{room.price || 0}</span>
                           </Box>

                           <Box
                              sx={{
                                 py: 1,
                                 fontFamily: "Quicksand",
                                 display: "flex",
                                 flexWrap: "wrap",
                                 gap: 1,
                              }}
                           >
                              {genderAllowed &&
                                 genderAllowed.map((gender, index) => (
                                    <Chip
                                       icon={<CheckCircleIcon />}
                                       label={gender}
                                       color="primary"
                                       size="large"
                                       key={index}
                                    />
                                 ))}
                           </Box>
                        </Box>
                     </Card>
                     <Container
                        maxWidth="sm"
                        disableGutters
                        sx={{
                           padding: 2,
                           paddingBottom: "8rem",
                        }}
                     >
                        <DetailsCard
                           title="Description "
                           colors="orange"
                           sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 1,
                              paddingBottom: 6,
                           }}
                        >
                           {roomDescription &&
                              roomDescription.map((description, index) => (
                                 <Chip
                                    icon={<CheckCircleIcon />}
                                    label={description}
                                    size="medium"
                                    key={index}
                                    color="primary"
                                    variant="outlined"
                                    sx={{ mr: 1 }}
                                 />
                              ))}
                        </DetailsCard>

                        {isBoardinghousePending && <LoadingState />}
                        {boardinghouse && (
                           <>
                              <Grid container spacing={1}>
                                 <Grid item xs={4}>
                                    <DetailsCard title="Beds" colors="blue">
                                       <Typography
                                          variant="body1"
                                          color="text.secondary"
                                          align="center"
                                          sx={{
                                             fontSize: 45,
                                             fontWeight: "bold",
                                          }}
                                       >
                                          {room.totalSlots}
                                       </Typography>
                                    </DetailsCard>
                                 </Grid>
                                 <Grid item xs={4}>
                                    <DetailsCard title="Occupied">
                                       <Typography
                                          variant="body1"
                                          color="text.secondary"
                                          align="center"
                                          sx={{
                                             fontSize: 45,
                                             fontWeight: "bold",
                                          }}
                                       >
                                          {room.occupiedSlots}
                                       </Typography>
                                    </DetailsCard>
                                 </Grid>
                                 <Grid item xs={4}>
                                    <DetailsCard
                                       title="Available"
                                       colors="green"
                                    >
                                       <Typography
                                          variant="body1"
                                          color="text.secondary"
                                          align="center"
                                          sx={{
                                             fontSize: 45,
                                             fontWeight: "bold",
                                          }}
                                       >
                                          {room.totalSlots - room.occupiedSlots}
                                       </Typography>
                                    </DetailsCard>
                                 </Grid>
                              </Grid>

                              <DetailsCard title="Boarding house">
                                 <Link
                                    to={`/boardinghouse/${boardinghouse.id}`}
                                 >
                                    <InfoItem
                                       primaryText={boardinghouse.name}
                                       icon={<HouseIcon />}
                                    />
                                 </Link>
                              </DetailsCard>
                              <DetailsCard title="Address">
                                 <InfoItem
                                    primaryText={boardinghouse.completeAddress}
                                    icon={<LocationOnIcon />}
                                 />
                              </DetailsCard>
                              <DetailsCard title="Room Type">
                                 <InfoItem
                                    primaryText={room.type}
                                    icon={<BedroomParentIcon />}
                                 />
                              </DetailsCard>
                           </>
                        )}
                     </Container>
                  </Box>
               </>
            )}
         </Container>
      </Slide>
   );
};
export default RoomProfile;
