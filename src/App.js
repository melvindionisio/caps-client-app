import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "@mui/material/Container";
import Hidden from "@mui/material/Hidden";
//import { Drawer } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blueGrey, blue, amber } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MobilePageNavigation from "./components/Navigations/MobilePageNavigation";
import DeskPageNavigation from "./components/Navigations/DeskPageNavigation";

import LoginContextProvider from "./contexts/LoginContext";
import useAddToHomescreenPrompt from "./hooks/useAddToHomescreenPrompt";
import Notification from "./components/Notification";
import { OnlineStatusProvider } from "./hooks/useOnlineStatus";
import Routes from "./Routes";

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
   const [message, setStatusMessage] = useState("");
   const [showMessage, setShowStatusMessage] = useState(false);
   const [messageSeverity, setStatusMessageSeverity] = useState("");

   return (
      <ThemeProvider theme={theme}>
         <OnlineStatusProvider>
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
                  <Notification
                     showMessage={showMessage}
                     setShowMessage={setShowStatusMessage}
                     messageSeverity={messageSeverity}
                     message={message}
                     duration={3000}
                  />
                  {/* <Box style={{ minHeight: "100vh", width: "100%", overflowY: "auto" }}> */}
                  <Router>
                     {/*
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
                            */}

                     {/* <Typography>BookMarks</Typography>
              <Hidden lgDown>
                <Typography>LG</Typography>
              </Hidden>
              <Hidden lgUp>
                <Typography>MD</Typography>
              </Hidden> */}

                     {/*
                        <Map />
                     </Drawer>
                  </Hidden>


                            */}
                     <Routes
                        setShowStatusMessage={setShowStatusMessage}
                        setStatusMessage={setStatusMessage}
                        setStatusMessageSeverity={setStatusMessageSeverity}
                     />
                     <Hidden lgUp>
                        <MobilePageNavigation
                           className={classes.mainNavigation}
                        />
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
         </OnlineStatusProvider>
      </ThemeProvider>
   );
};

export default App;
