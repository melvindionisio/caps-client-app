import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { makeStyles } from "@mui/styles";
import { grey, blue, orange } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Home from "./pages/Home";
import Map from "./pages/Map";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";

import MainNavigation from "./components/../components/MainNavigation";

const useStyles = makeStyles({
  page: {
    background: grey[200],
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: blue[600],
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
  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters className={classes.page} maxWidth="xl">
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
          <MainNavigation className={classes.mainNavigation} />
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
