import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import { domain } from "../fetch-url/fetchUrl";
import LoadingButton from "@mui/lab/LoadingButton";
import { useHistory } from "react-router-dom";

const Register = () => {
   const history = useHistory();
   const [username, setUserName] = useState("");
   const [fullName, setFullName] = useState("");
   const [password, setPassword] = useState("");
   const [repeatPassword, setRepeatPassword] = useState("");

   const [isRegReady, setIsRegReady] = useState(false);
   const [isPasswordError, setIsPasswordError] = useState(false);
   const [errorMessage, setErrorMessage] = useState("Register");
   const [errorLevel, setErrorLevel] = useState("info");

   const [isPending, setIsPending] = useState(false);
   const handleRegistration = async (e) => {
      setIsPending(true);
      e.preventDefault();
      const registrationInfo = {
         username: username,
         fullName: fullName,
         password: "",
      };

      if (username && password && fullName && repeatPassword !== (null || ""))
         if (password === repeatPassword && password && repeatPassword !== "") {
            registrationInfo.password = password;
            setTimeout(() => {
               fetch(`${domain}/api/seekers/register`, {
                  method: "POST",
                  body: JSON.stringify({
                     name: registrationInfo.fullName,
                     username: registrationInfo.username,
                     password: registrationInfo.password,
                  }),
                  headers: {
                     "Content-Type": "application/json",
                  },
               })
                  .then((res) => {
                     return res.json();
                  })
                  .then((data) => {
                     console.log(data);
                     setUserName("");
                     setFullName("");
                     setPassword("");
                     setRepeatPassword("");

                     setErrorMessage("Successfully registered!");
                     setErrorLevel("success");
                     setIsPending(false);
                     history.push("/login");
                  })
                  .catch((err) => {
                     console.log(err);
                     setIsPending(false);
                  });
            }, 2000);
         } else {
            setErrorMessage("Password does not match.");
            setErrorLevel("warning");
            setIsPasswordError(true);
            setIsPending(false);
         }
      else {
         setErrorMessage("Please complete all fields");
         setErrorLevel("warning");
         setIsPending(false);
      }
   };

   useEffect(() => {
      if (username && fullName && password && repeatPassword !== "") {
         setIsRegReady(true);
      }
   }, [username, fullName, password, repeatPassword]);

   useEffect(() => {
      setIsPasswordError(false);
   }, [password, repeatPassword]);

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
                              severity={errorLevel}
                           >
                              {errorMessage}
                           </Alert>
                        }
                     />
                     <CardContent>
                        <TextField
                           id="username"
                           name="username"
                           label="Username"
                           variant="filled"
                           size="medium"
                           color="primary"
                           type="text"
                           margin="none"
                           fullWidth
                           required
                           autoComplete="off"
                           helperText="Your prefered username. (e.g. shoolboy89)"
                           value={username}
                           onChange={(e) => setUserName(e.target.value)}
                        />

                        <TextField
                           id="name"
                           name="full-name"
                           label="Full Name"
                           variant="filled"
                           size="medium"
                           required
                           color="primary"
                           type="text"
                           margin="dense"
                           fullWidth
                           autoComplete="off"
                           value={fullName}
                           onChange={(e) => setFullName(e.target.value)}
                        />

                        <TextField
                           id="password"
                           name="password"
                           label="Password"
                           type="password"
                           required
                           variant="filled"
                           size="medium"
                           color="primary"
                           error={isPasswordError}
                           margin="dense"
                           fullWidth
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                           id="repeat-password"
                           name="repeat-password"
                           label="Repeat Password"
                           type="password"
                           required
                           error={isPasswordError}
                           variant="filled"
                           size="medium"
                           color="primary"
                           margin="dense"
                           fullWidth
                           value={repeatPassword}
                           onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                     </CardContent>
                     <CardActions sx={{ padding: 0 }}>
                        <LoadingButton
                           variant="contained"
                           loading={isPending}
                           size="large"
                           disabled={!isRegReady}
                           type="submit"
                           sx={{
                              marginTop: ".3rem",
                              borderRadius: 0,
                              width: "100%",
                           }}
                           onClick={handleRegistration}
                        >
                           Register Now!
                        </LoadingButton>
                     </CardActions>
                  </Card>
               </form>
               <Typography
                  variant="body1"
                  color="initial"
                  align="center"
                  sx={{ textDecoration: "none", py: 3, fontSize: 14 }}
               >
                  If you already have an account. You can proceed to{" "}
                  <Link to="/login">Login</Link>
               </Typography>
            </Box>
         </Container>
      </Slide>
   );
};

export default Register;
