import React from "react";
import Grid from "@mui/material/Grid";

import RoomCard from "../cards/RoomCard";

const RoomLists = ({ rooms }) => {
  return (
    <Grid container spacing={1}>
      {rooms &&
        rooms.map((room) => (
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <RoomCard room={room} />
          </Grid>
        ))}
    </Grid>
  );
};

export default RoomLists;
