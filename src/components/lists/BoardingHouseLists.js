import React from "react";
import Grid from "@mui/material/Grid";

import BoardingHouseCard from "../cards/BoardingHouseCard";

const owners = [
  {
    name: "House-1",
    address: "Brgy Sabang Tabok Lavezares Northern Samar",
    contact: "0951809269",
    popularity: 200,
  },
  {
    name: "House-2",
    address: "Brgy Sabang Tabok Lavezares Northern Samar",
    contact: "0951809269",
    popularity: 200,
  },
  {
    name: "House-3",
    address: "Brgy Sabang Tabok Lavezares Northern Samar",
    contact: "0951809269",
    popularity: 200,
  },
  {
    name: "House-3",
    address: "Brgy Sabang Tabok Lavezares Northern Samar",
    contact: "0951809269",
    popularity: 200,
  },
];

const BoardingHouseLists = () => {
  return (
    <Grid container spacing={1}>
      {owners.map((house) => (
        <BoardingHouseCard key={house.name} data={house} />
      ))}
    </Grid>
  );
};

export default BoardingHouseLists;
