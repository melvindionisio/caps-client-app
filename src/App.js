import React, { useEffect } from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
} from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Hidden from "@mui/material/Hidden";
import { Drawer } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blueGrey, blue, amber } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";
import BoardingHouseProfile from "./pages/BoardingHouseProfile";
import RoomProfile from "./pages/RoomProfile";

import MobilePageNavigation from "./components/Navigations/MobilePageNavigation";
import DeskPageNavigation from "./components/Navigations/DeskPageNavigation";

import LoginContextProvider from "./contexts/LoginContext";
import useAddToHomescreenPrompt from "./hooks/useAddToHomescreenPrompt";

const theme = createTheme({
   palette: {
      // mode: "dark",
      primary: {
         main: blue[600],
      },
      secondary: {
         main: amber[700],
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

      fontFamily: "Source Sans Pro, Roboto",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
   },
   spacing: 8,
});

const useStyles = makeStyles((theme) => ({
   page: {
      background: blueGrey[50],
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      position: "relative",
   },
   permanentDrawer: {
      width: 550,
      flexShrink: 0,
      boxShadow: "3px 0px 5px rgba(0,0,0,0.2)",
   },
   drawerPaper: {
      width: 550,
   },

   // [theme.breakpoints.up("md")]: {
   //   backgroundColor: theme.palette.background.md
   // },
   // [theme.breakpoints.down("sm")]: {
   //   backgroundColor: theme.palette.background.sm
   // },
}));
const App = () => {
   const classes = useStyles();

   const [prompt] = useAddToHomescreenPrompt();

   useEffect(() => {
      if (prompt) console.log(prompt);
      console.log(prompt);
   }, [prompt]);

   // const onInstallPrompt = async () => {
   //   console.log("Installing");
   // };

   return (
      <ThemeProvider theme={theme}>
         <LoginContextProvider>
            <Container
               disableGutters
               className={classes.page}
               sx={{
                  display: "flex",
                  height: "100vh",
                  width: "100vw",
                  // bgColor: "background.default",
               }}
               maxWidth="xl"
            >
               {/* <Box style={{ minHeight: "100vh", width: "100%", overflowY: "auto" }}> */}
               <Router>
                  <Hidden lgDown>
                     <Drawer
                        variant="permanent"
                        anchor="left"
                        className={classes.permanentDrawer}
                        style={{ zIndex: "10" }}
                        classes={{
                           paper: classes.drawerPaper,
                        }}
                     >
                        {/* <Typography>BookMarks</Typography>
              <Hidden lgDown>
                <Typography>LG</Typography>
              </Hidden>
              <Hidden lgUp>
                <Typography>MD</Typography>
              </Hidden> */}

                        <Map />
                     </Drawer>
                  </Hidden>
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
                     <Route path="/profile">
                        <Profile />
                     </Route>
                     <Route path="/bookmarks">
                        <Bookmarks />
                     </Route>
                     <Route path="/boardinghouse/:bhId">
                        <BoardingHouseProfile />
                     </Route>
                     <Route path="/rooms/:roomId">
                        <RoomProfile />
                     </Route>
                     <Route path="*">
                        <Container maxWidth="sm">
                           <Typography variant="h6" align="center">
                              Error 404 page not found.
                           </Typography>
                        </Container>
                     </Route>
                  </Switch>
                  <Hidden lgUp>
                     <MobilePageNavigation className={classes.mainNavigation} />
                  </Hidden>
                  <Hidden lgDown>
                     <DeskPageNavigation />
                  </Hidden>
               </Router>
               {/* </Box> */}
               {/* <Hidden xlDown>
            <Map />
          </Hidden> */}
            </Container>
         </LoginContextProvider>
      </ThemeProvider>
   );
};

export default App;
