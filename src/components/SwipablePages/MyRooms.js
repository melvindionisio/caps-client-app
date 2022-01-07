import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadingState from "../../components/LoadingState";
import Masonry from "@mui/lab/Masonry";
import SimpleRoomCard from "../../components/cards/SimpleRoomCard";
import { domain } from "../../fetch-url/fetchUrl";

const Rooms = ({ bhName }) => {
  const { bhId } = useParams();
  const {
    data: rooms,
    isPending,
    error,
  } = useFetch(`${domain}/api/rooms/all/${bhId}`);

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

      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 2 }} spacing={2}>
        {rooms &&
          rooms.map((room) => (
            <SimpleRoomCard key={room.id} room={room} bhName={bhName} />
          ))}
      </Masonry>
    </Container>
  );
};

export default Rooms;
