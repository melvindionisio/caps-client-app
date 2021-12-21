import React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Box } from "@mui/material";
import { pink } from "@mui/material/colors";

export default function HelpList() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const helpInfo = [
    {
      title: "How to install the app?",
      summary: `Lorem ipsum dolor, sit amet.`,
      details: [
        {
          title: "Install",
          description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            At, aspernatur. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            At, aspernatur!`,
        },
        {
          title: "Install",
          description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            At, aspernatur. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            At, aspernatur!`,
        },
      ],
    },
    {
      title: "How to bookmark a room or a dorm/boarding house??",
      summary: `Lorem ipsum dolor, sit amet.`,
      details: [
        {
          title: "Install",
          description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        At, aspernatur. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        At, aspernatur!`,
        },
        {
          title: "Install",
          description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        At, aspernatur. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        At, aspernatur!`,
        },
      ],
    },
    {
      title: "How to activated real-time locator?",
      summary: `Lorem ipsum dolor, sit amet.`,
      details: [
        {
          title: "Install",
          description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            At, aspernatur. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            At, aspernatur!`,
        },
        {
          title: "Install",
          description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            At, aspernatur. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            At, aspernatur!`,
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
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {step.description}
                </Typography>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
