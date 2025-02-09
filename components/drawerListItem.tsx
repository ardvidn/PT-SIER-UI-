import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

const ListItem = ({ title, useIcon }: any) => {
  return (
    <>
      <ListItem key={title} disablePadding>
        <ListItemButton>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default ListItem;
