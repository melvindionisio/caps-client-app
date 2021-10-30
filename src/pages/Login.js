import React, { useState, useRef } from "react";
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
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  textfield: {},
});

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Login with your account.");
  const [isError, setIsError] = useState(false);
  const input = useRef(null);
  const history = useHistory();

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

  const { setIsLoggedIn, setUserName, setProfilePic, clientId } =
    useContext(LoginContext);

  const responseGoogle = (response) => {
    setUserName(response.profileObj.name);
    setIsLoggedIn(true);
    setProfilePic(response.profileObj.imageUrl);
    console.log(response);
    history.push("/home");
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
              </CardContent>
              <CardActions sx={{ padding: 0 }}>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{ marginTop: ".3rem", borderRadius: 0, width: "100%" }}
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
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
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
