import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Hidden from "@mui/material/Hidden";
import Drawer from "@mui/material/Drawer";

import { makeStyles } from "@mui/styles";
import { blueGrey, blue, orange } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Home from "./pages/Home";
import Map from "./pages/Map";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";

import MobilePageNavigation from "./components/Navigations/MobilePageNavigation";
import DeskPageNavigation from "./components/Navigations/DeskPageNavigation";

import { LoginContext } from "./contexts/LoginContext";

const useStyles = makeStyles((theme) => ({
  page: {
    background: blueGrey[50],
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
  },
  permanentDrawer: {
    width: 250,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 250,
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: orange[500],
    },
  },
  typography: {
    // fontFamily: "PT Sans",
    // fontWeightRegular: 400,
    // fontWeightBold: 700,

    // fontFamily: "Quicksand",
    // fontWeightLight: 400,
    // fontWeightRegular: 500,
    // fontWeightMedium: 600,
    // fontWeightBold: 700,

    fontFamily: "Source Sans Pro",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  spacing: 8,
});

const App = () => {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState();
  const [profilePic, setProfilePic] = useState();
  const clientId =
    "1088575893079-uuebeab7q5261f16gufrvs5no25dotlr.apps.googleusercontent.com";

  return (
    <ThemeProvider theme={theme}>
      <LoginContext.Provider
        value={{
          clientId,
          isLoggedIn,
          setIsLoggedIn,
          userName,
          setUserName,
          profilePic,
          setProfilePic,
        }}
      >
        <Container
          disableGutters
          className={classes.page}
          sx={{
            display: "flex",
            height: "100vh",
            width: "100vw",
          }}
          maxWidth="xl"
        >
          <Hidden mdDown>
            <Drawer
              variant="permanent"
              anchor="left"
              className={classes.permanentDrawer}
              style={{ zIndex: "10" }}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Typography>PROFILE</Typography>
            </Drawer>
          </Hidden>
          {/* <Box style={{ minHeight: "100vh", width: "100%", overflowY: "auto" }}> */}
          <Router>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/map">
                <Map />
              </Route>
              <Route path="/help">
                <Help />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="*">
                <Container maxWidth="sm">
                  <Typography variant="h6" align="center">
                    Error 404 page not found.
                  </Typography>
                </Container>
              </Route>
            </Switch>
            <Hidden mdDown>
              <DeskPageNavigation />
            </Hidden>
            <Hidden mdUp>
              <MobilePageNavigation className={classes.mainNavigation} />
            </Hidden>
          </Router>
          {/* </Box> */}
        </Container>
      </LoginContext.Provider>
    </ThemeProvider>
  );
};

export default App;
