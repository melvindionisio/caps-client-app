import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
          width: "100vw",
          overflowY: "auto",
        }}
      >
        <ReusableNavigation>
          <Typography variant="body1" align="center">
            Register
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
          <Typography align="center">Registration Form here!</Typography>
        </Box>
      </Container>
    </Slide>
  );
};

export default Register;
