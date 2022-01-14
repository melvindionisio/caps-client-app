import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slide from "@mui/material/Slide";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ReusableNavigation from "../components/Navigations/ReusableNavigation";
import useFetch from "../hooks/useFetch";
import LoadingState from "../components/LoadingState";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import { useTheme } from "@mui/styles";

import About from "../components/SwipablePages/About";
import MyRooms from "../components/SwipablePages/MyRooms";
import Reviews from "../components/SwipablePages/Reviews";
import { domain } from "../fetch-url/fetchUrl";

import InfoIcon from "@mui/icons-material/Info";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AddBookmarkButton from "../components/AddBookmarkButton";

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

const BoardingHouseProfile = () => {
   const { bhId } = useParams();
   const [isBookmarked, setIsBookmarked] = useState(false);

   const {
      data: boardinghouse,
      isPending,
      error,
   } = useFetch(`${domain}/api/boarding-houses/${bhId}`);

   const theme = useTheme();
   const [value, setValue] = useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const handleChangeIndex = (index) => {
      setValue(index);
   };

   useEffect(() => {
      const abortCont = new AbortController();
      //CHECK IF THE BOARDINGHOUSE IS EXISTING IN BOOKMARKS
      fetch(`${domain}/api/bookmarks/boardinghouse/isbookmarked/${bhId}`)
         .then((res) => res.json())
         .then((data) => {
            setIsBookmarked(data.isBookmarked);
         })
         .catch((err) => console.log(err));
      return () => {
         abortCont.abort();
      };
   }, [bhId]);

   function NavigationTabs() {
      return (
         <Tabs
            sx={{
               borderBottom: "1px solid rgba(0,0,0,0.2)",
               "& .MuiTabs-indicator": {
                  height: 4,
                  borderRadius: "1.5rem 1.5rem 0 0 ",
               },
            }}
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            aria-label="full width tabs"
         >
            <Tooltip
               title="About Boarding House"
               TransitionComponent={Zoom}
               enterDelay={1000}
            >
               <Tab icon={<InfoIcon />} {...a11yProps(0)} />
            </Tooltip>
            <Tooltip title="Rooms" TransitionComponent={Zoom} enterDelay={1000}>
               <Tab icon={<BedroomChildIcon />} {...a11yProps(1)} />
            </Tooltip>
            <Tooltip
               title="Reviews"
               TransitionComponent={Zoom}
               enterDelay={1000}
            >
               <Tab icon={<ReviewsIcon />} {...a11yProps(2)} />
            </Tooltip>
         </Tabs>
      );
   }

   return (
      <Slide in={true} direction="up">
         <Container
            maxWidth="lg"
            disableGutters
            sx={{ height: "100vh", overflow: "hidden" }}
         >
            {error && (
               <Typography variant="body1" color="initial" align="center">
                  {error}
               </Typography>
            )}
            {isPending && <LoadingState />}
            {boardinghouse && (
               <>
                  <ReusableNavigation
                     navigationTabs={<NavigationTabs />}
                     spaceCenter={true}
                  >
                     <Typography variant="body1" align="center">
                        {boardinghouse.name}
                     </Typography>
                     <AddBookmarkButton
                        boardinghouseId={boardinghouse.id}
                        boardinghouseName={boardinghouse.name}
                        bookmarkType={"boardinghouse"}
                        isBookmarked={isBookmarked}
                        setIsBookmarked={setIsBookmarked}
                     />
                  </ReusableNavigation>

                  <SwipeableViews
                     axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                     index={value}
                     onChangeIndex={handleChangeIndex}
                  >
                     <TabPanel value={value} index={0} dir={theme.direction}>
                        <About boardinghouse={boardinghouse} />
                     </TabPanel>
                     <TabPanel value={value} index={1} dir={theme.direction}>
                        <Box sx={{ minHeight: "100vh", paddingBottom: "5rem" }}>
                           <MyRooms bhName={boardinghouse.name} />
                        </Box>
                     </TabPanel>

                     <TabPanel value={value} index={2} dir={theme.direction}>
                        <Reviews />
                     </TabPanel>
                  </SwipeableViews>
               </>
            )}
         </Container>
      </Slide>
   );
};

export default BoardingHouseProfile;
