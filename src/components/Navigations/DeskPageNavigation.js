import React from "react";
import { Avatar, ButtonGroup, IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";

const DeskPageNavigation = () => {
  const history = useHistory();
  return (
    <ButtonGroup
      style={{
        position: "absolute",
        bottom: "1rem",
        left: "1rem",
        zIndex: "500",
      }}
    >
      {/* <IconButton onClick={() => history.push("/map")}>
        <Avatar style={{ height: "3rem", width: "3rem" }}>A</Avatar>
      </IconButton> */}
      <IconButton onClick={() => history.push("/home")}>
        <Avatar style={{ height: "3rem", width: "3rem" }}>B</Avatar>
      </IconButton>
      <IconButton onClick={() => history.push("/help")}>
        <Avatar style={{ height: "3rem", width: "3rem" }}>C</Avatar>
      </IconButton>
    </ButtonGroup>
  );
};

export default DeskPageNavigation;
