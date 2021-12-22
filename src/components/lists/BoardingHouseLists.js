import React from "react";
import Grid from "@mui/material/Grid";
import useFetch from "../../hooks/useFetch";
import BoardingHouseCard from "../cards/BoardingHouseCard";
import LoadingState from "../../components/LoadingState";
import Typography from "@mui/material/Typography";

const BoardingHouseLists = () => {
  const {
    data: boardinghouses,
    isPending,
    error,
  } = useFetch("https://api-searchnstay.herokuapp.com/api/boarding-houses");

  return (
    <Grid container spacing={1}>
      {error && (
        <Typography variant="body1" color="initial" align="center">
          {error}
        </Typography>
      )}
      {isPending && <LoadingState loadWhat="Boarding Houses" />}
      {boardinghouses &&
        boardinghouses.map((boardinghouse) => (
          <BoardingHouseCard key={boardinghouse.id} data={boardinghouse} />
        ))}
    </Grid>
  );
};

export default BoardingHouseLists;
