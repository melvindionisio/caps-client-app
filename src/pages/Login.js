import React, { useState, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ReusableNavigation from "../components/Navigations/ReusableNavigation";
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

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { makeStyles } from "@mui/styles";
import { amber } from "@mui/material/colors";
import { LoginContext } from "../contexts/LoginContext";
import { useContext } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  textfield: {},
});

const Login = () => {
  const classes = useStyles();
  const { clientId, setIsLoggedIn, setCurrentUser, setIsSuccess } =
    useContext(LoginContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Login with your account.");
  const [isError, setIsError] = useState(false);
  const [errorLevel, setErrorLevel] = useState("info");
  const input = useRef(null);
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    // validate first
    if (username !== "" && password !== "") {
      fetch("http://localhost:3500/api/seekers/login", {
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
            history.push("/");
            console.log(data);

            setIsLoggedIn(true);
            setCurrentUser({
              id: data.seeker_id,
              name: data.seeker_name,
              username: data.seeker_username,
            });
          } else if (data.status === "incorrect") {
            setMessage(data.message);
            setErrorLevel("warning");
          } else {
            setMessage(data.message);
            setErrorLevel("warning");
          }
        });

      console.log(`Username: ${username} Password: ${password}`);
    } else {
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
                  className={classes.textfield}
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
                  className={classes.textfield}
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
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{ marginTop: ".3rem", borderRadius: 0, width: "100%" }}
                  onClick={handleLogin}
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
