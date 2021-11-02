import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

import ReusableNavigation from "../components/Navigations/ReusableNavigation";

const Profile = () => {
  return (
    <Slide in={true} direction="left">
      <Container maxWidth="lg" disableGutters>
        <ReusableNavigation>
          <Typography variant="body1" align="center">
            Profile Page
          </Typography>
        </ReusableNavigation>
      </Container>
    </Slide>
  );
};

export default Profile;
