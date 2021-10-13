import React from "react";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <div>
      <Container disableGutters>
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <Typography variant="h6">Home</Typography>
          </Toolbar>
        </AppBar>
      </Container>
    </div>
  );
};

export default Home;
