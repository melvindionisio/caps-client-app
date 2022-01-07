import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import { CardContent, Typography, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useHistory } from "react-router-dom";
import AddBookmarkButton from "../../components/AddBookmarkButton";

const SimpleRoomCard = ({ room, bhName }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const history = useHistory();
  return (
    <>
      {room && (
        <Card
          sx={{
            overflow: "hidden",
            borderRadius: 1,

            transition: "150ms ease",
            "&:hover": {
              transform: "scale(1.02)",
            },
            "&:active": {
              transform: "scale(.98)",
            },
          }}
        >
          <CardHeader
            title={
              <Typography variant="h6" sx={{ fontFamily: "Quicksand" }}>
                {room.name}
              </Typography>
            }
            subheader={<Typography variant="body2">{bhName}</Typography>}
            action={
              <AddBookmarkButton
                roomId={room.id}
                isBookmarked={isBookmarked}
                setIsBookmarked={setIsBookmarked}
              />
            }
            sx={{ pb: 0 }}
          />
          <CardContent
            sx={{ p: 1, pt: 1, flexGrow: 2 }}
          >{`${room.occupiedBed}/${room.numSlots}`}</CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              disableElevation
              variant="contained"
              fullWidth
              endIcon={<ArrowForwardIosIcon fontSize="small" />}
              onClick={() => history.push(`/rooms/${room.id}`)}
            >
              Visit
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default SimpleRoomCard;
