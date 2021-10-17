import React from "react";
import {
  Slide,
  Container,
  TextField,
  // Typography,
  // Button,
  // Card,
  // CardContent,
  // CardHeader,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useEffect, useRef } from "react";

// import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";

const Search = () => {
  const history = useHistory();
  const search = useRef(null);
  useEffect(() => {
    console.log(search.current);
  });
  return (
    <Container
      disableGutters
      maxWidth="xl"
      sx={{
        height: "100vh",
        width: "100vw",
        overflowY: "auto",
      }}
    >
      <Slide in={true} direction="down">
        <AppBar
          position="sticky"
          color="secondary"
          variant="outlined"
          sx={{ background: "white" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0rem .3rem",
            }}
          >
            <IconButton onClick={() => history.goBack()}>
              <ArrowBackIosIcon />
            </IconButton>
            <TextField
              ref={search}
              variant="outlined"
              placeholder="Search"
              color="secondary"
              size="small"
              sx={{ width: "75%" }}
            />
            <IconButton color="secondary">
              <FilterAltOutlinedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>
      {/* <Slide in={true} direction="left">
        <Box p={1}>
          <Card variant="outlined">
            <CardContent>
              <Typography>Results here</Typography>
              <Card variant="outlined" sx={{ marginBottom: ".5rem" }}>
                <CardHeader
                  title="Melvin"
                  action={<Button variant="outlined">View</Button>}
                />
              </Card>
            </CardContent>
          </Card>
        </Box>
      </Slide> */}
    </Container>
  );
};

export default Search;
