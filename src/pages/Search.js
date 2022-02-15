import React from "react";
import {
   Slide,
   Container,
   TextField,
   Typography,
   Card,
   CardContent,
   AppBar,
   Toolbar,
   IconButton,
} from "@mui/material";
import { useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import { domain } from "../fetch-url/fetchUrl";
import BoardingHouseCard from "../components/cards/BoardingHouseCard";
import LoadingState from "../components/LoadingState";

const Search = () => {
   const history = useHistory();
   const search = useRef(null);
   const [query, setQuery] = useState("");
   const [isPending, setIsPending] = useState(false);
   const [queryResult, setQueryResult] = useState([]);
   const [resultSize, setResultSize] = useState(0);
   const [error, setError] = useState("");

   const handleSearch = () => {
      if (query) {
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
               if (data.length <= 0) {
                  setError("No result.");
                  setResultSize(data.length);
               } else {
                  setQueryResult(data);
                  setResultSize(data.length);
               }
               if (query === "") {
                  setQueryResult([]);
               }
            })
            .catch((err) => {
               console.log(err);
               setError(err);
               setIsPending(false);
            });
      }
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
                        sx={{ width: "70%", maxWidth: "50rem" }}
                        autoFocus
                     />
                     <IconButton
                        color="secondary"
                        size="large"
                        onClick={handleSearch}
                     >
                        <SearchOutlined />
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
                                       //margin: "0 auto",
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
