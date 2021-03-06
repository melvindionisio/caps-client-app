import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import ApartmentIcon from "@mui/icons-material/Apartment";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";

import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import { useTheme } from "@mui/styles";
import { useStyles } from "./styles/Home.styles";
import HomeNavigation from "../components/Navigations/HomeNavigation";
import RoomLists from "../components/lists/RoomLists";
import BoardingHouseLists from "../components/lists/BoardingHouseLists";
import useSessionStorage from "../hooks/useSessionStorage";
import { domain } from "../fetch-url/fetchUrl";

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`full-width-tabpanel-${index}`}
         aria-labelledby={`full-width-tab-${index}`}
         {...other}
      >
         {value === index && <Box>{children}</Box>}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

function a11yProps(index) {
   return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
   };
}

const SwipeableWrapper = ({ children }) => {
   const theme = useTheme();

   return (
      <Box
         py={2}
         px={2}
         sx={{
            maxWidth: "55rem",
            minHeight: "70vh",
            margin: "0 auto",
            pb: 10,
            [theme.breakpoints.up("md")]: {
               px: 2,
               pl: 3,
               py: 2,
               pb: 10,
            },
         }}
      >
         {children}
      </Box>
   );
};

const Home = ({
   setShowStatusMessage,
   setStatusMessage,
   setStatusMessageSeverity,
}) => {
   const classes = useStyles();
   const [value, setValue] = useSessionStorage("home-tab", 0);
   const theme = useTheme();

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const handleChangeIndex = (index) => {
      setValue(index);
   };

   const [rooms, setRooms] = useState([]);

   const [isPending, setIsPending] = useState(false);
   const [genderFilter, setGenderFilter] = useState("Male/Female");

   const [sort, setSort] = useState("room_name");
   const [sortType, setSortType] = useState("desc");

   const [error, setError] = useState(null);
   const [isEmpty, setIsEmpty] = useState(false);

   useEffect(() => {
      // will fetch depending in the sort here
      setIsPending(true);
      if (sort && sortType) {
         const abortCont = new AbortController();
         setRooms([]);
         setTimeout(() => {
            fetch(
               `${domain}/api/rooms/?sort=${sort}&sortType=${sortType}&gender=${genderFilter}`,
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
                  setRooms(data);
                  setIsPending(false);
                  setError(null);
               })
               .catch((err) => {
                  if (err.name === "AbortError") {
                     console.log("fetch aborted");
                  } else {
                     setIsPending(false);
                     setError(err.message);
                     setRooms([]);
                  }
               });
         }, 0);
         return () => {
            abortCont.abort();
         };
      }
   }, [sort, sortType, genderFilter]);

   function NavigationTabs() {
      return (
         <Tabs
            className={classes.tabs}
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
         >
            <Tooltip title="Rooms" TransitionComponent={Zoom} enterDelay={900}>
               <Tab icon={<SingleBedIcon />} label="ROOMS" {...a11yProps(0)} />
            </Tooltip>
            <Tooltip
               title="Boarding houses"
               TransitionComponent={Zoom}
               enterDelay={900}
            >
               <Tab
                  icon={<ApartmentIcon />}
                  label="BOARDING HOUSE"
                  {...a11yProps(1)}
               />
            </Tooltip>
         </Tabs>
      );
   }

   return (
      <Slide in={true} direction="left">
         <Container
            disableGutters
            maxWidth="xl"
            sx={{
               display: "flex",
               height: "100vh",
               width: "100vw",
            }}
            className={classes.homeContainer}
         >
            <Box className={classes.root}>
               <HomeNavigation NavigationTabs={NavigationTabs}>
                  <NavigationTabs />
               </HomeNavigation>

               <SwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={value}
                  onChangeIndex={handleChangeIndex}
               >
                  <TabPanel value={value} index={0} dir={theme.direction}>
                     <SwipeableWrapper>
                        <RoomLists
                           rooms={rooms}
                           isPending={isPending}
                           setIsPending={setIsPending}
                           isEmpty={isEmpty}
                           setIsEmpty={setIsEmpty}
                           error={error}
                           sort={sort}
                           setSort={setSort}
                           sortType={sortType}
                           setSortType={setSortType}
                           genderFilter={genderFilter}
                           setGenderFilter={setGenderFilter}
                        />
                     </SwipeableWrapper>
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                     <SwipeableWrapper>
                        <BoardingHouseLists />
                     </SwipeableWrapper>
                  </TabPanel>
               </SwipeableViews>
            </Box>
         </Container>
      </Slide>
   );
};

export default Home;
