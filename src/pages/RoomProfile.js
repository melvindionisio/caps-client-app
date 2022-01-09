import React from "react";
import { useParams } from "react-router-dom";
import { domain } from "../fetch-url/fetchUrl";
import useFetch from "../hooks/useFetch";
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
} from "@mui/material";
import { lightBlue, green } from "@mui/material/colors";
import AddBookmarkButton from "../components/AddBookmarkButton";
import LoadingState from "../components/LoadingState";
import DetailsCard from "../components/cards/DetailsCard";

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

   const {
      data: room,
      isPending,
      error,
   } = useFetch(`${domain}/api/rooms/${roomId}`);

   return (
      <Slide in={true} direction="up">
         <Container
            maxWidth="lg"
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
                  <ReusableNavigation spaceCenter={true}>
                     <Typography variant="body1" align="center">
                        {room.name}
                     </Typography>
                     <AddBookmarkButton />
                  </ReusableNavigation>

                  <Card sx={{ borderRadius: 0, position: "relative" }}>
                     <CardMedia
                        component="img"
                        height="200"
                        alt="room-image"
                        image="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2057&q=80"
                     />
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
                        paddingBottom: "5rem",
                     }}
                  >
                     <Typography
                        variant="body1"
                        sx={{
                           marginBottom: 1,
                        }}
                     >
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
                           Available
                        </Typography>
                     </Typography>
                     <DetailsCard title="Room Type">
                        <InfoItem primaryText={room.type} />
                     </DetailsCard>
                     <DetailsCard title="Gender Allowed">
                        <InfoItem primaryText={room.genderAllowed} />
                     </DetailsCard>
                  </Container>
               </>
            )}
         </Container>
      </Slide>
   );
};
export default RoomProfile;
