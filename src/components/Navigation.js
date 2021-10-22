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
const Navigation = ({ children }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        variant="outlined"
        color="secondary"
        sx={{ background: "white" }}
      >
        <Toolbar className={classes.toolbar} sx={{ padding: "0rem .3rem" }}>
          <IconButton
            onClick={() => history.goBack()}
            size="large"
            sx={{ marginRight: ".5rem" }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          {children}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
