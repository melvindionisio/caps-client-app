import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

import ReusableNavigation from "../components/Navigations/ReusableNavigation";

const Bookmarks = () => {
  return (
    <Slide in={true} direction="left">
      <Container maxWidth="lg" disableGutters>
        <ReusableNavigation center={true}>
          <Typography variant="body1" align="center">
            Bookmarks Page
          </Typography>
        </ReusableNavigation>
      </Container>
    </Slide>
  );
};

export default Bookmarks;
