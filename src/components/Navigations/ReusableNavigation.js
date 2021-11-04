import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    // justifyContent: "space-between",
  },
});
const ReusableNavigation = ({ children }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        variant="outlined"
        color="secondary"
        sx={{ bgcolor: "background.default" }}
      >
        <Toolbar className={classes.toolbar} sx={{ px: " .3rem" }}>
          <IconButton
            onClick={() => history.goBack()}
            size="large"
            sx={{ mr: ".5rem" }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          {children}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default ReusableNavigation;
