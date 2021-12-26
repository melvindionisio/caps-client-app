import React from "react";
import Container from "@mui/material/Container";
// import RoomCard from "../cards/RoomCard";

const Rooms = () => {
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
      This is the rooms from this boarding house
      {/* <RoomCard /> */}
    </Container>
  );
};

export default Rooms;
