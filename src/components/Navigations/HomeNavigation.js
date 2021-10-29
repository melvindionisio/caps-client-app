import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Hidden from "@mui/material/Hidden";

// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MobileMenu from "../MobileMenu";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CancelIcon from "@mui/icons-material/Cancel";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { Button, Card, CardActions, CardHeader } from "@mui/material";
import { Box } from "@mui/system";
import logo from "../../sns-logo.png";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const HomeNavigation = () => {
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
        <Toolbar className={classes.toolbar} sx={{ padding: "0rem .3rem" }}>
          <Hidden mdUp>
            <IconButton onClick={toggleDrawer(anchor, true)} size="small">
              <Avatar>U</Avatar>
            </IconButton>
          </Hidden>
          {/* <Typography variant="h6">SEARCH 'N STAY</Typography>
           */}
          <Avatar src={logo} style={{ height: "2rem", width: "2rem" }}></Avatar>
          <IconButton onClick={() => history.push("/search")} size="large">
            <SearchOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <MobileMenu toggleDrawer={toggleDrawer} state={state} anchor={anchor}>
        <List sx={{ paddingTop: "0rem" }}>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            <Typography>SEARCH 'N STAY</Typography>

            <IconButton
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <CancelIcon />
            </IconButton>
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

export default HomeNavigation;
