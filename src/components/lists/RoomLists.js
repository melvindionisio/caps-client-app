import React from "react";
//import Masonry from "@mui/lab/Masonry";
import SimpleRoomCard from "../cards/SimpleRoomCard";
import useFetch from "../../hooks/useFetch";
import Typography from "@mui/material/Typography";
import LoadingState from "../../components/LoadingState";
import { Box, Grid } from "@mui/material";
import { domain } from "../../fetch-url/fetchUrl";

const RoomLists = () => {
   const { data: rooms, isPending, error } = useFetch(`${domain}/api/rooms`);
   return (
      <Box sx={{ width: "100%" }}>
         <Grid container spacing={2}>
            {error && (
               <Typography variant="caption" align="center">
                  Error. {error}
               </Typography>
            )}
            {isPending && <LoadingState loadWhat="boardinghouses" />}

            {/*
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 2 }} spacing={2}>
                */}
            {rooms &&
               rooms.map((room) => (
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
