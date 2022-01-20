import React, { useState, useEffect } from "react";
//import useFetch from "../../hooks/useFetch";
import BoardingHouseCard from "../cards/BoardingHouseCard";
import LoadingState from "../../components/LoadingState";
import Typography from "@mui/material/Typography";
//import Masonry from "@mui/lab/Masonry";
import { domain } from "../../fetch-url/fetchUrl";
import {
   ToggleButton,
   Divider,
   Box,
   Grid,
   ToggleButtonGroup,
} from "@mui/material";

const BoardingHouseLists = () => {
   //const {
   //data: boardinghouses,
   //isPending,
   //error,
   //} = useFetch(`${domain}/api/boarding-houses`);

   const [boardinghouses, setBoardinghouses] = useState([]);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);
   const [sort, setSort] = useState("bh_popularity");
   const [sortType, setSortType] = useState("desc");

   const handleChangeSort = (event, newSort) => {
      setSort(newSort);
   };
   const handleChangeSortType = (event, newSortType) => {
      setSortType(newSortType);
   };

   useEffect(() => {
      // will fetch depending in the sort here
      setIsPending(true);
      if (sort && sortType) {
         const abortCont = new AbortController();
         setBoardinghouses(null);
         setTimeout(() => {
            fetch(
               `${domain}/api/boarding-houses/?sort=${sort}&sortType=${sortType}`,
               { signal: abortCont.signal }
            )
               .then((res) => {
                  if (!res.ok) {
                     throw Error("Something went wrong!");
                  }
                  return res.json();
               })
               .then((data) => {
                  setBoardinghouses(data);
                  setIsPending(false);
                  setError(null);
               })
               .catch((err) => {
                  if (err.name === "AbortError") {
                     console.log("fetch aborted");
                  } else {
                     setIsPending(false);
                     setError(err.message);
                     setBoardinghouses(null);
                  }
               });
         }, 0);
         return () => {
            abortCont.abort();
         };
      }
   }, [sort, sortType]);

   return (
      <Box sx={{ width: "100%" }}>
         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <ToggleButtonGroup
               color="primary"
               aria-label="sort"
               value={sort}
               size="small"
               exclusive
               onChange={handleChangeSort}
            >
               <ToggleButton
                  value="bh_popularity"
                  aria-label="sortbypopularity"
               >
                  Popularity
               </ToggleButton>
               <ToggleButton value="bh_name" aria-label="sortbyname">
                  Name
               </ToggleButton>
               <ToggleButton value="price_range" aria-label="sortbyprice">
                  Price
               </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
               color="primary"
               aria-label="sort"
               value={sortType}
               size="small"
               exclusive
               onChange={handleChangeSortType}
            >
               <ToggleButton value="asc" aria-label="sortbystar">
                  ASC
               </ToggleButton>
               <ToggleButton value="desc" aria-label="sortbyname">
                  DESC
               </ToggleButton>
            </ToggleButtonGroup>
         </Box>
         <Divider sx={{ mb: 1 }} />
         <Grid container spacing={2}>
            {error && (
               <Typography variant="body1" color="initial" align="center">
                  {error}
               </Typography>
            )}
            {isPending && <LoadingState loadWhat="Boarding Houses" />}
            {/*<Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 2 }} spacing={2}>*/}
            {boardinghouses &&
               boardinghouses.map((boardinghouse) => (
                  <BoardingHouseCard
                     key={boardinghouse.id}
                     boardinghouse={boardinghouse}
                  />
               ))}
            {/*</Masonry>*/}
         </Grid>
      </Box>
   );
};

export default BoardingHouseLists;
