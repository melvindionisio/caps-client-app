import React, { useState } from "react";
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
import {
   IconButton,
   Button,
   CardActions,
   TextField,
   CardContent,
} from "@mui/material";

const Profile = () => {
   const { currentUser } = useContext(LoginContext);
   const [passwordEditable, setPasswordEditable] = useState(!false);
   const [profileEditable, setProfileEditable] = useState(!false);

   const [name, setName] = useState(currentUser.name);
   const [username, setUsername] = useState(currentUser.username);

   const [currentPassword, setCurrentPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [repeatPassword, setRepeatPassword] = useState("");

   const handleUpdateProfile = () => {
      console.log("Update Profile");
   };

   const handleChangePassword = () => {
      console.log("Change password");
   };

   return (
      <Slide in={true} direction="left">
         <Container
            maxWidth="lg"
            disableGutters
            sx={{ minHeight: "100vh", pb: 2 }}
         >
            <Box sx={{ overflowY: "auto", height: "100vh" }}>
               <ReusableNavigation>
                  <Typography variant="body1" align="center">
                     Profile
                  </Typography>
               </ReusableNavigation>
               <Box sx={{ p: 2 }}>
                  <Card
                     sx={{
                        borderRadius: 2,
                        width: "80%",
                        background: `linear-gradient(to bottom right, ${cyan[300]}, ${lightBlue[400]}, ${blue[500]})`,
                        margin: "0 auto",
                        position: "relative",
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
                  <Card
                     sx={{
                        width: "80%",
                        margin: "0 auto",
                        marginTop: 2,
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
                                 setProfileEditable(!profileEditable)
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
                           onChange={(e) => setUsername(e.target.value)}
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
                  </Card>
                  <Card
                     sx={{
                        width: "80%",
                        margin: "0 auto",
                        marginTop: 2,
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
                              Change Password
                           </Typography>
                        }
                        sx={{ pb: 0 }}
                        action={
                           <IconButton
                              onClick={() =>
                                 setPasswordEditable(!passwordEditable)
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
                           onChange={(e) => setCurrentPassword(e.target.value)}
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
                           onChange={(e) => setNewPassword(e.target.value)}
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
                           onChange={(e) => setRepeatPassword(e.target.value)}
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
                  </Card>
               </Box>
            </Box>
         </Container>
      </Slide>
   );
};

export default Profile;
