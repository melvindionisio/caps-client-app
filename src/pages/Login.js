import React, { useState, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ReusableNavigation from "../components/Navigations/ReusableNavigation";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/system/Box";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import LoadingButton from "@mui/lab/LoadingButton";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { amber } from "@mui/material/colors";
import { LoginContext } from "../contexts/LoginContext";
import { useContext } from "react";
import { useHistory } from "react-router";
import { domain } from "../fetch-url/fetchUrl";

const Login = () => {
   const { clientId, setIsLoggedIn, setCurrentUser, setIsSuccess } =
      useContext(LoginContext);

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [message, setMessage] = useState("Login with your account.");
   const [isError, setIsError] = useState(false);
   const [errorLevel, setErrorLevel] = useState("info");
   const [isPending, setIsPending] = useState(false);
   const input = useRef(null);
   const history = useHistory();

   const handleLogin = (e) => {
      e.preventDefault();
      setIsPending(true);
      // validate first
      if (username !== "" && password !== "") {
         setTimeout(() => {
            fetch(`${domain}/api/seekers/login`, {
               method: "POST",
               body: JSON.stringify({
                  username: username,
                  password: password,
               }),
               headers: {
                  "Content-Type": "application/json",
               },
            })
               .then((res) => {
                  return res.json();
               })
               .then((data) => {
                  if (data.status === "success") {
                     setIsPending(false);
                     history.push("/");
                     setIsLoggedIn({ isLoggedIn: true, loginType: "normal" });
                     setCurrentUser({
                        id: data.seeker_id,
                        name: data.seeker_name,
                        username: data.seeker_username,
                     });
                  } else if (data.status === "incorrect") {
                     setIsPending(false);
                     setMessage(data.message);
                     setErrorLevel("warning");
                  } else {
                     setIsPending(false);
                     setMessage(data.message);
                     setErrorLevel("warning");
                  }
               });
         }, 2000);
      } else {
         setIsPending(false);
         setMessage("Please complete all fields.");
         setIsError(true);
         setErrorLevel("warning");
         input.current.lastElementChild.firstElementChild.focus();
      }
   };

   useEffect(() => {
      setIsError(false);
   }, [username, password]);

   const loginGoogle = (response) => {
      setIsLoggedIn(true);
      setCurrentUser({
         googleId: response.profileObj.googleId,
         email: response.profileObj.email,
         name: response.profileObj.name,
         picture: response.profileObj.imageUrl,
      });
      console.log(response);
      history.push("/home");
      setIsSuccess(true);
   };
   const responseFacebook = (response) => {
      console.log(response);
   };

   return (
      <Slide in={true} direction="right">
         <Container
            disableGutters
            maxWidth="xl"
            sx={{
               width: "100vw",
               overflowY: "auto",
            }}
         >
            <ReusableNavigation>
               <Typography variant="body1" align="center">
                  Login
               </Typography>
            </ReusableNavigation>
            <Box
               p={2}
               sx={{
                  width: "80%",
                  maxWidth: "40rem",
                  margin: "0 auto",
               }}
            >
               <form sx={{ display: "flex" }}>
                  <Card variant="outlined">
                     <CardHeader
                        subheader={
                           <Alert
                              onClose={(e) => {
                                 e.target.parentElement.parentElement.parentElement.parentElement.style.display =
                                    "none";
                              }}
                              severity={errorLevel}
                           >
                              {message}
                           </Alert>
                        }
                     />
                     <CardContent>
                        <TextField
                           id="username"
                           label="Username"
                           variant="filled"
                           size="medium"
                           // helperText="No username exist!"
                           color="primary"
                           error={isError}
                           type="email"
                           margin="none"
                           fullWidth
                           required
                           autoFocus
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           ref={input}
                        />

                        <TextField
                           id="password"
                           label="Password"
                           type="password"
                           variant="filled"
                           size="medium"
                           color="primary"
                           error={isError}
                           margin="dense"
                           fullWidth
                           required
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </CardContent>
                     <CardActions sx={{ padding: 0 }}>
                        <LoadingButton
                           variant="contained"
                           loading={isPending}
                           loadingIndicator="Logging in..."
                           size="large"
                           type="submit"
                           sx={{
                              marginTop: ".3rem",
                              borderRadius: 0,
                              width: "100%",
                           }}
                           onClick={handleLogin}
                        >
                           Login
                        </LoadingButton>
                     </CardActions>
                  </Card>
                  <Typography
                     variant="body1"
                     align="center"
                     style={{ marginTop: "1rem" }}
                  >
                     OR
                  </Typography>
                  <Card style={{ marginTop: "1rem" }} variant="outlined">
                     <CardHeader
                        title={
                           <Typography variant="body1" align="center">
                              Continue with
                           </Typography>
                        }
                        style={{ padding: "1rem", paddingBottom: "0rem" }}
                     />
                     <CardContent
                        style={{
                           display: "flex",
                           justifyContent: "space-evenly",
                           padding: ".5rem",
                           paddingBottom: "1rem",
                        }}
                     >
                        <GoogleLogin
                           clientId={clientId}
                           render={(renderProps) => (
                              <Box
                                 style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                 }}
                              >
                                 <IconButton
                                    size="large"
                                    style={{ color: amber[400] }}
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                 >
                                    <GoogleIcon fontSize="large" />
                                 </IconButton>
                                 <Typography>Google</Typography>
                              </Box>
                           )}
                           onSuccess={loginGoogle}
                           onFailure={() => console.log("Google login failed.")}
                           cookiePolicy={"single_host_origin"}
                           isSignedIn={true}
                        />

                        <FacebookLogin
                           appId="1088597931155576"
                           // autoLoad={true}
                           fields="name,email,picture"
                           callback={responseFacebook}
                           render={(renderProps) => (
                              <Box
                                 style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                 }}
                              >
                                 <IconButton
                                    color="primary"
                                    size="large"
                                    // onClick={renderProps.onClick}
                                    // disabled={renderProps.disabled}
                                 >
                                    <FacebookIcon fontSize="large" />
                                 </IconButton>
                                 <Typography as="label">Facebook</Typography>
                              </Box>
                           )}
                        />
                     </CardContent>
                  </Card>
               </form>
            </Box>
         </Container>
      </Slide>
   );
};

export default Login;
