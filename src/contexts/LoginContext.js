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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({
      googleId: null,
      facebookId: null,
      name: null,
      email: null,
      picture: null,
      username: null,
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

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   // validate first
  //   if (username !== "" && password !== "") {
  //     fetch("http://localhost:3500/api/seekers/login", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         username: username,
  //         password: password,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         if (data.status === "success") {
  //           setMessage(data.message);
  //           setErrorLevel("success");
  //           history.push("/");
  //         } else if (data.status === "incorrect") {
  //           setMessage(data.message);
  //           setErrorLevel("warning");
  //         } else {
  //           setMessage(data.message);
  //           setErrorLevel("warning");
  //         }
  //       });

  //     console.log(`Username: ${username} Password: ${password}`);
  //   } else {
  //     setMessage("Please complete all fields.");
  //     setIsError(true);
  //     setErrorLevel("warning");
  //     input.current.lastElementChild.firstElementChild.focus();
  //   }
  // };

  const value = {
    clientId,
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    setCurrentUser,
    isSuccess,
    setIsSuccess,
    handleGoogleLogin,
    handleLogout,
  };

  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
