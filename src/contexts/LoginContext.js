import { createContext } from "react";
import React, { useState } from "react";
export const LoginContext = createContext();

function LoginContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState();
  const [profilePic, setProfilePic] = useState();
  const clientId =
    "1088575893079-uuebeab7q5261f16gufrvs5no25dotlr.apps.googleusercontent.com";

  const value = {
    clientId,
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    profilePic,
    setProfilePic,
  };
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
