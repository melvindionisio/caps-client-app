import React from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import BookmarksIcon from "@mui/icons-material/Bookmarks";
import CloseIcon from "@mui/icons-material/Close";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0rem 1.5rem",
  },
  closeButton: {
    padding: "1rem",
    alignSelf: "flex-end",
  },
  avatar: {
    height: 80,
    width: 80,
    margin: "auto",
  },
  fullWidth: {
    width: "85%",
    display: "block",
    alignSelf: "center",
  },
  bookmarkEmpty: {
    borderRadius: ".5rem",
    border: "2px dashed grey",
  },
  loginGoogleButton: {
    alignSelf: "center",
  },
  logoutGoogleButton: {
    alignSelf: "flex-start",
    marginLeft: "1rem",
    marginTop: ".5rem",
  },
}));
const clientId =
  "1088575893079-uuebeab7q5261f16gufrvs5no25dotlr.apps.googleusercontent.com";

export default function SideBar({ setSidebarIsOpen, sidebarIsOpen, anchor }) {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState();
  const [profilePic, setProfilePic] = useState();

  const responseGoogle = (response) => {
    setName(response.profileObj.name);
    setIsLoggedIn(true);
    setProfilePic(response.profileObj.imageUrl);
    console.log(response);
  };
  const logout = () => {
    setName(null);
    setIsLoggedIn(false);
  };

  const SideContent = (anchor) => (
    <Box
      pb={2}
      className={clsx(classes.list, classes.container, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <IconButton
        onClick={setSidebarIsOpen}
        onKeyDown={setSidebarIsOpen}
        size="medium"
        className={classes.closeButton}
      >
        <CloseIcon />
      </IconButton>
      {name && (
        <AppBar position="static" elevation={0} color="transparent">
          <Toolbar variant="dense" className={classes.toolbar}>
            <Typography variant="h6" component="span" color="textSecondary">
              {name}
            </Typography>
            {/* <Avatar>{name.charAt(0).toUpperCase()}</Avatar> */}
            <Avatar src={profilePic}></Avatar>
          </Toolbar>
        </AppBar>
      )}

      <Divider />
      {isLoggedIn ? (
        <GoogleLogout
          clientId={clientId}
          onLogoutSuccess={logout}
          className={classes.loginGoogleButton}
          render={(renderProps) => (
            <Button
              variant="contained"
              color="secondary"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className={classes.logoutGoogleButton}
            >
              Logout
            </Button>
          )}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={clientId}
          render={(renderProps) => (
            <Button
              variant="contained"
              color="primary"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className={classes.loginGoogleButton}
            >
              Login with Google
            </Button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}

      <Box p={2} py={1} px={2} className={classes.fullWidth}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <BookmarksIcon />
            </ListItemIcon>
            <ListItemText primary="Bookmarks" />
          </ListItem>
        </List>
        <Box
          p={2}
          py={4}
          px={2}
          className={`${classes.fullWidth} ${classes.bookmarkEmpty}`}
        >
          <Typography variant="body1" align="center">
            Bookmarks here!
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={anchor}
        open={sidebarIsOpen}
        onClose={setSidebarIsOpen}
        onOpen={setSidebarIsOpen}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        hysteresis={0.1}
      >
        {SideContent(anchor)}
      </SwipeableDrawer>
    </div>
  );
}
