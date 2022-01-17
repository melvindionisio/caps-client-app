import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Zoom from "@mui/material/Zoom";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Login } from "@mui/icons-material";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

import { amber, grey } from "@mui/material/colors";
import { domain } from "../fetch-url/fetchUrl";

export default function AccountMenu({ currentUser }) {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const history = useHistory();
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const {
      clientId,
      appId,
      setIsSuccess,
      isLoggedIn,
      handleLogout,
      setIsLoggedIn,
      setCurrentUser,
   } = useContext(LoginContext);

   const handleGoogleLogin = (response) => {
      //CHECK if the user google id is existing if not, store to db, if yes, get userId
      fetch(`${domain}/api/seekers/google-signin`, {
         method: "POST",
         body: JSON.stringify({
            googleId: response.profileObj.googleId,
            name: response.profileObj.name,
            email: response.profileObj.email,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            console.log(data.message);
            setIsLoggedIn({ isLoggedIn: true, loginType: "google-login" });
            setCurrentUser({
               id: data.id,
               googleId: response.profileObj.googleId,
               facebookId: null,
               name: response.profileObj.name,
               username: response.profileObj.email,
               picture: response.profileObj.imageUrl,
            });
            setIsSuccess(true);
            history.push("/home");
         })
         .catch((err) => console.log(err));
   };

   const handleLoginFacebook = (response) => {
      //CHECK IF FACEBOOK ALREADY IN THE DATABASE
      fetch(`${domain}/api/seekers/facebook-signin`, {
         method: "POST",
         body: JSON.stringify({
            facebookId: response.id,
            name: response.name,
            email: response.email,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            console.log(data.message);
            setIsLoggedIn({ isLoggedIn: true, loginType: "facebook-login" });
            setCurrentUser({
               id: data.id,
               googleId: null,
               facebookId: response.id,
               name: response.name,
               username: response.email,
               picture: response.picture.data.url,
            });
            setIsSuccess(true);
            history.push("/home");
         })
         .catch((err) => console.log(err));
   };

   return (
      <React.Fragment>
         <Tooltip title="Profile" TransitionComponent={Zoom} enterDelay={600}>
            <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
               <Avatar
                  style={{
                     outline: "1px solid rgba(25, 118, 210, 0.5)",
                     outlineOffset: "2px",
                  }}
                  src={currentUser.picture}
               />
            </IconButton>
         </Tooltip>
         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
               elevation: 0,
               sx: {
                  overflow: "visible",
                  // border: "1px solid lightgray",
                  filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.2))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                     width: 32,
                     height: 32,
                     ml: -0.5,
                     mr: 1,
                  },
                  "&:before": {
                     content: '""',
                     display: "block",
                     position: "absolute",
                     top: 0,
                     right: 14,
                     width: 10,
                     height: 10,
                     bgcolor: "background.paper",
                     transform: "translateY(-50%) rotate(45deg)",
                     zIndex: 0,
                  },
               },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
         >
            {isLoggedIn.isLoggedIn ? (
               <div>
                  <MenuItem onClick={() => history.push("/profile")}>
                     <ListItemIcon>
                        <Avatar />
                     </ListItemIcon>
                     <ListItemText>{currentUser.name}</ListItemText>
                     <ArrowForwardIosIcon
                        sx={{ marginLeft: 1, color: grey[500] }}
                        fontSize="small"
                     />
                  </MenuItem>
                  <Divider />
                  {isLoggedIn.loginType === "google-login" ? (
                     <GoogleLogout
                        clientId={clientId}
                        onLogoutSuccess={handleLogout}
                        render={(renderProps) => (
                           <MenuItem
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                           >
                              <ListItemIcon>
                                 <Logout fontSize="small" />
                              </ListItemIcon>
                              Logout
                           </MenuItem>
                        )}
                     ></GoogleLogout>
                  ) : isLoggedIn.loginType === "normal" ? (
                     <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                           <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                     </MenuItem>
                  ) : (
                     ""
                  )}
               </div>
            ) : (
               <React.Fragment>
                  <MenuItem onClick={() => history.push("/login")}>
                     <ListItemIcon>
                        <Login fontSize="small" />
                     </ListItemIcon>
                     Login
                  </MenuItem>

                  <GoogleLogin
                     clientId={clientId}
                     render={(renderProps) => (
                        <MenuItem
                           onClick={renderProps.onClick}
                           disabled={renderProps.disabled}
                        >
                           <ListItemIcon>
                              <GoogleIcon
                                 fontSize="small"
                                 style={{ color: amber[500] }}
                              />
                           </ListItemIcon>
                           Continue with Google
                        </MenuItem>
                     )}
                     onSuccess={handleGoogleLogin}
                     onFailure={() => console.log("Gmail login failed.")}
                     cookiePolicy={"single_host_origin"}
                     isSignedIn={true}
                  />

                  <FacebookLogin
                     appId={appId}
                     autoLoad={false}
                     fields="name,email,picture"
                     callback={handleLoginFacebook}
                     render={(renderProps) => (
                        <MenuItem
                           onClick={renderProps.onClick}
                           disabled={renderProps.disabled}
                        >
                           <ListItemIcon>
                              <FacebookIcon fontSize="small" color="primary" />
                           </ListItemIcon>
                           Continue with Facebook
                        </MenuItem>
                     )}
                     onFailure={(response) => {
                        console.log("Facebook login failed.");
                        console.log(response);
                     }}
                  />
               </React.Fragment>
            )}
         </Menu>
      </React.Fragment>
   );
}
