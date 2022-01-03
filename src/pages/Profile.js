import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { blue, lightBlue, cyan } from "@mui/material/colors";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import EditIcon from "@mui/icons-material/Edit";

import ReusableNavigation from "../components/Navigations/ReusableNavigation";
import { IconButton } from "@mui/material";

const Profile = () => {
  const { currentUser } = useContext(LoginContext);

  return (
    <Slide in={true} direction="left">
      <Container maxWidth="lg" disableGutters>
        <ReusableNavigation>
          <Typography variant="body1" align="center">
            Profile
          </Typography>
        </ReusableNavigation>
        <Box sx={{ p: 2 }}>
          <Card
            sx={{
              width: "80%",
              background: `linear-gradient(to bottom right, ${cyan[300]}, ${lightBlue[400]}, ${blue[500]})`,
              margin: "0 auto",
              position: "relative",
            }}
            // variant="outlined"
            elevation={3}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: ".7rem",
                right: ".7rem",
                color: lightBlue[900],
                background: lightBlue[200],
                "&:hover": {
                  background: lightBlue[100],
                },
              }}
              size="medium"
            >
              <EditIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
                pt: 3,
              }}
            >
              <Avatar
                sx={{
                  height: "8rem",
                  width: "8rem",
                  background: "#lightgrey",
                  border: "3px solid",
                  borderColor: "background.default",
                }}
                src={currentUser.picture ?? "none"}
              />
            </Box>
            <CardHeader
              sx={{ m: 0, p: 0, pb: 2 }}
              title={
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "white",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                  align="center"
                >
                  {currentUser.name ?? "UserName"}
                </Typography>
              }
              subheader={
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "white",
                    display: "block",
                    fontWeight: "light",
                  }}
                  align="center"
                >
                  {currentUser.email ?? currentUser.username}
                </Typography>
              }
            />
          </Card>
        </Box>
      </Container>
    </Slide>
  );
};

export default Profile;
