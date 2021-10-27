import React from "react";
import {
  Slide,
  Container,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  AppBar,
  Toolbar,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import CheckOutlined from "@mui/icons-material/CheckOutlined";

const Search = () => {
  const history = useHistory();
  const search = useRef(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const filterToggle = () => {
    setFilterOpen(!filterOpen);
    console.log(filterOpen);
  };

  useEffect(() => {
    search.current.firstElementChild.firstElementChild.focus();
  }, []);
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
      {filterOpen && (
        <Slide in={true} direction={filterOpen ? "down" : "up"}>
          <Box py={1} unmountOnExit>
            <Card variant="outlined" sx={{ borderRadius: "0rem" }}>
              <CardHeader
                title={
                  <Typography align="center" sx={{ marginBottom: ".3rem" }}>
                    Filter Options
                  </Typography>
                }
              />
              <CardContent>Options here</CardContent>
            </Card>
          </Box>
        </Slide>
      )}
      <Slide in={true} direction="down">
        <AppBar
          position="sticky"
          color="secondary"
          variant="outlined"
          elevation={0}
          sx={{ background: "white" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.2rem .3rem",
            }}
          >
            <IconButton onClick={() => history.goBack()} size="large">
              <ArrowBackIosIcon />
            </IconButton>
            <TextField
              ref={search}
              variant="outlined"
              placeholder="Search"
              color="secondary"
              size="small"
              sx={{ width: "70%" }}
              disabled={filterOpen}
            />
            <IconButton color="secondary" onClick={filterToggle} size="large">
              {filterOpen ? (
                <CheckOutlined fontSize="medium" />
              ) : (
                <FilterAltOutlinedIcon />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>

      <Slide in={true} direction="left">
        <Box p={1}>
          <Box
            sx={{
              marginBottom: ".5rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ButtonGroup size="small">
              <Button disabled>Sort:</Button>
              <Button>Name</Button>
              <Button>Popularity</Button>
              <Button>Vacancy</Button>
            </ButtonGroup>
            <ButtonGroup size="small">
              <Button>Asc</Button>
              <Button>Desc</Button>
            </ButtonGroup>
          </Box>
          <Card variant="outlined" sx={{ minHeight: "80vh" }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ marginBottom: ".5rem" }}>
                Results here
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Slide>
    </Container>
  );
};

export default Search;
