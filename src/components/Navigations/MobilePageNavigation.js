import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 100,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  bottomNavigation: {
    boxShadow: "0px 0px 0px 1px rgba(0,0,0,.1)",
    width: 270,
    borderRadius: ".5rem .5rem 0rem 0rem",
    overflow: "hidden",
  },
  bottomNavigationAction: {},
}));

export default function MobilePageNavigation() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState("home");

  const navItems = [
    {
      label: "Map",
      value: "map",
      icons: {
        inactive: <LocationOnOutlinedIcon fontSize="medium" />,
        active: <LocationOnIcon />,
      },
      path: "/map",
      index: 0,
    },
    {
      label: "Home",
      value: "home",
      icons: {
        inactive: <HomeOutlinedIcon fontSize="medium" />,
        active: <HomeIcon />,
      },
      path: "/home",
      index: 1,
    },
    {
      label: "Help",
      value: "help",
      icons: {
        inactive: <HelpOutlineIcon fontSize="medium" />,
        active: <HelpOutlinedIcon />,
      },
      path: "/help",
      index: 2,
    },
  ];

  // const paths = Array.from(navItems.map((item) => item.path));

  const tabChange = (event, newValue) => {
    if (location.pathname !== newValue) {
      setValue(newValue);
    } else {
      setValue(null);
    }
  };

  return (
    <Box
      className={classes.root}
      sx={
        location.pathname === "/search" ||
        location.pathname === "/register" ||
        location.pathname === "/login" ||
        location.pathname === "/profile" ||
        location.pathname === "/bookmarks"
          ? { display: "none" }
          : { display: "flex" }
      }
    >
      <BottomNavigation
        // showLabels
        value={value}
        onChange={tabChange}
        className={classes.bottomNavigation}
        sx={{
          height: "4rem",
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            style={{ fontFamily: "Quicksand" }}
            key={item.index}
            label={item.label.toUpperCase()}
            value={item.value}
            icon={
              value === item.value ? item.icons.active : item.icons.inactive
            }
            onClick={() => {
              history.push(item.path);
            }}
            className={classes.bottomNavigationAction}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
