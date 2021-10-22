import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navigation from "../components/Navigation";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useState } from "react";

import { makeStyles } from "@mui/styles";
// import { lightBlue } from "@mui/material/colors";
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

  const login = (e) => {
    e.preventDefault();
    // validate first
    if (username !== "" && password !== "") {
      console.log(`Username: ${username} Password: ${password}`);
    } else if (username === "" && password === "") {
      setMessage("Please enter values!");
    } else {
      setMessage(`${username ?? password} is incorrect!`);
    }
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
                  type="email"
                  margin="none"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="filled"
                  size="medium"
                  className={classes.textfield}
                  color="primary"
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
          </form>
        </Box>
      </Container>
    </Slide>
  );
};

export default Login;
