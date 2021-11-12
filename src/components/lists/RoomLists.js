import React from "react";
import Grid from "@mui/material/Grid";
// import Masonry from "@mui/lab/Masonry";

import RoomCard from "../cards/RoomCard";

const RoomLists = ({ rooms }) => {
  return (
    <Grid container spacing={1}>
      {/*  <Masonry columns={{ xs: 1, sm: 2, lg: 3 }} spacing={1}> */}
      {rooms &&
        rooms.map((room, index) => (
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <RoomCard key={index} room={room} />
          </Grid>
        ))}
      {/* </Masonry> */}
    </Grid>
  );
};

export default RoomLists;
