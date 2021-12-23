import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import { amber } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Link as Nlink } from "@mui/material";
import { grey, pink } from "@mui/material/colors";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

const BoardingHouseCard = ({ data }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <Grid item lg={6} md={4} sm={6} xs={12}>
      <Card
      // variant="outlined"
      // sx={{
      //   background: `linear-gradient(to bottom right, ${lightBlue[400]}, ${blue[500]})`,
      // }}
      >
        <CardHeader
          sx={{
            paddingBottom: 0,
          }}
          title={
            <Typography variant="h6" sx={{ fontFamily: "Quicksand" }}>
              {data.name}
            </Typography>
          }
          subheader={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <GradeIcon sx={{ mr: 0.5, color: amber[600] }} />
              <Typography variant="caption">
                {data.popularity ?? 0} stars
              </Typography>
            </Box>
          }
          action={
            <Box>
              {isBookmarked ? (
                <IconButton
                  size="medium"
                  sx={{
                    background: grey[100],
                    color: pink[500],
                  }}
                  onClick={() => setIsBookmarked(!isBookmarked)}
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
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <BookmarkAddIcon fontSize="small" />
                </IconButton>
              )}
              <Link
                to={`/boardinghouse/${data.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  size="medium"
                  color="primary"
                  disableElevation
                  variant="text"
                  sx={{
                    background: grey[100],
                    ml: 1,
                  }}
                  endIcon={<CallMadeOutlinedIcon fontSize="small" />}
                  // onClick={() =>
                  //   history.push(
                  //     `/boarding-houses/${room.bhname
                  //       .replace(/\s+/g, "-")
                  //       .replace(/'/g, "")
                  //       .toLowerCase()}/${room.roomName
                  //       .replace(/\s+/g, "")
                  //       .toLowerCase()}`
                  //   )
                  // }
                >
                  Visit
                </Button>
              </Link>
            </Box>
          }
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <PhoneOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
            <Nlink
              underline="hover"
              color="primary"
              href={`tel: ${data.contacts}`}
            >
              {data.contacts}
            </Nlink>
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            color="textSecondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <RoomOutlinedIcon fontSize="small" sx={{ mr: 1 }} />{" "}
            {data.completeAddress}
          </Typography>
          {/* `/boardingHouse/${data.id}` */}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BoardingHouseCard;
