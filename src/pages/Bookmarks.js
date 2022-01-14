import React, { useContext, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";

import ReusableNavigation from "../components/Navigations/ReusableNavigation";
import { LoginContext } from "../contexts/LoginContext";
import LoadingState from "../components/LoadingState";
import BookmarkCard from "../components/cards/BookmarkCard";
import { domain } from "../fetch-url/fetchUrl";

const Bookmarks = () => {
   const { currentUser } = useContext(LoginContext);

   const [bookmarks, setBookmarks] = useState([]);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState("");

   const [isEmpty, setIsEmpty] = useState(false);

   useEffect(() => {
      const abortCont = new AbortController();

      console.log("useeffect fired");
      setTimeout(() => {
         fetch(`${domain}/api/bookmarks/seeker/${currentUser.id}`, {
            signal: abortCont.signal,
         })
            .then((res) => {
               if (!res.ok) {
                  setError("Something went wrong!");
                  throw Error("Something went wrong!");
               }
               return res.json();
            })
            .then((data) => {
               setBookmarks(data);
               setIsPending(false);
               if (data.length <= 0) {
                  setIsEmpty(true);
               }
            })
            .catch((err) => {
               if (err.name === "AbortError") {
                  console.log("fetch aborted");
               } else {
                  console.log("ready");
               }
            });
      }, 0);

      return () => {
         abortCont.abort();
      };
   }, [currentUser]);

   const handleDeleteBookmark = async (bookmarkId) => {
      setBookmarks(() =>
         bookmarks.filter((bookmark) => bookmark.id !== bookmarkId)
      );
      fetch(`${domain}/api/bookmarks/delete/${bookmarkId}`, {
         method: "DELETE",
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            console.log(data.message);
            // window.location.reload(false);
         })
         .catch((err) => console.log(err));
   };

   useEffect(() => {
      if (bookmarks.length <= 0) {
         setIsEmpty(true);
      } else {
         setIsEmpty(false);
      }
   }, [bookmarks]);

   return (
      <Slide in={true} direction="left">
         <Container maxWidth="lg" disableGutters>
            <ReusableNavigation center={true}>
               <Typography variant="body1" align="center">
                  Bookmarks
               </Typography>
            </ReusableNavigation>
            <Container disableGutters maxWidth="md" sx={{ padding: 2 }}>
               {error && (
                  <Typography variant="body1" color="initial" align="center">
                     {error}
                  </Typography>
               )}
               {isPending && <LoadingState loadWhat={"Bookmarks"} />}
               <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {bookmarks &&
                     bookmarks
                        .map((bookmark) => (
                           <BookmarkCard
                              key={bookmark.id}
                              bookmark={bookmark}
                              handleDeleteBookmark={handleDeleteBookmark}
                           />
                        ))
                        .reverse()}
               </Box>
               {isEmpty && (
                  <Typography
                     variant="body2"
                     color="text.secondary"
                     align="center"
                     sx={{ mt: 4 }}
                  >
                     Bookmark is empty!
                  </Typography>
               )}
            </Container>
         </Container>
      </Slide>
   );
};

export default Bookmarks;
