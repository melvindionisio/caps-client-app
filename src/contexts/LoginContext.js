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

  const value = {
    clientId,
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    setCurrentUser,
    isSuccess,
    setIsSuccess,
  };

  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
