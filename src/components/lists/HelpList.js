import React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Box, Card, CardMedia, Grid } from "@mui/material";
import { pink } from "@mui/material/colors";
import MobileInstall1 from "../../help-images/mobile-install-s1.jpg";
import MobileInstall2 from "../../help-images/mobile-install-s2.jpg";
import DesktopInstall from "../../help-images/pc-install.png";
import DesktopInstall2 from "../../help-images/pc-install-zoom.png";
import BookmarkHouse from "../../help-images/bookmark-added-house.jpg";
import BookmarkRoom from "../../help-images/bookmark-added-room.jpg";
import Bookmarks from "../../help-images/bookmarks.jpg";
import TurnOnLocation from "../../help-images/turn-on-location-arrow.jpg";
import Located from "../../help-images/located.jpg";

export default function HelpList() {
   const [expanded, setExpanded] = useState(false);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   const helpInfo = [
      {
         title: "How to install the app?",
         summary: `You can install the app in you smart phone and in your computer and here's how.`,
         details: [
            {
               title: "Installing the app in Smart Phones.",
               description: `If you are using google chrome as you browser, upon visiting the website, you should see option 'Install App' in the google chrome menu (refer to the photos below).`,
               photos: [MobileInstall1, MobileInstall2],
            },
            {
               title: "Installing the app in you computer.",
               description: `If you are using Chrome as you browser, inside the url box, you should see acomputer logo with down arrow, it will trigger the install (refer to the photos below).`,
               photos: [DesktopInstall, DesktopInstall2],
            },
         ],
      },
      {
         title: "How to bookmark a room or a dorm/boarding house??",
         summary: `You can bookmark a room or a boarding house that you may want to visit later, and to do that, you should register an account or continue with facebook or google account which will only save you google ID and username. If you're not logged in, you are not allowed to save bookmarks. You can find the list of you bookmarks in the bookmarks page`,
         details: [
            {
               title: "Add Room bookmark",
               description: `In adding room bookmark:  first you should go to the list of rooms. In the room card choose a room  you can to bookmark and tap or click the add bookmark icon to save as bookmark.`,
               photos: [BookmarkRoom],
            },
            {
               title: "Add Boardinghouse Bookmark",
               description: `In adding boarding house bookmark, the process is still the same.`,
               photos: [BookmarkHouse, Bookmarks],
            },
         ],
      },
      {
         title: "How to activate real-time locator?",
         summary: `You can locate your current location to see whether you are near the target destination (boarding house) that you are looking for. first you should go to the maps page where you see the marks of boarding houses available and then on top-left-side of the page you should see a location icon and upon clicking the permission to access location will appear and as soon as it loads, you location will be hovered in the map (refer to the photos below).`,
         details: [
            {
               title: "Click the Location Button",
               description: `Make sure the location access of your device is turned on. `,
               photos: [TurnOnLocation],
            },
            {
               title: "Actual picture of Map with user location.",
               description: `Locating yourself will help you figure out if you are near your target boarding house destination.`,
               photos: [Located],
            },
         ],
      },
   ];

   return (
      <div sx={{ bgcolor: "red", height: 200 }}>
         {helpInfo.map((help, index) => (
            <Accordion
               expanded={expanded === `panel${index}`}
               onChange={handleChange(`panel${index}`)}
               key={help.title}
            >
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
               >
                  <Typography>{help.title}</Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <Typography sx={{ color: "text.secondary" }}>
                     {help.summary}
                  </Typography>
                  {help.details.map((step, index) => (
                     <Box key={index}>
                        <Avatar sx={{ background: pink[500], mt: 2 }}>
                           {index + 1}
                        </Avatar>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                           {step.title}
                        </Typography>
                        <Typography
                           variant="body2"
                           sx={{ color: "text.secondary" }}
                        >
                           {step.description}
                        </Typography>
                        <Box
                           sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                              justifyContent: "center",
                              alignItems: "center",
                              mt: 2,
                           }}
                        >
                           <Grid container spacing={2}>
                              {step.photos.map((photo, index) => (
                                 <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card>
                                       <CardMedia
                                          component="img"
                                          image={photo}
                                          alt={`steps ${index}`}
                                          height="100%"
                                       />
                                    </Card>
                                 </Grid>
                              ))}
                           </Grid>
                        </Box>
                     </Box>
                  ))}
               </AccordionDetails>
            </Accordion>
         ))}
      </div>
   );
}
