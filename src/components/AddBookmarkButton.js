import React, { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import { grey, pink } from "@mui/material/colors";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import useCurrentTimeDate from "../hooks/useCurrentTimeDate";
import { LoginContext } from "../contexts/LoginContext";
import { domain } from "../fetch-url/fetchUrl";

const AddBookmarkButton = ({
   bookmarkType,
   roomId,
   roomName,
   boardinghouseId,
   boardinghouseName,
   isBookmarked,
   setIsBookmarked,
}) => {
   const dateTime = useCurrentTimeDate();
   const [isPending, setIsPending] = useState(false);
   const { currentUser } = useContext(LoginContext);

   const handleAddBookmark = () => {
      setIsPending(true);
      fetch(`${domain}/api/bookmarks/add/${currentUser.id}`, {
         method: "POST",
         body: JSON.stringify({
            bookmarkDate: dateTime,
            roomId: roomId ?? null,
            boardinghouseId: boardinghouseId ?? null,
            bookmarkType: bookmarkType,
            bookmarkName: boardinghouseName ?? roomName,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            console.log(data.message);
            setIsBookmarked(true);
            setIsPending(false);
         })
         .catch((err) => console.log(err));
   };

   const handleRemoveBookmark = () => {
      setIsBookmarked(false);
      setIsPending(true);

      // WORK HERE BUKAS
      if (bookmarkType === "room") {
         fetch(`${domain}/api/bookmarks/delete/room/${roomId}`, {
            method: "DELETE",
         })
            .then((res) => {
               return res.json();
            })
            .then((data) => {
               console.log(data.message);
               setIsBookmarked(false);
               setIsPending(false);
               // window.location.reload(false);
            })
            .catch((err) => console.log(err));
      } else if (bookmarkType === "boardinghouse") {
         fetch(
            `${domain}/api/bookmarks/delete/boardinghouse/${boardinghouseId}`,
            {
               method: "DELETE",
            }
         )
            .then((res) => {
               return res.json();
            })
            .then((data) => {
               console.log(data.message);
               setIsBookmarked(false);
               setIsPending(false);
            })
            .catch((err) => console.log(err));
      } else {
         console.log("Invalid bookmark type");
      }
   };

   return (
      <>
         {isBookmarked ? (
            <IconButton
               size="medium"
               disabled={isPending}
               sx={{
                  background: grey[100],
                  color: pink[500],
               }}
               onClick={handleRemoveBookmark}
            >
               <BookmarkAddedIcon fontSize="small" />
            </IconButton>
         ) : (
            <IconButton
               size="medium"
               sx={{
                  background: grey[100],
                  color: grey[500],
               }}
               onClick={handleAddBookmark}
            >
               <BookmarkAddIcon fontSize="small" />
            </IconButton>
         )}
      </>
   );
};

export default AddBookmarkButton;
