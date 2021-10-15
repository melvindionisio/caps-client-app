import React from "react";
import Navbar from "../components/Navbar";
import { Container, Slide } from "@mui/material";
// import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Slide in={true} direction="left">
      <Container
        disableGutters
        maxWidth="xl"
        sx={{ height: "100vh", width: "100vw" }}
      >
        <Navbar />
      </Container>
    </Slide>
  );
};

export default Home;
