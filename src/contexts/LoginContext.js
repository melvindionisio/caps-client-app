import { createContext } from "react";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useState } from "react";

export const LoginContext = createContext();

function LoginContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("loggedIn", false);
  const [currentUser, setCurrentUser] = useLocalStorage(
    "user",
    "not logged in"
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const clientId =
    "1088575893079-uuebeab7q5261f16gufrvs5no25dotlr.apps.googleusercontent.com";

  const handleGoogleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({
      googleId: null,
      email: null,
      name: null,
      picture: null,
    });
    console.log(isLoggedIn);
  };

  const handleGoogleLogin = (response) => {
    setIsLoggedIn(true);
    setCurrentUser({
      googleId: response.profileObj.googleId,
      email: response.profileObj.email,
      name: response.profileObj.name,
      picture: response.profileObj.imageUrl,
    });
    console.log(response);
    setIsSuccess(true);
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
    handleGoogleLogout,
  };

  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
