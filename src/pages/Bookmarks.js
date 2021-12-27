import React, { useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

import ReusableNavigation from "../components/Navigations/ReusableNavigation";
import useFetch from "../hooks/useFetch";
import { LoginContext } from "../contexts/LoginContext";
import LoadingState from "../components/LoadingState";

const Bookmarks = () => {
  const { currentUser } = useContext(LoginContext);

  const {
    data: bookmarks,
    isPending,
    error,
  } = useFetch(`http://localhost:3500/api/bookmarks/${currentUser.googleId}`);

  return (
    <Slide in={true} direction="left">
      <Container maxWidth="lg" disableGutters>
        <ReusableNavigation center={true}>
          <Typography variant="body1" align="center">
            Bookmarks Page
          </Typography>
        </ReusableNavigation>
        <Container disableGutters maxWidth="md">
          {error && (
            <Typography variant="body1" color="initial" align="center">
              {error}
            </Typography>
          )}
          {isPending && <LoadingState loadWhat={"Bookmarks"} />}
          {bookmarks ? (
            bookmarks.map((bookmark) => (
              <Typography variant="body1" color="initial">
                a bookmark
              </Typography>
            ))
          ) : (
            <Typography variant="body1" color="initial" align="center">
              Bookmarks is empty.
            </Typography>
          )}
        </Container>
      </Container>
    </Slide>
  );
};

export default Bookmarks;
