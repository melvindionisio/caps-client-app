import React, { useCallback, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

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
import AboutApp from "./pages/AboutApp";

import useOnlineStatus from "./hooks/useOnlineStatus";

export default function Routes({
   setShowStatusMessage,
   setStatusMessage,
   setStatusMessageSeverity,
}) {
   const isOnline = useOnlineStatus();
   const handleOnline = useCallback(() => {
      setShowStatusMessage(() => setShowStatusMessage(true));
      setStatusMessage(() => setStatusMessage("You are now online"));
      setStatusMessageSeverity(() => setStatusMessageSeverity("success"));
   }, [setShowStatusMessage, setStatusMessage, setStatusMessageSeverity]);

   const handleOffline = useCallback(() => {
      setShowStatusMessage(() => setShowStatusMessage(true));
      setStatusMessage(() =>
         setStatusMessage(
            "You are now either offline or your connection is unstable."
         )
      );
      setStatusMessageSeverity(() => setStatusMessageSeverity("warning"));
   }, [setShowStatusMessage, setStatusMessage, setStatusMessageSeverity]);

   useEffect(() => {
      console.log(isOnline ? "online" : "offline");

      if (isOnline) {
         handleOnline();
      } else {
         handleOffline();
      }
   }, [isOnline, handleOnline, handleOffline]);

   return (
      <>
         <Switch>
            <Route exact path="/">
               <Redirect to="/home" />
            </Route>
            <Route path="/home">
               <Home
                  setShowStatusMessage={setShowStatusMessage}
                  setStatusMessage={setStatusMessage}
                  setStatusMessageSeverity={setStatusMessageSeverity}
               />
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

            <Route path="/about">
               <AboutApp />
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
      </>
   );
}
