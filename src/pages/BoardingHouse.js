import React, { useState } from "react";
import { grey, pink } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import Slide from "@mui/material/Slide";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ReusableNavigation from "../components/Navigations/ReusableNavigation";
import useFetch from "../hooks/useFetch";
import LoadingState from "../components/LoadingState";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { CardContent, List, ListItem } from "@mui/material";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";

import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import { useTheme } from "@mui/styles";

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

const BoardingHouse = () => {
  const { bhId } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const {
    data: boardinghouse,
    isPending,
    error,
  } = useFetch(`http://localhost:3500/api/boarding-houses/${bhId}`);

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
        sx={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}
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
          <Tab label="ABOUT" {...a11yProps(0)} />
        </Tooltip>
        <Tooltip title="Rooms" TransitionComponent={Zoom} enterDelay={1000}>
          <Tab label="ROOMS" {...a11yProps(1)} />
        </Tooltip>
      </Tabs>
    );
  }

  return (
    <Slide in={true} direction="left">
      <Container maxWidth="lg" disableGutters>
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
              {isBookmarked ? (
                <IconButton
                  size="medium"
                  sx={{
                    background: grey[100],
                    color: pink[500],
                  }}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <BookmarkAddedIcon fontSize="medium" />
                </IconButton>
              ) : (
                <IconButton
                  size="medium"
                  sx={{
                    background: grey[100],
                    color: grey[500],
                  }}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <BookmarkAddIcon fontSize="medium" />
                </IconButton>
              )}
            </ReusableNavigation>

            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Container maxWidth="md" disableGutters sx={{ padding: 2 }}>
                  <Card variant="outlined">
                    <CardHeader
                      avatar={<Avatar aria-label=""></Avatar>}
                      action={<IconButton aria-label=""></IconButton>}
                      title={boardinghouse.name}
                      subheader={boardinghouse.popularity ?? 0}
                    />
                    <CardContent>
                      <List>
                        <ListItem divider>
                          <Typography variant="body1" color="initial">
                            {boardinghouse.completeAddress}
                          </Typography>
                        </ListItem>
                        <ListItem divider>
                          <Typography variant="body1" color="initial">
                            {boardinghouse.contacts}
                          </Typography>
                        </ListItem>
                        <ListItem divider>
                          <Typography variant="body1" color="initial">
                            {boardinghouse.tagline}
                          </Typography>
                        </ListItem>
                        <ListItem divider>
                          <Typography variant="body1" color="initial">
                            {boardinghouse.owner}
                          </Typography>
                        </ListItem>
                        <ListItem divider>
                          <Typography variant="body1" color="initial">
                            {boardinghouse.completeAddress}
                          </Typography>
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Container>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Box sx={{ minHeight: "100vh", paddingBottom: "5rem" }}>
                  <Box
                    p={1}
                    pb={8}
                    px={2}
                    style={{ maxWidth: "75rem", margin: "0 auto" }}
                  >
                    {/* <BoardingHouseLists /> */}
                  </Box>
                </Box>
              </TabPanel>
            </SwipeableViews>
          </>
        )}
      </Container>
    </Slide>
  );
};

export default BoardingHouse;
