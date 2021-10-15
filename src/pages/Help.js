import React from "react";
import { Container, Slide } from "@mui/material";

const Help = () => {
  return (
    <Slide in={true} direction="up">
      <Container
        disableGutters
        maxWidth="xl"
        sx={{ height: "100vh", width: "100vw" }}
      >
        Help
      </Container>
    </Slide>
  );
};

export default Help;
