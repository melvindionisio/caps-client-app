import React from "react";
import { Button, Container, Box, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const AboutApp = () => {
   const history = useHistory();
   return (
      <Container
         maxWidth="lg"
         disableGutters
         sx={{ position: "relative", height: "100vh" }}
      >
         <Button
            variant="contained"
            size="small"
            sx={{
               position: "absolute",
               top: ".5rem",
               left: ".5rem",
            }}
            onClick={() => history.push("/home")}
         >
            back
         </Button>
         <Box
            sx={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               flexDirection: "column",
               height: "100%",
            }}
         >
            <Typography
               variant="h6"
               align="center"
               sx={{ textTransform: "uppercase" }}
            >
               About Search 'N Stay
            </Typography>
            <Typography
               variant="body1"
               align="center"
               color="text.secondary"
               sx={{ width: 300, mt: 2 }}
            >
               This app is for a Capstone Project by Melvin Dionisio, Ivan
               Joseph G. Arang, Jhelan T. Anabo.
            </Typography>

            <Typography
               variant="caption"
               align="center"
               color="text.secondary"
               sx={{ width: 300, mt: 5 }}
            >
               {" "}
               All rights reserve 2021.
            </Typography>
         </Box>
      </Container>
   );
};

export default AboutApp;
