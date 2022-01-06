import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import RoomCard from "../cards/RoomCard";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadingState from "../../components/LoadingState";
import Masonry from "@mui/lab/Masonry";

const Rooms = () => {
  const { bhId } = useParams();
  const {
    data: rooms,
    isPending,
    error,
  } = useFetch(`http://localhost:3500/api/rooms/all/${bhId}`);

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
      {error && (
        <Typography variant="caption" align="center">
          Error. {error}
        </Typography>
      )}
      {isPending && <LoadingState loadWhat="rooms" />}

      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 2 }} spacing={1}>
        {rooms && rooms.map((room) => <RoomCard key={room.id} room={rooms} />)}
      </Masonry>
    </Container>
  );
};

export default Rooms;
