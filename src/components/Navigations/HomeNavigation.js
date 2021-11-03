import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Hidden from "@mui/material/Hidden";
import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import MobileMenu from "../MobileMenu";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CancelIcon from "@mui/icons-material/Cancel";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import {
  Button,
  Card,
  CardActionArea,
  CardHeader,
  ListItemButton,
  Tooltip,
  Zoom,
} from "@mui/material";
import { Box } from "@mui/system";
import logo from "../../sns-logo.png";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

import { blue } from "@mui/material/colors";
import { GoogleLogout } from "react-google-login";
import { LoginContext } from "../../contexts/LoginContext";
import { useContext } from "react";
import AccountMenu from "../AccountMenu";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    // [theme.breakpoints.down("lg")]: {
    //   background: "red",
    // },
  },
}));

const HomeNavigation = ({ children, NavigationTabs }) => {
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

  const {
    clientId,
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    setCurrentUser,
    isSuccess,
    setIsSuccess,
  } = useContext(LoginContext);

  const googleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({
      googleId: null,
      email: null,
      name: null,
      picture: null,
    });
    console.log(isLoggedIn);
  };

  const handleClose = () => {
    setIsSuccess(false);
  };
  const vertical = "bottom";
  const horizontal = "right";

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        variant="outlined"
        sx={{ background: "#fff" }}
      >
        <Toolbar className={classes.toolbar} sx={{ padding: "0rem .3rem" }}>
          <Hidden mdUp>
            <IconButton onClick={toggleDrawer(anchor, true)} size="small">
              <Avatar
                style={{
                  outline: "1px solid rgba(25, 118, 210, 0.5)",
                  outlineOffset: "2px",
                }}
                src={currentUser.picture}
              />
            </IconButton>
          </Hidden>

          <Box style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={logo}
              style={{ height: "2rem", width: "2rem" }}
            ></Avatar>
            {/* <Hidden lgDown>
              <Typography
                variant="h6"
                component="h1"
                style={{
                  marginLeft: ".2rem",
                  fontFamily: "Quicksand",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                SEARCH 'N STAY
              </Typography>
            </Hidden> */}
            <Hidden mdUp>
              <Typography
                variant="body1"
                component="h1"
                style={{
                  marginLeft: ".2rem",
                  fontFamily: "Quicksand",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                SEARCH 'N STAY
              </Typography>
            </Hidden>
          </Box>
          {/* tabs navigation */}
          <Hidden mdDown>
            <Box style={{ minWidth: "23rem", margin: "0 auto" }}>
              {children}
            </Box>
          </Hidden>
          <Box>
            <Tooltip title="Search" TransitionComponent={Zoom} enterDelay={600}>
              <IconButton onClick={() => history.push("/search")} size="large">
                <SearchOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Hidden mdDown>
              <AccountMenu currentUser={currentUser} />
            </Hidden>
          </Box>
        </Toolbar>
        <Hidden mdUp>
          <AppBar position="static" sx={{ background: "#fff" }} elevation={0}>
            <NavigationTabs />
          </AppBar>
        </Hidden>
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
            <Typography variant="body1" style={{ fontFamily: "Quicksand" }}>
              SEARCH 'N STAY
            </Typography>

            <IconButton
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <CancelIcon />
            </IconButton>
          </ListItem>
          {isLoggedIn ? (
            <>
              <ListItem>
                <Card
                  sx={{ width: "100%", background: blue[500] }}
                  variant="outlined"
                >
                  <CardActionArea onClick={() => history.push("/profile")}>
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
                              border: "3px solid white",
                            }}
                            src={currentUser.picture}
                          />
                        </Box>
                      }
                      subheader={
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "white" }}
                          align="center"
                        >
                          {currentUser.name ?? "UserName"}
                        </Typography>
                      }
                    />
                  </CardActionArea>
                </Card>
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                button
                onClick={() => history.push("/profile")}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"PROFILE"}
                    secondary="Visit your profile."
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                button
                onClick={() => history.push("/bookmarks")}
              >
                <ListItemButton divider>
                  <ListItemIcon>
                    <BookmarksIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"BOOKMARKS"}
                    secondary="See all your saves."
                  />
                </ListItemButton>
              </ListItem>

              <GoogleLogout
                clientId={clientId}
                onLogoutSuccess={googleLogout}
                render={(renderProps) => (
                  <ListItem
                  // disablePadding
                  // button
                  >
                    {/* <ListItemButton > */}
                    {/* <ListItemIcon>
                        <Logout />
                      </ListItemIcon>
                      <ListItemText primary={"LOGOUT"} /> */}
                    <Button
                      variant="contained"
                      startIcon={<Logout />}
                      color="warning"
                      size="large"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Logout
                    </Button>
                    {/* </ListItemButton> */}
                  </ListItem>
                )}
              ></GoogleLogout>
            </>
          ) : (
            <>
              <Divider />
              <ListItem sx={{ dislay: "flex", justifyContent: "center" }}>
                <Button onClick={() => history.push("/login")}>Login</Button> or{" "}
                <Button onClick={() => history.push("/register")}>
                  Register
                </Button>
              </ListItem>
            </>
          )}
        </List>
      </MobileMenu>
      <Hidden mdDown>
        <Snackbar
          open={isSuccess}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Login Successfuly!"
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
          sx={{ width: "50%" }}
        >
          {/* <Alert onClose={handleClose}>Login Successfully!</Alert> */}
        </Snackbar>
      </Hidden>
    </>
  );
};

export default HomeNavigation;
