import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

const DrawerListItem = ({ title, useIcon }: any) => {
  return (
    <>
      <ListItem key={title} disablePadding>
        <ListItemButton>
          <ListItemIcon>{useIcon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default DrawerListItem;
