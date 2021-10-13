import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  page: {
    height: "100vh",
    overflow: "hidden",
    position: "relative",
  },
  float: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(1.5rem)",
    color: "#ffffff",
    padding: ".6rem",
    zIndex: "1",
    position: "absolute",
    top: "4.5rem",
    left: ".5rem",
    // transform: "translateX(-50%)",
    borderRadius: ".5rem",
    width: "50%",
  },
  navIcon: {
    color: "white",
    padding: ".2rem",
  },
  appbar: {
    padding: ".5rem 1rem ",
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(.4rem)",
    color: "white",
    width: "80%",
    borderRadius: "0% 2rem 2rem 0%",
    // boxShadow: "0 2px 10px 1px rgba(0,0,0,0.3)",
  },
  appName: {
    fontWeight: "900",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  avatar: {
    height: "2.5rem",
    width: "2.5rem",
  },
  logoContainer: {
    height: 50,
  },
  logo: {
    height: "100%",
    objectFit: "center",
    filter: "brightness(125%)",
  },
});
