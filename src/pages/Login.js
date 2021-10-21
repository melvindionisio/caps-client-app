import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navigation from "../components/Navigation";
import Slide from "@mui/material/Slide";
// import { grey } from "@mui/material/colors";

const Login = () => {
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
        }}
      >
        <Navigation>
          <Typography variant="body1" align="center">
            Login
          </Typography>
        </Navigation>
      </Container>
    </Slide>
  );
};

export default Login;
