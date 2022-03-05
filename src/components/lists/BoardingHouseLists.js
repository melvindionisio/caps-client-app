import React, { useState, useEffect } from "react";
//import useFetch from "../../hooks/useFetch";
import BoardingHouseCard from "../cards/BoardingHouseCard";
import LoadingState from "../../components/LoadingState";
import Typography from "@mui/material/Typography";
//import Masonry from "@mui/lab/Masonry";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
//import WcIcon from "@mui/icons-material/Wc";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { domain } from "../../fetch-url/fetchUrl";
import {
   ToggleButton,
   Button,
   Divider,
   Box,
   Grid,
   ToggleButtonGroup,
   Zoom,
} from "@mui/material";

const BoardingHouseLists = () => {
   //const {
   //data: boardinghouses,
   //isPending,
   //error,
   //} = useFetch(`${domain}/api/boarding-houses`);

   const [boardinghouses, setBoardinghouses] = useState([]);
   const [isEmpty, setIsEmpty] = useState(false);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);
   const [sort, setSort] = useState("bh_popularity");
   const [sortType, setSortType] = useState("desc");
   const [genderFilter, setGenderFilter] = useState("Male/Female");
   const [zoneFilter, setZoneFilter] = useState("All");

   const [isFilterActive, setIsFilterActive] = useState(false);
   const [isSortActive, setIsSortActive] = useState(false);

   const handleChangeZoneFilter = (event, newZoneFilter) => {
      setZoneFilter(newZoneFilter);
      setIsEmpty(false);
   };
   const handleChangeGenderFilter = (event, newGenderFilter) => {
      setGenderFilter(newGenderFilter);
   };
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
               `${domain}/api/boarding-houses/?sort=${sort}&sortType=${sortType}&gender=${genderFilter}&zone=${zoneFilter}`,
               { signal: abortCont.signal }
            )
               .then((res) => {
                  if (!res.ok) {
                     throw Error("Something went wrong!");
                  }
                  return res.json();
               })
               .then((data) => {
                  if (data.length <= 0) {
                     setIsEmpty(true);
                  }
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
   }, [sort, sortType, genderFilter, zoneFilter]);

   return (
      <Box sx={{ width: "100%" }}>
         <Box
            sx={{ display: "flex", gap: 1, mb: 1, justifyContent: "flex-end" }}
         >
            <Button
               variant="outlined"
               size="small"
               startIcon={
                  !isSortActive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
               }
               onClick={() => {
                  setIsSortActive(!isSortActive);
                  setIsFilterActive(false);
               }}
               color={!isSortActive ? "primary" : "secondary"}
               disableElevation
            >
               Sort
            </Button>
            <Button
               variant="outlined"
               size="small"
               onClick={() => {
                  setIsFilterActive(!isFilterActive);
                  setIsSortActive(false);
               }}
               color={!isFilterActive ? "primary" : "secondary"}
               disableElevation
               startIcon={
                  !isFilterActive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
               }
            >
               Filter
            </Button>
         </Box>
         <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
               {isSortActive && (
                  <Zoom in={true}>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           mb: 1,
                        }}
                     >
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
                           <ToggleButton
                              value="bh_name"
                              aria-label="sortbyname"
                           >
                              Name
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
                  </Zoom>
               )}
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
               {isFilterActive && (
                  <Zoom in={true} direction="left">
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           mb: 1,
                        }}
                     >
                        <ToggleButtonGroup
                           color="primary"
                           aria-label="gender-sort"
                           value={genderFilter}
                           size="small"
                           exclusive
                           onChange={handleChangeGenderFilter}
                        >
                           <ToggleButton
                              value="Male/Female"
                              aria-label="sortbyall"
                           >
                              All
                           </ToggleButton>
                           <ToggleButton value="Male" aria-label="sortbymale">
                              <MaleIcon />
                           </ToggleButton>
                           <ToggleButton
                              value="Female"
                              aria-label="sortbyfemale"
                           >
                              <FemaleIcon />
                           </ToggleButton>
                        </ToggleButtonGroup>

                        <ToggleButtonGroup
                           color="primary"
                           aria-label="gender-sort"
                           value={zoneFilter}
                           size="small"
                           exclusive
                           onChange={handleChangeZoneFilter}
                        >
                           <ToggleButton value="All" aria-label="all-zone">
                              All
                           </ToggleButton>
                           <ToggleButton value="Zone 1" aria-label="zone1">
                              Zone 1
                           </ToggleButton>
                           <ToggleButton value="Zone 2" aria-label="zone2">
                              Zone 2
                           </ToggleButton>
                           <ToggleButton value="Zone 3" aria-label="zone3">
                              Zone 3
                           </ToggleButton>
                        </ToggleButtonGroup>
                     </Box>
                  </Zoom>
               )}
            </Grid>
         </Grid>
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
            {isEmpty && (
               <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ width: "100%", mt: 4 }}
               >
                  {zoneFilter} is Empty!
               </Typography>
            )}
            {/*</Masonry>*/}
         </Grid>
      </Box>
   );
};

export default BoardingHouseLists;
