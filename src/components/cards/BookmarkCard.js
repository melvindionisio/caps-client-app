import { Card, Typography, CardHeader, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import React from "react";
import { useHistory } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";

const BookmarkCard = ({ bookmark, handleDeleteBookmark }) => {
  const history = useHistory();

  const visitBookmark = (id) => {
    if (bookmark.type === "room") {
      history.push(`/rooms/${id}`);
    } else if (bookmark.type === "boardinghouse") {
      history.push(`/boardinghouse/${id}`);
    } else {
      console.log("what?");
    }
  };
  return (
    <>
      {bookmark && (
        <Card
          sx={{
            transition: "150ms ease",
            "&:hover": {
              transform: "scale(1.01)",
            },
            "&:active": {
              transform: "scale(.98)",
            },
          }}
        >
          <CardHeader
            avatar={
              bookmark.type === "room" ? (
                <BedroomParentIcon
                  color="secondary"
                  fontSize="large"
                  onClick={() =>
                    visitBookmark(bookmark.boardinghouseId || bookmark.roomId)
                  }
                />
              ) : (
                <HouseIcon
                  fontSize="large"
                  color="primary"
                  onClick={() =>
                    visitBookmark(bookmark.boardinghouseId || bookmark.roomId)
                  }
                />
              )
            }
            action={
              <IconButton
                aria-label="delete-bookmark"
                size="large"
                onClick={() => handleDeleteBookmark(bookmark.id)}
              >
                <Delete sx={{ color: pink[500] }} />
              </IconButton>
            }
            title={
              <Typography
                variant="body1"
                color="initial"
                sx={{
                  fontSize: 16,
                  fontFamily: "Quicksand",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() =>
                  visitBookmark(bookmark.boardinghouseId || bookmark.roomId)
                }
              >
                {bookmark.name}
              </Typography>
            }
            subheader={
              <>
                <Typography
                  variant="caption"
                  color={bookmark.type === "room" ? "secondary" : "primary"}
                  sx={{
                    textTransform: "uppercase",
                    cursor: "pointer",
                    marginRight: 1,
                  }}
                  onClick={() =>
                    visitBookmark(bookmark.boardinghouseId || bookmark.roomId)
                  }
                >
                  {bookmark.type}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontStyle: "italic",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    visitBookmark(bookmark.boardinghouseId || bookmark.roomId)
                  }
                >
                  {bookmark.date}
                </Typography>
              </>
            }
          />
        </Card>
      )}
    </>
  );
};

export default BookmarkCard;
