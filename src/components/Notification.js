import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({
   showMessage,
   setShowMessage,
   messageSeverity,
   message,
   duration,
}) => {
   const handleClose = (event, reason) => {
      if (reason === "clickaway") {
         return;
      }
      setShowMessage(false);
   };
   return (
      <Snackbar
         open={showMessage}
         autoHideDuration={duration || 2500}
         onClose={handleClose}
         anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
         }}
      >
         <Alert
            onClose={handleClose}
            severity={messageSeverity}
            sx={{ width: "100%" }}
         >
            {message}
         </Alert>
      </Snackbar>
   );
};

export default Notification;
