import React, { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { GoogleLogout } from "react-google-login";
import {
   Button,
   Backdrop,
   Modal,
   Typography,
   Fade,
   Container,
   Box,
} from "@mui/material";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import Logout from "@mui/icons-material/Logout";

const LogoutModal = ({ isModalOpen, setIsModalOpen, handleModalClose }) => {
   const { clientId, isLoggedIn, handleLogout } = useContext(LoginContext);
   return (
      <Modal
         closeAfterTransition
         BackdropComponent={Backdrop}
         BackdropProps={{
            timeout: 500,
         }}
         open={isModalOpen}
         onClose={handleModalClose}
      >
         <Fade in={isModalOpen}>
            <Container
               maxWidth="xl"
               disableGutters
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  mt: -7,
                  px: 2,
               }}
            >
               <Box
                  sx={{
                     zIndex: 100,
                     bgcolor: "background.paper",
                     width: 400,
                     borderRadius: ".5rem",
                     boxShadow: 10,
                     p: 1,
                     height: "max-content",
                     flexDirection: "column",
                     display: "flex",
                     gap: 1,
                  }}
               >
                  <CloseOutlined
                     sx={{ alignSelf: "flex-end" }}
                     onClick={handleModalClose}
                     color="warning"
                  />
                  <Typography sx={{ fontFamily: "Quicksand" }} align="center">
                     Are you sure you want to logout?
                  </Typography>
                  <Box sx={{ p: 1, display: "flex", gap: 2 }}>
                     <Button
                        variant="contained"
                        color="warning"
                        onClick={handleModalClose}
                        fullWidth
                        size="small"
                     >
                        Cancel
                     </Button>
                     {isLoggedIn.loginType === "google-login" ? (
                        <GoogleLogout
                           clientId={clientId}
                           onLogoutSuccess={() => {
                              handleLogout();
                              setIsModalOpen(false);
                           }}
                           render={(renderProps) => (
                              <Button
                                 onClick={renderProps.onClick}
                                 disabled={renderProps.disabled}
                                 startIcon={<Logout fontSize="small" />}
                                 fullWidth
                                 variant="contained"
                                 size="small"
                              >
                                 Logout
                              </Button>
                           )}
                        ></GoogleLogout>
                     ) : isLoggedIn.loginType === "normal" ? (
                        <Button
                           onClick={handleLogout}
                           fullWidth
                           startIcon={<Logout fontSize="small" />}
                           variant="contained"
                           size="small"
                           color="error "
                        >
                           Logout
                        </Button>
                     ) : (
                        ""
                     )}
                  </Box>
               </Box>
            </Container>
         </Fade>
      </Modal>
   );
};

export default LogoutModal;
