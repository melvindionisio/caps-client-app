import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadingState from "../../components/LoadingState";
//import Masonry from "@mui/lab/Masonry";
import SimpleRoomCard from "../../components/cards/SimpleRoomCard";
import { domain } from "../../fetch-url/fetchUrl";
import { useEffect, useState } from "react";

const Rooms = ({ bhName }) => {
   const { bhId } = useParams();
   const {
      data: rooms,
      isPending,
      error,
   } = useFetch(`${domain}/api/rooms/all/${bhId}`);

   const [thisRooms, setThisRooms] = useState([]);
   const [isRoomsEmpty, setIsRoomsEmpty] = useState(false);

   useEffect(() => {
      if (rooms) {
         if (rooms.length <= 0) {
            setIsRoomsEmpty(true);
         } else {
            setIsRoomsEmpty(false);
            setThisRooms(rooms);
         }
      }
   }, [rooms]);

   return (
      <Container
         maxWidth="md"
         disableGutters
         sx={{
            padding: 2,
            paddingBottom: "5rem",
            height: "85vh",
            overflowY: "auto",
         }}
      >
         {isRoomsEmpty && (
            <Typography
               variant="body1"
               align="center"
               sx={{ py: 3, color: "text.secondary" }}
            >
               Rooms is empty!
            </Typography>
         )}
         <Grid container spacing={2}>
            {error && (
               <Typography variant="body2" align="center">
                  Error. {error}
               </Typography>
            )}
            {isPending && <LoadingState loadWhat="rooms" />}

            {/*<Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 2 }} spacing={2}>*/}
            {thisRooms &&
               thisRooms.map((room) => (
                  <SimpleRoomCard key={room.id} room={room} />
               ))}
            {/*</Masonry>*/}
         </Grid>
      </Container>
   );
};

export default Rooms;
