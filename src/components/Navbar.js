import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MobileMenu from "../components/MobileMenu";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CancelIcon from "@mui/icons-material/Cancel";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { Button, Card, CardActions, CardHeader } from "@mui/material";
import { Box } from "@mui/system";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const anchor = "left";

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        variant="outlined"
        color="secondary"
        sx={{ background: "white" }}
      >
        <Toolbar className={classes.toolbar} sx={{ padding: "0rem .5rem" }}>
          <IconButton onClick={toggleDrawer(anchor, true)} size="large">
            <Avatar>U</Avatar>
          </IconButton>
          <Typography variant="h6">SEARCH 'N STAY</Typography>
          <IconButton onClick={() => history.push("/search")} size="large">
            <SearchOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <MobileMenu toggleDrawer={toggleDrawer} state={state} anchor={anchor}>
        <List sx={{ paddingTop: "0rem" }}>
          <ListItem
            button
            sx={{
              display: "grid",
              justifyContent: "center",
            }}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            <ListItemIcon
              sx={{
                display: "grid",
                justifyContent: "center",
              }}
            >
              <IconButton>
                <CancelIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
          <ListItem>
            <Card sx={{ width: "100%" }} variant="outlined">
              <CardHeader
                title={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Avatar
                      sx={{
                        height: "4rem",
                        width: "4rem",
                        background: "#lightgrey",
                      }}
                    >
                      P
                    </Avatar>
                  </Box>
                }
                subheader={
                  <Typography variant="subtitle1" align="center">
                    Profile Name
                  </Typography>
                }
              />
              <Divider />
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0rem",
                }}
              >
                <Button
                  sx={{ width: "50%", borderRadius: "0rem" }}
                  size="small"
                  disableElevation
                  variant="text"
                >
                  Edit
                </Button>
                <Divider orientation="vertical" flexItem />
                <Button
                  sx={{ width: "50%", borderRadius: "0rem" }}
                  size="small"
                  disableElevation
                  color="secondary"
                  variant="text"
                >
                  Logout
                </Button>
              </CardActions>
            </Card>
          </ListItem>
          <Divider />
          <ListItem sx={{ dislay: "flex", justifyContent: "center" }}>
            {/* <ListItemIcon>
              <BookmarksIcon />
            </ListItemIcon> */}
            {/* <ListItemText primary={"Login "} /> */}
            <Button onClick={() => history.push("/login")}>
              Login
            </Button> or{" "}
            <Button onClick={() => history.push("/register")}>Register</Button>
          </ListItem>
          <Divider />

          <ListItem>
            <Button sx={{ width: "100%" }} disableElevation variant="contained">
              LOGIN WITH GOOGLE
            </Button>
          </ListItem>
          <Typography align="center" variant="subtitle2">
            OR
          </Typography>
          <ListItem>
            <Button sx={{ width: "100%" }} disableElevation variant="contained">
              LOGIN WITH FACEBOOK
            </Button>
          </ListItem>
          <Divider />

          <ListItem button>
            <ListItemIcon>
              <BookmarksIcon />
            </ListItemIcon>
            <ListItemText primary={"BOOKMARKS"} />
          </ListItem>
        </List>
      </MobileMenu>
    </>
  );
};

export default Navbar;
