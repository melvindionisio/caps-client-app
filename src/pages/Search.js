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
import { useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import CheckOutlined from "@mui/icons-material/CheckOutlined";
import { domain } from "../fetch-url/fetchUrl";
import BoardingHouseCard from "../components/cards/BoardingHouseCard";
import LoadingState from "../components/LoadingState";

const Search = () => {
   const history = useHistory();
   const search = useRef(null);
   const [filterOpen, setFilterOpen] = useState(false);
   const [query, setQuery] = useState("");
   const [isPending, setIsPending] = useState(false);
   const [queryResult, setQueryResult] = useState([]);
   const [resultSize, setResultSize] = useState(0);
   const [error, setError] = useState("");

   const filterToggle = () => {
      setFilterOpen(!filterOpen);
      console.log(filterOpen);
   };

   let timer;
   const valueGetter = () => {
      clearTimeout(timer);
      setIsPending(true);
      setError(null);
      timer = setTimeout(() => {
         console.log(query);
         setIsPending(true);
         fetch(`${domain}/api/boarding-houses/search`, {
            method: "POST",
            body: JSON.stringify({
               query: query,
            }),
            headers: {
               "Content-Type": "application/json",
            },
         })
            .then((res) => {
               return res.json();
            })
            .then((data) => {
               setIsPending(false);
               setQueryResult(data);
               setResultSize(data.length);
               if (data.length <= 0) {
                  setError("No result.");
                  setResultSize(data.length);
               }
            })
            .catch((err) => {
               console.log(err);
               setError(err);
               setIsPending(false);
            });
      }, 2000);
   };

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
                           <Typography
                              align="center"
                              sx={{ marginBottom: ".3rem" }}
                           >
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
            <Container maxWidth="md" sx={{ margin: "0 auto" }}>
               <AppBar
                  position="sticky"
                  color="secondary"
                  variant="outlined"
                  elevation={0}
                  sx={{
                     background: "#fff",
                     borderRadius: "0rem 0rem 1rem 1rem",
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
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={valueGetter}
                        onKeyDown={() => {
                           clearTimeout(timer);
                        }}
                        sx={{ width: "70%", maxWidth: "50rem" }}
                        disabled={filterOpen}
                        autoFocus
                     />
                     <IconButton
                        color="secondary"
                        onClick={filterToggle}
                        size="large"
                     >
                        {filterOpen ? (
                           <CheckOutlined fontSize="medium" />
                        ) : (
                           <FilterAltOutlinedIcon />
                        )}
                     </IconButton>
                  </Toolbar>
               </AppBar>
            </Container>
         </Slide>

         <Slide in={true} direction="left">
            <Box p={1}>
               <Box
                  sx={{
                     marginBottom: ".5rem",
                     display: "flex",
                     justifyContent: "space-between",
                  }}
               ></Box>
               <Card variant="outlined" sx={{ minHeight: "80vh" }}>
                  <CardContent
                     sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                     <Typography sx={{ fontStyle: "italic" }} variant="body1">
                        Search result of {resultSize}
                     </Typography>
                     {error && (
                        <Typography variant="body1" align="center">
                           {error}
                        </Typography>
                     )}

                     {isPending ? (
                        <LoadingState />
                     ) : (
                        <>
                           {queryResult &&
                              queryResult.map((boardinghouse) => (
                                 <div
                                    style={{
                                       margin: "0 auto",
                                       maxWidth: "30rem",
                                    }}
                                    key={boardinghouse.id}
                                 >
                                    <BoardingHouseCard
                                       boardinghouse={boardinghouse}
                                    />
                                 </div>
                              ))}
                        </>
                     )}
                  </CardContent>
               </Card>
            </Box>
         </Slide>
      </Container>
   );
};

export default Search;
