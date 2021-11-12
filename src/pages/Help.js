import React from "react";
import {
  Box,
  Typography,
  AppBar,
  TextField,
  Button,
  Divider,
  Fade,
  Slide,
  // Grid,
  Container,
} from "@mui/material";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutline";
import { useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { blue, pink } from "@mui/material/colors";

import HelpList from "../components/lists/HelpList";

const useStyles = makeStyles({
  rootContainer: {
    position: "relative",
  },
  help: {
    color: blue[600],
    fontSize: 60,
    padding: "1.5rem 0rem 0rem 1.5rem",
  },

  paper: {
    marginTop: "1rem",
    padding: ".5rem",
    marginBottom: "1rem",
  },
  steps: {
    margin: "1rem 0rem .5rem 0rem",
    background: pink[400],
  },

  stepPicture: {
    borderRadius: "1rem",
  },

  btnContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const Help = () => {
  const classes = useStyles();
  const top = useRef(null);

  useEffect(() => {
    top.current.scrollIntoView();
  });

  return (
    <Fade in={true} ref={top}>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          width: "100vw",
          overflowY: "auto",
        }}
      >
        <Slide in={true} direction="left">
          <Box sx={{ background: "white" }}>
            <HelpOutlinedIcon className={classes.help} fontSize="large" />
          </Box>
        </Slide>
        <Slide in={true} direction="left">
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              background: "white",
              padding: ".7rem 2rem",
              borderBottom: "1px solid rgba(0,0,0,0.2)",
            }}
          >
            <Typography variant="h4" color="primary">
              Help Center
            </Typography>
          </AppBar>
        </Slide>
        <Slide in={true} direction="up">
          <Box style={{ paddingBottom: "5rem" }}>
            <Box style={{ padding: "1.5rem " }}>
              <Typography gutterBottom variant="body2">
                If you encountered any problem, here are some guides to maximize
                the use of this project. Feel free to browse below.
              </Typography>

              <HelpList />
            </Box>
            <Divider />
            <form
              style={{
                background: "#fff",
                paddingTop: 0,
                padding: "1.5rem",
              }}
              action="https://formsubmit.co/melvinnudo.dionisio021@gmail.com"
              method="POST"
            >
              <Typography variant="body1">
                Want to know more? Questions? Suggestions?
              </Typography>
              <Typography gutterBottom variant="h5">
                Send us a message!
              </Typography>
              <TextField
                name="email"
                sx={{ mt: 1 }}
                fullWidth
                variant="filled"
                label="Email"
              />
              <TextField
                name="message"
                sx={{ mt: 2 }}
                multiline
                rows={4}
                fullWidth
                variant="filled"
                label="Message"
              />
              <Box pt={1} className={classes.btnContainer}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.field}
                >
                  SEND
                </Button>
              </Box>
            </form>
          </Box>
        </Slide>
        <Typography
          variant="caption"
          align="center"
          sx={{
            color: "#555",
            textAlign: "center",
            marginBottom: ".5rem",
            display: "block",
          }}
        >
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by Lavezares Boys
        </Typography>
      </Container>
    </Fade>
  );
};

export default Help;
