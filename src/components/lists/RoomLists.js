import React from "react";
//import Masonry from "@mui/lab/Masonry";
import SimpleRoomCard from "../cards/SimpleRoomCard";
import useFetch from "../../hooks/useFetch";
import Typography from "@mui/material/Typography";
import LoadingState from "../../components/LoadingState";
import { green } from "@mui/material/colors";
import { Box, Grid } from "@mui/material";
import { domain } from "../../fetch-url/fetchUrl";
import { useState, useEffect } from "react";

const RoomLists = () => {
   const { data: rooms, isPending, error } = useFetch(`${domain}/api/rooms`);
   const { data: totalRooms } = useFetch(`${domain}/api/rooms/total-rooms`);
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
      <Box sx={{ width: "100%" }}>
         {totalRooms && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
               <Typography
                  variant="caption"
                  color="text.secondary"
                  component="p"
                  sx={{
                     fontWeight: "bold",
                     border: ` 1px solid ${green[500]}`,
                     background: green[50],
                     px: 2,
                     py: 1,
                     borderRadius: 1,
                     display: "inline-block",
                     mb: 1,
                  }}
               >
                  Total rooms: {"  "}
                  {totalRooms.total}
               </Typography>
            </Box>
         )}
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
               <Typography variant="caption" align="center">
                  Error. {error}
               </Typography>
            )}
            {isPending && <LoadingState loadWhat="rooms" />}

            {/*
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 2 }} spacing={2}>
                */}
            {thisRooms &&
               thisRooms.map((room) => (
                  <SimpleRoomCard key={room.id} room={room} />
               ))}

            {/*
            </Masonry>
                */}
         </Grid>
      </Box>
   );
};

export default RoomLists;
