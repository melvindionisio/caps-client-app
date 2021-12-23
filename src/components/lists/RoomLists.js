import React from "react";
import Grid from "@mui/material/Grid";
// import Masonry from "@mui/lab/Masonry";
import RoomCard from "../cards/RoomCard";
import useFetch from "../../hooks/useFetch";
import Typography from "@mui/material/Typography";
import LoadingState from "../../components/LoadingState";

const RoomLists = ({ boardingHouses }) => {
  const {
    data: boardinghouses,
    isPending,
    error,
  } = useFetch(
    "https://my-json-server.typicode.com/melvindionisio/bhfinder-api/boardingHouse"
  );

  return (
    <>
      <Grid container spacing={1}>
        {/* <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 3 }} spacing={1}> */}
        {error && (
          <Typography variant="caption" align="center">
            Error. {error}
          </Typography>
        )}
        {isPending && <LoadingState loadWhat="boardinghouses" />}
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
              <Grid item xl={6} lg={6} md={4} sm={6} xs={12} key={index}>
                <RoomCard key={index} room={availableRooms} />
              </Grid>
            ))}
        {/* </Masonry> */}
      </Grid>
    </>
  );
};

export default RoomLists;
