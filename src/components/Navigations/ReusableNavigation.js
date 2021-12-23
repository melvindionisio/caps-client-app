import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useHistory } from "react-router-dom";

const ReusableNavigation = ({
  children,
  navigationTabs,
  center,
  spaceCenter,
}) => {
  const history = useHistory();

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        variant="outlined"
        color="secondary"
        sx={{ bgcolor: "background.default" }}
      >
        <Toolbar
          sx={
            spaceCenter
              ? {
                  px: " .3rem",
                  display: "flex",
                  justifyContent: "space-between",
                }
              : { px: " .3rem", display: "flex", justifyContent: "start" }
          }
        >
          <IconButton
            onClick={() => history.goBack()}
            size="large"
            sx={{ mr: ".5rem" }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          {children}
          {center && <IconButton></IconButton>}
        </Toolbar>
      </AppBar>
      {navigationTabs && (
        <AppBar
          position="relative"
          elevation={0}
          sx={{
            bgcolor: "background.default",
          }}
        >
          {navigationTabs}
        </AppBar>
      )}
    </>
  );
};

export default ReusableNavigation;
