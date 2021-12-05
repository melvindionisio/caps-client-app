import React from "react";
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
import { useState } from "react";
import { useStyles } from "./styles/Home.styles";
import HomeNavigation from "../components/Navigations/HomeNavigation";
import RoomLists from "../components/lists/RoomLists";
// import DeskPageNavigation from "../components/Navigations/DeskPageNavigation";
import useFetch from "../hooks/useFetch";
// import { Link } from "react-router-dom";

import BoardingHouseLists from "../components/lists/BoardingHouseLists";

import { Typography, CircularProgress } from "@mui/material";

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

const Home = () => {
  const {
    data: boardingHouse,
    isPending,
    error,
  } = useFetch(
    "https://my-json-server.typicode.com/melvindionisio/bhfinder-api/boardingHouse"
  );

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function NavigationTabs() {
    return (
      <Tabs
        className={classes.tabs}
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
        aria-label="full width tabs"
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
          {/* <Hidden mdUp>
            <AppBar position="static" sx={{ background: "#fff" }} elevation={0}>
              <NavigationTabs />
            </AppBar>
          </Hidden> */}

          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Box
                className={classes.page}
                py={2}
                px={2}
                pb={8}
                sx={{
                  maxWidth: "75rem",
                  margin: "0 auto",
                  [theme.breakpoints.up("md")]: {
                    px: 2,
                    pl: 3,
                    py: 2,
                    pb: 8,
                  },
                }}
              >
                {error && (
                  <Typography variant="caption" align="center">
                    Error. {error}
                  </Typography>
                )}
                {isPending && (
                  <Box
                    py={3}
                    pt={10}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress
                      variant="indeterminate"
                      size="2.5rem"
                      color="primary"
                    />
                    <Typography variant="overline" align="center">
                      Loading...
                    </Typography>
                  </Box>
                )}
                {boardingHouse && (
                  <RoomLists
                    error={error}
                    isPending={isPending}
                    boardingHouses={boardingHouse}
                  />
                )}
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Box className={classes.page}>
                <Box
                  p={1}
                  pb={8}
                  px={2}
                  style={{ maxWidth: "75rem", margin: "0 auto" }}
                >
                  <BoardingHouseLists />
                </Box>
              </Box>
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Container>
    </Slide>
  );
};

export default Home;
