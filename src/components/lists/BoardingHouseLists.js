import React from "react";
import useFetch from "../../hooks/useFetch";
import BoardingHouseCard from "../cards/BoardingHouseCard";
import LoadingState from "../../components/LoadingState";
import Typography from "@mui/material/Typography";
import Masonry from "@mui/lab/Masonry";
import { Box } from "@mui/material";

const BoardingHouseLists = () => {
  const {
    data: boardinghouses,
    isPending,
    error,
  } = useFetch("http://localhost:3500/api/boarding-houses");

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Grid container spacing={1}> */}
      {error && (
        <Typography variant="body1" color="initial" align="center">
          {error}
        </Typography>
      )}
      {isPending && <LoadingState loadWhat="Boarding Houses" />}
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 2 }} spacing={1}>
        {boardinghouses &&
          boardinghouses.map((boardinghouse) => (
            <BoardingHouseCard
              key={boardinghouse.id}
              boardinghouse={boardinghouse}
            />
          ))}
      </Masonry>
      {/* </Grid> */}
    </Box>
  );
};

export default BoardingHouseLists;
