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

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 100,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  nav: {
    boxShadow: "0px 0px 5px 1px rgba(0,0,0,.05)",
    width: "70%",
    borderRadius: "1rem 1rem 0rem 0rem",
  },
});

export default function MainNavigation() {
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
  return (
    <Box className={classes.root}>
      <BottomNavigation
        // showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.nav}
        sx={{
          background: "rgba(255,255,255,0.3)",
          backdropFilter: "blur(.4rem)",
          overflow: "hidden",
          height: "4rem",
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.index}
            label={item.label.toUpperCase()}
            value={item.value}
            icon={
              location.pathname === item.path
                ? item.icons.active
                : item.icons.inactive
            }
            onClick={() => history.push(item.path)}
            className={classes.navbutton}
            sx={
              value === item.value
                ? {
                    background: "white",
                  }
                : { background: "transparent" }
            }
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
