import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

export default function MobileMenu({ toggleDrawer, state, anchor, children }) {
   // const list = (anchor) => (
   //   <Box
   //     sx={{ width: 250 }}
   //     role="presentation"
   //     onClick={toggleDrawer(anchor, false)}
   //     onKeyDown={toggleDrawer(anchor, false)}
   //   >
   //     <List>
   //       {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
   //         <ListItem button key={text}>
   //           <ListItemIcon>
   //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
   //           </ListItemIcon>
   //           <ListItemText primary={text} />
   //         </ListItem>
   //       ))}
   //     </List>
   //     <Divider />
   //     <List>
   //       {["All mail", "Trash", "Spam"].map((text, index) => (
   //         <ListItem button key={text}>
   //           <ListItemIcon>
   //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
   //           </ListItemIcon>
   //           <ListItemText primary={text} />
   //         </ListItem>
   //       ))}
   //     </List>
   //   </Box>
   // );

   return (
      <div>
         <React.Fragment key={anchor}>
            <Drawer
               anchor={anchor}
               open={state[anchor]}
               onClose={toggleDrawer(anchor, false)}
            >
               <Box sx={{ width: 270 }} role="presentation">
                  {children}
               </Box>
            </Drawer>
         </React.Fragment>
      </div>
   );
}
