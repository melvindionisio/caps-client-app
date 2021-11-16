import React from "react";
import { Fab, Box, Tooltip, Zoom } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

const DeskPageNavigation = () => {
  const history = useHistory();
  const location = useLocation();
  const navItems = [
    // {
    //   label: "Map",
    //   value: "map",
    //   icons: {
    //     inactive: <LocationOnOutlinedIcon fontSize="medium" />,
    //     active: <LocationOnIcon />,
    //   },
    //   path: "/map",
    //   index: 0,
    // },
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
    <Box
      style={{
        position: "absolute",
        bottom: 10,
        right: 10,
        zIndex: "500",
        display: "flex",
        flexDirection: "row",
      }}
      sx={{ "& > :not(style)": { mr: 1.5 } }}
    >
      {navItems.map((page) => (
        <Tooltip
          title={page.label}
          key={page.index}
          TransitionComponent={Zoom}
          enterDelay={700}
        >
          <Fab
            onClick={() => history.push(page.path)}
            color={location.pathname === page.path ? "primary" : "default"}
            variant="circular"
            disableRipple
            sx={{ boxShadow: "0px 2px 5px rgba(0,0,0,0.3)" }}
          >
            {location.pathname === page.path
              ? page.icons.active
              : page.icons.inactive}
          </Fab>
        </Tooltip>
      ))}
    </Box>
  );
};

export default DeskPageNavigation;
