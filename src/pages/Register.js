import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ReusableNavigation from "../components/Navigations/ReusableNavigation";
import Slide from "@mui/material/Slide";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const Register = () => {
  const register = () => {};
  return (
    <Slide in={true} direction="right">
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          width: "100vw",
          overflowY: "auto",
        }}
      >
        <ReusableNavigation>
          <Typography variant="body1" align="center">
            Register
          </Typography>
        </ReusableNavigation>
        <Box
          p={2}
          sx={{
            width: "80%",
            maxWidth: "40rem",
            margin: "0 auto",
          }}
        >
          <form sx={{ display: "flex" }}>
            <Card variant="outlined">
              <CardHeader
                subheader={
                  <Alert
                    onClose={(e) => {
                      e.target.parentElement.parentElement.parentElement.parentElement.style.display =
                        "none";
                    }}
                    severity="info"
                  >
                    Register
                  </Alert>
                }
              />
              <CardContent>
                <TextField
                  id="username"
                  label="Username"
                  variant="filled"
                  size="medium"
                  color="primary"
                  type="email"
                  margin="none"
                  fullWidth
                  helperText="Your prefered username. (e.g. shoolboy89)"
                />

                <TextField
                  id="name"
                  label="Full Name"
                  variant="filled"
                  size="medium"
                  color="primary"
                  type="text"
                  margin="dense"
                  fullWidth
                />

                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="filled"
                  size="medium"
                  color="primary"
                  margin="dense"
                  fullWidth
                />
                <TextField
                  id="password"
                  label="Repeat Password"
                  type="password"
                  variant="filled"
                  size="medium"
                  color="primary"
                  margin="dense"
                  fullWidth
                />
              </CardContent>
              <CardActions sx={{ padding: 0 }}>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{ marginTop: ".3rem", borderRadius: 0, width: "100%" }}
                  onClick={register}
                >
                  Register Now!
                </Button>
              </CardActions>
            </Card>
          </form>
        </Box>
      </Container>
    </Slide>
  );
};

export default Register;
