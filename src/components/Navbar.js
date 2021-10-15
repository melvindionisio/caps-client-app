import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    // justifyContent: "space-between",
  },
});

const Navbar = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="sticky" color="primary" elevation={1}>
        <Toolbar className={classes.toolbar}>
          <IconButton>
            <MenuOutlinedIcon />
          </IconButton>
          <Typography variant="h6">Home</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
