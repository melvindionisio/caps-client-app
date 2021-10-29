import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ReusableNavigation from "../components/Navigations/ReusableNavigation";
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
        <ReusableNavigation>
          <Typography variant="body1" align="center">
            Register
          </Typography>
        </ReusableNavigation>
      </Container>
    </Slide>
  );
};

export default Register;
