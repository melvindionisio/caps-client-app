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
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import MoreIcon from "@mui/icons-material/MoreVert";

import { useTheme } from "@mui/styles";
import { useState } from "react";
import { useStyles } from "./styles/Home.styles";
import HomeNavigation from "../components/Navigations/HomeNavigation";
import RoomLists from "../components/lists/RoomLists";
// import DeskPageNavigation from "../components/Navigations/DeskPageNavigation";
import useFetch from "../hooks/useFetch";
// import { Link } from "react-router-dom";

const owners = [
  "House-1",
  "House-2",
  "House-3",
  "House-4",
  "House-5",
  "House-6",
  "House-7",
  "House-8",
];

const House = ({ owner }) => {
  return (
    <Card variant="outlined">
      <CardHeader
        title={owner}
        subheader="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius
                  dolores recusandae corrupti error aliquam tempore, repudiandae
                  nisi aperiam totam, impedit nihil nulla officia id sed
                  temporibus porro qui sequi fugiat?"
        action={
          <IconButton>
            <MoreIcon fontSize="small" />
          </IconButton>
        }
      />
      <Divider />
      <CardActions>
        <Button variant="outlined" size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

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
    // isPending,
    // error,
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
        <Tab icon={<SingleBedIcon />} label="ROOMS" {...a11yProps(0)} />
        <Tab
          icon={<ApartmentIcon />}
          label="BOARDING HOUSE"
          {...a11yProps(1)}
        />
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
                p={1}
                pb={8}
                px={2}
                style={{ maxWidth: "75rem", margin: "0 auto" }}
              >
                {boardingHouse && <RoomLists rooms={boardingHouse[0].room} />}
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
                  <Grid container spacing={1}>
                    {owners.map((owner) => (
                      <Grid item lg={6} md={4} sm={6} xs={12} key={owner}>
                        <House owner={owner} />
                      </Grid>
                    ))}
                  </Grid>
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
