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
import { makeStyles } from "@mui/styles";
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

const useStyles = makeStyles({
  btnContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  // card: {
  //   borderRadius: ".5rem",
  //   boxShadow: "0 0 5px 1px rgba(0,0,0,0.05)",
  //   border: "1px solid rgba(0,0,0,0.1)",
  // },
  // smallIcon: {
  //   height: 15,
  // },
  // rate: {
  //   display: "flex",
  //   alignItems: "center",
  // },
  gradeIconActive: {
    color: amber[600],
  },
  link: {
    textDecoration: "none",
  },
});

const BoardingHouseCard = ({ data }) => {
  const classes = useStyles();
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <Grid item lg={6} md={4} sm={6} xs={12}>
      <Card variant="contained" elevation={2} className={classes.card}>
        <CardHeader
          sx={{ paddingBottom: 0 }}
          title={<Typography variant="h6">{data.name}</Typography>}
          subheader={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <GradeIcon sx={{ mr: 0.5, color: amber[600] }} />
              <Typography variant="caption">{data.popularity} stars</Typography>
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
              <Link to={"/"} className={classes.link}>
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
            <PhoneOutlinedIcon
              className={classes.smallIcon}
              sx={{ mr: 1 }}
              fontSize="small"
            />
            <Nlink
              underline="hover"
              color="primary"
              href={`tel: ${data.contact}`}
            >
              {data.contact}
            </Nlink>
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            color="textSecondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <RoomOutlinedIcon
              className={classes.smallIcon}
              fontSize="small"
              sx={{ mr: 1 }}
            />{" "}
            {data.address}
          </Typography>
          {/* `/boardingHouse/${data.id}` */}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BoardingHouseCard;
