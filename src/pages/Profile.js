import React, { useState, useEffect } from "react";
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
import { domain } from "../fetch-url/fetchUrl";

import ReusableNavigation from "../components/Navigations/ReusableNavigation";
import {
   IconButton,
   Button,
   CardActions,
   TextField,
   CardContent,
   Alert,
   Grid,
} from "@mui/material";

const Profile = () => {
   const { isLoggedIn, currentUser, setCurrentUser } = useContext(LoginContext);
   const [passwordEditable, setPasswordEditable] = useState(!false);
   const [profileEditable, setProfileEditable] = useState(!false);

   const [name, setName] = useState(currentUser.name);
   const [username, setUsername] = useState(currentUser.username);

   const [currentPassword, setCurrentPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [repeatPassword, setRepeatPassword] = useState("");

   const [profileMessage, setProfileMessage] = useState("");
   const [profileErrorLevel, setProfileErrorLevel] = useState("warning");
   const [isProfileErrorShow, setIsProfileErrorShow] = useState(false);

   const [passwordMessage, setPasswordMessage] = useState("");
   const [passwordErrorLevel, setPasswordErrorLevel] = useState("warning");
   const [isPasswordErrorShow, setIsPasswordErrorShow] = useState(false);

   const handleUpdateProfile = () => {
      fetch(`${domain}/api/seekers/update-seeker-profile/${currentUser.id}`, {
         method: "PUT",
         body: JSON.stringify({
            name: name,
            username: username,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            setProfileMessage(data.message);
            setProfileErrorLevel("success");
            setIsProfileErrorShow(true);
            console.log(data.message);
            setCurrentUser({
               id: currentUser.id,
               name: name,
               username: username,
            });
            setProfileEditable(!profileEditable);
         })
         .catch((err) => {
            setProfileMessage(err);
            setProfileErrorLevel("warning");
            setIsProfileErrorShow(true);
            console.log(err);
         });
   };

   const handleChangePassword = () => {
      if (newPassword === repeatPassword) {
         fetch(
            `${domain}/api/seekers/update-seeker-password/auth/${currentUser.id}`,
            {
               method: "POST",
               body: JSON.stringify({
                  currentPassword: currentPassword,
                  newPassword: newPassword,
               }),
               headers: {
                  "Content-Type": "application/json",
               },
            }
         )
            .then((res) => {
               return res.json();
            })
            .then((data) => {
               setPasswordMessage(data.message);
               setPasswordErrorLevel("success");
               setIsPasswordErrorShow(true);
               console.log(data.message);
               setCurrentPassword("");
               setNewPassword("");
               setRepeatPassword("");
               setPasswordEditable(!passwordEditable);
            })
            .catch((err) => {
               setPasswordMessage(err);
               setPasswordErrorLevel("warning");
               setIsPasswordErrorShow(true);
               console.log(err);
            });
      } else {
         setPasswordMessage("Password does not match!");
         setPasswordErrorLevel("warning");
      }
   };

   useEffect(() => {
      setTimeout(() => {
         if (isProfileErrorShow) {
            setIsProfileErrorShow(false);
         }
         if (isPasswordErrorShow) {
            setIsPasswordErrorShow(false);
         }
      }, 3000);
   }, [isProfileErrorShow, isLoggedIn, isPasswordErrorShow]);

   return (
      <Slide in={true} direction="left">
         <Container
            maxWidth="xl"
            disableGutters
            sx={{ minHeight: "100vh", pb: 2 }}
         >
            <Box sx={{ overflowY: "auto", height: "100vh" }}>
               <ReusableNavigation>
                  <Typography variant="body1" align="center">
                     Profile
                  </Typography>
               </ReusableNavigation>

               <Container maxWidth="md">
                  <Box sx={{ p: 3, px: 5 }}>
                     {isLoggedIn.loginType === "google-login" && (
                        <Typography
                           variant="body1"
                           color="text.secondary"
                           align="center"
                           sx={{ mb: 3 }}
                        >
                           You are logged in using Google.
                        </Typography>
                     )}

                     {isLoggedIn.loginType === "facebook-login" && (
                        <Typography
                           variant="body1"
                           color="text.secondary"
                           align="center"
                           sx={{ mb: 3 }}
                        >
                           You are logged in using Facebook.
                        </Typography>
                     )}
                     <Card
                        sx={{
                           borderRadius: 2,
                           maxWidth: "600px",
                           background: `linear-gradient(to bottom right, ${cyan[300]}, ${lightBlue[400]}, ${blue[500]})`,
                           margin: "0 auto",
                           position: "relative",
                           marginBottom: 2,
                        }}
                        // variant="outlined"
                        elevation={2}
                     >
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
                                 border: "3px solid",
                                 borderColor: "background.default",
                                 fontSize: 40,
                              }}
                              src={currentUser.picture ?? "none"}
                           >
                              {/*
                              {currentUser.picture
                                 ? ""
                                 : currentUser.name.charAt(0).toUpperCase()}
                              */}
                           </Avatar>
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
                     {isLoggedIn.loginType === "normal" && (
                        <Grid container spacing={2}>
                           <Grid item sm={12} md={6} lg={12}>
                              <Card
                                 sx={{
                                    borderRadius: 2,
                                 }}
                                 elevation={0}
                              >
                                 <CardHeader
                                    title={
                                       <Typography
                                          align="center"
                                          color="inherit"
                                          variant="body1"
                                          sx={{
                                             textTransform: "uppercase",
                                             fontFamily: "Quicksand",
                                          }}
                                       >
                                          Change Profile
                                       </Typography>
                                    }
                                    sx={{ pb: 0 }}
                                    action={
                                       <IconButton
                                          onClick={() =>
                                             setProfileEditable(
                                                !profileEditable
                                             )
                                          }
                                       >
                                          <EditIcon />
                                       </IconButton>
                                    }
                                 />
                                 <CardContent>
                                    <TextField
                                       label="Name"
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       size="small"
                                       margin="dense"
                                       fullWidth
                                       variant="outlined"
                                       disabled={profileEditable}
                                    />
                                    <TextField
                                       label="Username"
                                       value={username}
                                       onChange={(e) =>
                                          setUsername(e.target.value)
                                       }
                                       size="small"
                                       margin="dense"
                                       fullWidth
                                       variant="outlined"
                                       disabled={profileEditable}
                                    />
                                 </CardContent>
                                 <CardActions>
                                    <Button
                                       variant="contained"
                                       fullWidth
                                       disableElevation
                                       disabled={profileEditable}
                                       onClick={handleUpdateProfile}
                                    >
                                       Update Profile
                                    </Button>
                                 </CardActions>
                                 <Alert
                                    sx={
                                       isProfileErrorShow
                                          ? { display: "flex" }
                                          : { display: "none" }
                                    }
                                    severity={profileErrorLevel}
                                 >
                                    {profileMessage}
                                 </Alert>
                              </Card>
                           </Grid>

                           <Grid item sm={12} md={6} lg={12}>
                              <Card
                                 sx={{
                                    //width: "80%",
                                    //margin: "0 auto",
                                    //marginTop: 2,
                                    borderRadius: 2,
                                    marginBottom: 4,
                                 }}
                                 elevation={0}
                              >
                                 <CardHeader
                                    title={
                                       <Typography
                                          align="center"
                                          color="inherit"
                                          variant="body1"
                                          sx={{
                                             textTransform: "uppercase",
                                             fontFamily: "Quicksand",
                                          }}
                                       >
                                          Change Password
                                       </Typography>
                                    }
                                    sx={{ pb: 0 }}
                                    action={
                                       <IconButton
                                          onClick={() =>
                                             setPasswordEditable(
                                                !passwordEditable
                                             )
                                          }
                                       >
                                          <EditIcon />
                                       </IconButton>
                                    }
                                 />
                                 <CardContent>
                                    <TextField
                                       label="Current Password"
                                       size="small"
                                       value={currentPassword}
                                       onChange={(e) =>
                                          setCurrentPassword(e.target.value)
                                       }
                                       type="password"
                                       margin="dense"
                                       fullWidth
                                       variant="outlined"
                                       disabled={passwordEditable}
                                    />
                                    <TextField
                                       label="New Password"
                                       size="small"
                                       value={newPassword}
                                       onChange={(e) =>
                                          setNewPassword(e.target.value)
                                       }
                                       type="password"
                                       margin="dense"
                                       fullWidth
                                       variant="outlined"
                                       disabled={passwordEditable}
                                    />
                                    <TextField
                                       label="Repeat Password"
                                       size="small"
                                       value={repeatPassword}
                                       onChange={(e) =>
                                          setRepeatPassword(e.target.value)
                                       }
                                       type="password"
                                       margin="dense"
                                       fullWidth
                                       variant="outlined"
                                       disabled={passwordEditable}
                                    />
                                 </CardContent>
                                 <CardActions>
                                    <Button
                                       variant="contained"
                                       fullWidth
                                       disableElevation
                                       disabled={passwordEditable}
                                       onClick={handleChangePassword}
                                    >
                                       Change Password
                                    </Button>
                                 </CardActions>
                                 <Alert
                                    sx={
                                       isPasswordErrorShow
                                          ? { display: "flex" }
                                          : { display: "none" }
                                    }
                                    severity={passwordErrorLevel}
                                 >
                                    {passwordMessage}
                                 </Alert>
                              </Card>
                           </Grid>
                        </Grid>
                     )}
                  </Box>
               </Container>
            </Box>
         </Container>
      </Slide>
   );
};

export default Profile;
