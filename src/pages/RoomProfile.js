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
} from "@mui/material";
import { lightBlue, green } from "@mui/material/colors";
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

   useEffect(() => {
      const abortCont = new AbortController();
      fetch(`${domain}/api/rooms/${roomId}`, { signal: abortCont.signal })
         .then((res) => res.json())
         .then((data) => {
            setRoom(data);
            setIsPending(false);
            setError(null);
            setBoardinghouseIsPending(true);
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

                     {isLoggedIn ? (
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

                        <CardHeader
                           sx={{
                              background: "#fff",
                              borderRadius: 10,
                              padding: 1,
                              px: 3,
                              boxShadow: "2px 2px 8px rgba(0,0,0,0.4)",
                           }}
                           style={{
                              position: "absolute",
                              bottom: 10,
                              left: 15,
                           }}
                           title={
                              <Typography
                                 variant="h6"
                                 sx={{
                                    textTransform: "uppercase",
                                    fontFamily: "Quicksand",
                                 }}
                              >
                                 {room.name}
                              </Typography>
                           }
                        />
                     </Card>
                     <Container
                        maxWidth="sm"
                        disableGutters
                        sx={{
                           padding: 2,
                           paddingBottom: "8rem",
                        }}
                     >
                        <Typography variant="body1">
                           STATUS:{" "}
                           <Typography
                              variant="caption"
                              sx={{
                                 color: green[500],
                                 fontWeight: "bold",
                                 fontSize: 16,
                                 textTransform: "uppercase",
                              }}
                           >
                              {room.status}
                           </Typography>
                        </Typography>

                        <Typography
                           align="center"
                           variant="body1"
                           sx={{ py: 2, fontStyle: "italic" }}
                        >
                           {room.description}
                        </Typography>

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
                              <DetailsCard title="Gender Allowed">
                                 <InfoItem primaryText={room.genderAllowed} />
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
