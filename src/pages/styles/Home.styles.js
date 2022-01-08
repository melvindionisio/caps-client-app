import { blue, grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
   root: {
      // backgroundColor: theme.palette.background.paper,
      minHeight: "100vh",
      width: "100%",
      overflowY: "scroll",
   },
   page: {
      minHeight: "100vh",
      paddingBottom: "5rem",
   },
   header: {
      padding: ".1rem .8rem",
      display: "flex",
      borderBottom: "1px solid rgba(0,0,0,0.2)",
   },
   tabs: {
      borderBottom: "1px solid rgba(0,0,0,0.2)",
      // "& .Mui-selected": {
      //   background: grey[100],
      // },
      "& .MuiTabs-indicator": {
         height: 4,
         borderRadius: "1.5rem 1.5rem 0 0 ",
      },
   },
   toolbar: {
      display: "flex",
      justifyContent: "space-between",
   },
   avatar: {
      height: "2.5rem",
      width: "2.5rem",
   },
   menubtn: {
      color: blue[600],
   },
   filterButton: {
      borderRadius: "0px",
      marginTop: "-1px",
      background: grey[100],
      "&:hover": {
         background: grey[200],
      },
   },
   fullWidth: {
      width: "100%",
   },
   logo: {
      height: "2rem",
   },
   appName: {
      color: grey[700],
      fontWeight: "bold",
   },
   permanentDrawer: {
      width: 250,
      flexShrink: 0,
   },
   drawerPaper: {
      width: 250,
   },
   homeContainer: {
      position: "relative",
      height: "100vh",
      overflow: "hidden",
   },
   appbarContainer: {
      position: "sticky",
      left: "0",
      top: "0",
      zIndex: "10",
   },
}));
