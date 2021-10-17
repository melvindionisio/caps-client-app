import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { makeStyles } from "@mui/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <AppBar
        position="sticky"
        // elevation={1}
        variant="outlined"
        color="secondary"
        sx={{ background: "white" }}
      >
        <Toolbar className={classes.toolbar} sx={{ padding: "0rem .5rem" }}>
          <IconButton>
            <MenuOutlinedIcon />
          </IconButton>
          <Typography variant="h6">SEARCH 'N STAY</Typography>
          <IconButton onClick={() => history.push("/search")}>
            <SearchOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
