import { Card, Typography, CardHeader, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { pink, lightBlue } from "@mui/material/colors";
import React from "react";
import { useHistory } from "react-router-dom";

const BookmarkCard = ({ bookmark, handleDeleteBookmark }) => {
  const history = useHistory();

  const visitBookmark = (id) => {
    history.push(`/boardinghouse/${id}`);
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
                }}
                onClick={() =>
                  visitBookmark(bookmark.boardinghouseId || bookmark.roomId)
                }
              >
                {bookmark.boardinghouseId}
              </Typography>
            }
            subheader={
              <>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontStyle: "italic",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    marginRight: 2,
                  }}
                  onClick={() =>
                    visitBookmark(bookmark.boardinghouseId || bookmark.roomId)
                  }
                >
                  {bookmark.date}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    textTransform: "uppercase",
                    cursor: "pointer",
                    color: lightBlue[600],
                  }}
                  onClick={() =>
                    visitBookmark(bookmark.boardinghouseId || bookmark.roomId)
                  }
                >
                  Boarding House
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
