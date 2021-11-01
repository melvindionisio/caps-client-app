import React from "react";
import {
  Slide,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  CardHeader,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
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
  const [sort, setSort] = useState("name");

  const filterToggle = () => {
    setFilterOpen(!filterOpen);
    console.log(filterOpen);
  };
  const handleSort = (event, newSort) => {
    setSort(newSort);
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
          sx={{
            background: "#fff",
          }}
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
              sx={{ width: "70%", maxWidth: "50rem" }}
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
            <ToggleButtonGroup
              value={sort}
              exclusive
              onChange={handleSort}
              aria-label="sort"
              color="primary"
            >
              <ToggleButton disabled>Sort:</ToggleButton>
              <ToggleButton value="name" aria-label="sort by name">
                Name
              </ToggleButton>
              <ToggleButton value="popularity" aria-label="sort by popularity">
                Popularity
              </ToggleButton>
              <ToggleButton value="vacancy" aria-label="sort by vacancy">
                Vacancy
              </ToggleButton>
            </ToggleButtonGroup>
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
