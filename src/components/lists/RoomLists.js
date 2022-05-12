import React from "react";
//import Masonry from "@mui/lab/Masonry";
import SimpleRoomCard from "../cards/SimpleRoomCard";
import Typography from "@mui/material/Typography";
import LoadingState from "../../components/LoadingState";
import { green } from "@mui/material/colors";
import {
   ToggleButton,
   ToggleButtonGroup,
   Zoom,
   Divider,
   Button,
   Box,
   Grid,
   MenuItem,
   FormControl,
   InputLabel,
   Select,
} from "@mui/material";
import { useState, useEffect } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const RoomLists = ({
   rooms,
   isPending,
   error,
   isEmpty,
   setIsEmpty,
   sort,
   setSort,
   sortType,
   setSortType,
   genderFilter,
   setGenderFilter,
}) => {
   const [thisRooms, setThisRooms] = useState([]);

   const [isFilterActive, setIsFilterActive] = useState(false);
   const [isSortActive, setIsSortActive] = useState(false);

   // const prices = [];

   const expectedPrices = [
      {
         price: 300,
      },
      {
         price: 400,
      },
      {
         price: 500,
      },

      {
         price: 600,
      },
      {
         price: 700,
      },
      {
         price: 800,
      },

      {
         price: 900,
      },
      {
         price: 1000,
      },
      {
         price: 1100,
      },
      {
         price: 1200,
      },
      {
         price: 1300,
      },
      {
         price: 1400,
      },
      {
         price: 1500,
      },
      {
         price: 1600,
      },
      {
         price: 1700,
      },
      {
         price: 1800,
      },
      {
         price: 1900,
      },
      {
         price: 2000,
      },
      {
         price: 2100,
      },
      {
         price: 2200,
      },
      {
         price: 2300,
      },
      {
         price: 2400,
      },
      {
         price: 2500,
      },
   ];

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
      if (rooms) {
         setThisRooms(rooms);
         // rooms.map((room) => {
         //    if (room.price !== null) {
         //       prices.push(room.price);
         //    }
         // });
         // setPriceTo(() => Math.max(...prices));
      }
   }, [rooms]);

   const [priceFrom, setPriceFrom] = useState(0);
   const [priceTo, setPriceTo] = useState(2500);

   const handlePriceFromChange = (event) => {
      setPriceFrom(event.target.value);
   };

   const handlePriceToChange = (event) => {
      setPriceTo(event.target.value);
   };

   useEffect(() => {
      console.log(priceFrom, priceTo);
      //filter the setThisRooms
   }, [priceFrom, priceTo]);

   return (
      <Box sx={{ width: "100%" }}>
         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {rooms && (
               <Box sx={{ display: "flex" }}>
                  <Typography
                     variant="caption"
                     color="text.secondary"
                     component="p"
                     sx={{
                        fontWeight: "bold",
                        border: ` 1px solid ${green[500]}`,
                        background: green[50],
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                        display: "inline-block",
                        mb: 1,
                     }}
                  >
                     Total rooms: {"  "}
                     {rooms.length}
                  </Typography>
               </Box>
            )}
            <Box
               sx={{
                  display: "flex",
                  gap: 1,
                  mb: 1,
               }}
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
                     !isFilterActive ? (
                        <ArrowDropUpIcon />
                     ) : (
                        <ArrowDropDownIcon />
                     )
                  }
               >
                  Filter
               </Button>
            </Box>
         </Box>
         <Divider sx={{ mb: 1 }} />

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
                           <ToggleButton value="price" aria-label="sortbyprice">
                              Price
                           </ToggleButton>
                           <ToggleButton
                              value="room_name"
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
                           alignItems: "center",
                           mb: 1,
                        }}
                     >
                        <Box>
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
                              <ToggleButton
                                 value="Male"
                                 aria-label="sortbymale"
                              >
                                 <MaleIcon />
                              </ToggleButton>
                              <ToggleButton
                                 value="Female"
                                 aria-label="sortbyfemale"
                              >
                                 <FemaleIcon />
                              </ToggleButton>
                           </ToggleButtonGroup>
                        </Box>
                        <Box>
                           <FormControl sx={{ m: 1, minWidth: 120 }}>
                              <InputLabel id="price-from-label">
                                 From
                              </InputLabel>
                              <Select
                                 labelId="price-from-label"
                                 id="price-from"
                                 value={priceFrom}
                                 label="From"
                                 onChange={handlePriceFromChange}
                                 size="small"
                              >
                                 <MenuItem
                                    dense={true}
                                    value={priceFrom}
                                    sx={{ display: "flex", gap: 0.5 }}
                                 >
                                    <span>₱</span>
                                    <span>{priceFrom}</span>
                                 </MenuItem>
                                 {expectedPrices.map((item) => (
                                    <MenuItem
                                       key={item.price}
                                       dense={true}
                                       value={item.price}
                                       sx={{ display: "flex", gap: 0.5 }}
                                    >
                                       <span>₱</span>
                                       <span>{item.price}</span>
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl>
                           <FormControl sx={{ m: 1, minWidth: 120 }}>
                              <InputLabel id="price-to-label">To</InputLabel>
                              <Select
                                 labelId="price-to-label"
                                 id="price-to"
                                 value={priceTo}
                                 label="To"
                                 onChange={handlePriceToChange}
                                 size="small"
                              >
                                 <MenuItem
                                    dense={true}
                                    value={priceTo}
                                    sx={{ display: "flex", gap: 0.5 }}
                                 >
                                    <span>₱</span>
                                    <span>{priceTo}</span>
                                 </MenuItem>
                                 {expectedPrices.map((item) => (
                                    <MenuItem
                                       key={item.price}
                                       dense={true}
                                       value={item.price}
                                       sx={{ display: "flex", gap: 0.5 }}
                                    >
                                       <span>₱</span>
                                       <span>{item.price}</span>
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl>
                        </Box>
                        {/* <PopupState variant="popover" popupId="demo-popup-menu">
                           {(popupState) => (
                              <React.Fragment>
                                 <Button
                                    variant="contained"
                                    {...bindTrigger(popupState)}
                                 >
                                    Dashboard
                                 </Button>
                                 <Menu {...bindMenu(popupState)}>
                                    <MenuItem onClick={popupState.close}>
                                       Profile
                                    </MenuItem>
                                    <MenuItem onClick={popupState.close}>
                                       My account
                                    </MenuItem>
                                    <MenuItem onClick={popupState.close}>
                                       Logout
                                    </MenuItem>
                                 </Menu>
                              </React.Fragment>
                           )}
                        </PopupState> */}
                     </Box>
                  </Zoom>
               )}
            </Grid>
         </Grid>
         {isEmpty && (
            <Typography
               variant="body1"
               align="center"
               sx={{ py: 3, color: "text.secondary" }}
            >
               Rooms is empty!
            </Typography>
         )}
         <Grid container spacing={2}>
            {error && (
               <Typography variant="caption" align="center">
                  An error occured.
               </Typography>
            )}
            {isPending && <LoadingState loadWhat="rooms" />}

            {/*
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 2 }} spacing={2}>
                */}
            {thisRooms &&
               thisRooms.map((room) => (
                  <SimpleRoomCard key={room.id} room={room} />
               ))}

            {/*
            </Masonry>
                */}
         </Grid>
      </Box>
   );
};

export default RoomLists;
