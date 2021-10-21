import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navigation from "../components/Navigation";
import Slide from "@mui/material/Slide";

const Register = () => {
  return (
    <Slide in={true} direction="right">
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          height: "100vh",
          width: "100vw",
          overflowY: "auto",
        }}
      >
        <Navigation>
          <Typography variant="body1" align="center">
            Register
          </Typography>
        </Navigation>
      </Container>
    </Slide>
  );
};

export default Register;
