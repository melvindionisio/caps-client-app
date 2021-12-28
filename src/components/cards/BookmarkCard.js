import { Card, Typography, CardHeader, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

import React from "react";

const BookmarkCard = () => {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="delete-bookmark" size="large">
            <Delete />
          </IconButton>
        }
        title={
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: 16, fontFamily: "Quicksand" }}
          >
            Boardinghouse or room name
          </Typography>
        }
        subheader={
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontStyle: "italic", textTransform: "uppercase" }}
          >
            Bookmarked date
          </Typography>
        }
      />
    </Card>
  );
};

export default BookmarkCard;
