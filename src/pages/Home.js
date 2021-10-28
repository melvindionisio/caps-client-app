import React from "react";
import Navbar from "../components/Navbar";
import {
  Container,
  Slide,
  Box,
  Card,
  CardHeader,
  CardActions,
  Button,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
// import { Link } from "react-router-dom";

const owners = ["Melvin", "Ivan", "Jhelan", "Ranel", "Marl"];

const House = ({ owner }) => {
  return (
    <Card variant="outlined">
      <CardHeader
        title={owner}
        subheader="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius
                  dolores recusandae corrupti error aliquam tempore, repudiandae
                  nisi aperiam totam, impedit nihil nulla officia id sed
                  temporibus porro qui sequi fugiat?"
        action={
          <IconButton>
            <MoreIcon fontSize="small" />
          </IconButton>
        }
      />
      <Divider />
      <CardActions>
        <Button variant="outlined" size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

const Home = () => {
  return (
    <Slide in={true} direction="left">
      <Container
        disableGutters
        maxWidth="xl"
        sx={{ height: "100vh", width: "100vw", overflowY: "auto" }}
      >
        <Navbar />
        <Box p={1} pb={8} style={{ maxWidth: "85rem", margin: "0 auto" }}>
          <Grid container spacing={1}>
            {owners.map((owner) => (
              <Grid item lg={4} md={6} sm={6} key={owner}>
                <House owner={owner} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Slide>
  );
};

export default Home;
