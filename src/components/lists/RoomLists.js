import React from "react";
// import Grid from "@mui/material/Grid";
import Masonry from "@mui/lab/Masonry";
import RoomCard from "../cards/RoomCard";
import useFetch from "../../hooks/useFetch";
import Typography from "@mui/material/Typography";
import LoadingState from "../../components/LoadingState";
import { Box } from "@mui/material";

const RoomLists = () => {
  const {
    data: boardinghouses,
    isPending,
    error,
  } = useFetch(
    "https://my-json-server.typicode.com/melvindionisio/bhfinder-api/boardingHouse"
  );

  return (
    <Box sx={{ width: "100%" }}>
      {/* // <Grid container spacing={1}> */}
      {error && (
        <Typography variant="caption" align="center">
          Error. {error}
        </Typography>
      )}
      {isPending && <LoadingState loadWhat="boardinghouses" />}

      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 2 }} spacing={1}>
        {boardinghouses &&
          boardinghouses
            .map((bh) => bh.room)
            .map((rooms) => rooms.filter((room) => room.isAvailable))
            .map((availRooms) => availRooms)
            .reduce((availRoomsTrue, availRoom) => [
              ...availRoom,
              ...availRoomsTrue,
            ])

            .map((availableRooms, index) => (
              <RoomCard key={index} room={availableRooms} />
            ))}
      </Masonry>
      {/* </Grid> */}
    </Box>
  );
};

export default RoomLists;
