import { createContext } from "react";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useState } from "react";
//import { domain } from "../fetch-url/fetchUrl";

export const LoginContext = createContext();

function LoginContextProvider(props) {
   const [isLoggedIn, setIsLoggedIn] = useLocalStorage("loggedIn ", {
      isLoggedIn: false,
   });

   const [currentUser, setCurrentUser] = useLocalStorage(
      "user",
      "not logged in"
   );
   const [isSuccess, setIsSuccess] = useState(false);
   const clientId =
      "1088575893079-uuebeab7q5261f16gufrvs5no25dotlr.apps.googleusercontent.com";

   const handleLogout = () => {
      setIsLoggedIn(false);
      setCurrentUser({
         id: null,
         googleId: null,
         facebookId: null,
         name: null,
         email: null,
         picture: null,
         username: null,
      });
   };

   const handleGoogleLogin = (response) => {
      setIsLoggedIn({ isLoggedIn: true, loginType: "google-login" });
      setCurrentUser({
         googleId: response.profileObj.googleId,
         facebookId: null,
         name: response.profileObj.name,
         email: response.profileObj.email,
         picture: response.profileObj.imageUrl,
         //username: response.profileObj
      });
      //console.log(response);
      setIsSuccess(true);

      //CHECK if the user google id is existing if not, store to db, if yes, get userId
   };

   const handleFacebookLogin = (response) => {
      setIsLoggedIn({ isLoggedIn: true, loginType: "facebook-login" });
      setCurrentUser({
         googleId: null,
         facebookId: response.profileObj.facebookId,
         name: response.profileObj.name,
         email: response.profileObj.email,
         picture: response.profileObj.imageUrl,
         //username: response.profileObj
      });
      console.log(response);
      setIsSuccess(true);

      //CHECK if the user google id is existing if not, store to db, if yes, get userId
   };

   const value = {
      clientId,
      isLoggedIn,
      setIsLoggedIn,
      currentUser,
      setCurrentUser,
      isSuccess,
      setIsSuccess,
      handleGoogleLogin,
      handleFacebookLogin,
      handleLogout,
   };

   return (
      <LoginContext.Provider value={value}>
         {props.children}
      </LoginContext.Provider>
   );
}

export default LoginContextProvider;
