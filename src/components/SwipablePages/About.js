import React, { useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Box,
  IconButton,
  CardContent,
  List,
  ListItem,
} from "@mui/material";
import { amber, blue, grey, cyan, lightBlue } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import GradeIcon from "@mui/icons-material/Grade";

const useStyles = makeStyles({
  avatar: {
    background: amber[700],
  },
  appbar: {
    padding: ".6rem .9rem",
    background: blue[600],
  },
  container: {
    padding: ".5rem",
    paddingTop: "1rem",
  },

  gradeIcon: {
    color: "#fff",
  },
  gradeIconActive: {
    color: amber[300],
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    color: blue[50],
  },

  infoCard: {
    border: "none",
    background: grey[100],
  },
  margin: {
    marginRight: "3px",
    marginLeft: "3px",
  },
  loaderContainer: {
    height: "100vh",
    width: "100vw",
    position: "absolute",
    top: "0",
    left: "0",
    display: "grid",
    placeItems: "center",
  },
  loader: {
    // placeSelf: "center",
  },
});

const About = ({ boardinghouse }) => {
  const classes = useStyles();
  const [starred, setStarred] = useState(false);
  const [stars, setStars] = useState(null);

  const addStar = () => {
    setStarred(!starred);
    setStars(boardinghouse && boardinghouse.popularity);
    if (!starred) setStars(boardinghouse.popularity + 1);
  };

  return (
    <Container
      maxWidth="md"
      disableGutters
      sx={{
        padding: 2,
        paddingBottom: "5rem",
        height: "85vh",
        overflowY: "auto",
      }}
    >
      <Card
        // variant="outlined"
        sx={{
          padding: "0rem",
          margin: "0rem",
          outline: "none",
          marginBottom: 1,
          border: "none",
          background: `linear-gradient(to bottom right, ${cyan[300]}, ${lightBlue[400]}, ${blue[500]})`,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              variant="rounded"
              sx={{
                background: blue[500],
                height: 60,
                width: 60,
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              {boardinghouse.name.charAt(0)}
            </Avatar>
          }
          title={
            <Typography
              variant="h6"
              sx={{ color: "#fff", fontFamily: "Quicksand" }}
            >
              {boardinghouse.name}
            </Typography>
          }
          subheader={
            <Box
              sx={{
                display: "flex",
                itemsCenter: "center",
              }}
            >
              <GradeIcon
                fontSize="small"
                className={`${classes.gradeIconActive} ${classes.margin}`}
              />
              <Typography variant="body2" color="textSecondary">
                {stars || boardinghouse.popularity || 0} stars
              </Typography>
            </Box>
          }
          action={
            <IconButton size="medium">
              <GradeIcon
                fontSize="large"
                className={
                  starred ? classes.gradeIconActive : classes.gradeIcon
                }
                onClick={addStar}
              />
            </IconButton>
          }
        />
      </Card>

      <Card>
        <CardContent>
          <List>
            <ListItem divider>
              <Typography variant="body1" color="initial">
                {boardinghouse.completeAddress}
              </Typography>
            </ListItem>
            <ListItem divider>
              <Typography variant="body1" color="initial">
                {boardinghouse.contacts}
              </Typography>
            </ListItem>
            <ListItem divider>
              <Typography variant="body1" color="initial">
                {boardinghouse.tagline}
              </Typography>
            </ListItem>
            <ListItem divider>
              <Typography variant="body1" color="initial">
                {boardinghouse.owner}
              </Typography>
            </ListItem>
            <ListItem divider>
              <Typography variant="body1" color="initial">
                {boardinghouse.completeAddress}
              </Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;
