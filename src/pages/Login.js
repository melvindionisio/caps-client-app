import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navigation from "../components/Navigation";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useState, useRef } from "react";
import GoogleLogin from "react-google-login";
// import { GoogleLogout } from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { makeStyles } from "@mui/styles";
import { amber } from "@mui/material/colors";
// import AccountCircle from "@mui/icons-material/AccountCircle";

const useStyles = makeStyles({
  textfield: {
    // "& .MuiFilledInput-root": {
    //   background: lightBlue[50],
    //   "&:hover": {
    //     background: lightBlue[100],
    //   },
    // },
  },
});

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Login with your account.");
  const [isError, setIsError] = useState(false);
  const input = useRef(null);

  const login = (e) => {
    e.preventDefault();
    // validate first
    if (username !== "" && password !== "") {
      console.log(`Username: ${username} Password: ${password}`);
    } else if (username === "" && password === "") {
      setMessage("Please enter values!");
      setIsError(true);
      input.current.lastElementChild.firstElementChild.focus();
    } else {
      setMessage(`${username ?? password} is incorrect!`);
      setIsError(true);
    }
  };

  const clientId =
    "1088575893079-uuebeab7q5261f16gufrvs5no25dotlr.apps.googleusercontent.com";

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [name, setName] = useState();
  // const [profilePic, setProfilePic] = useState();

  const responseGoogle = (response) => {
    // setName(response.profileObj.name);
    // setIsLoggedIn(true);
    // setProfilePic(response.profileObj.imageUrl);
    console.log(response);
  };

  // const logout = () => {
  //   setName(null);
  //   setIsLoggedIn(false);
  // };

  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <Slide in={true} direction="right">
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          height: "100vh",
          width: "100vw",
          overflowY: "auto",
          // background: grey[900],
          position: "relative",
        }}
      >
        <Navigation>
          <Typography variant="body1" align="center">
            Login
          </Typography>
        </Navigation>
        <Box
          p={2}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "40rem",
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
                    severity="info"
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
                  className={classes.textfield}
                  // helperText="No username exist!"
                  color="primary"
                  error={isError}
                  type="email"
                  margin="none"
                  fullWidth
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
                  className={classes.textfield}
                  color="primary"
                  error={isError}
                  margin="dense"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/*             
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    id="username"
                    label="Username"
                    variant="standard"
                    margin="none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    variant="standard"
                    margin="dense"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                  />
                </Box> */}
              </CardContent>
              <CardActions sx={{ padding: 0 }}>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{ marginTop: ".3rem", borderRadius: 0 }}
                  fullWidth
                  onClick={login}
                >
                  Login
                </Button>
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
                        // onClick={renderProps.onClick}
                        // disabled={renderProps.disabled}
                      >
                        <GoogleIcon fontSize="large" />
                      </IconButton>
                      <Typography>Google</Typography>
                    </Box>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
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
