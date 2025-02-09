import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DrawerListItem from "./drawerListItem";

const DrawerList = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
      </List>
      <Divider />
      <List>
        <ListSubheader>Upload Batas Administrasi</ListSubheader>
        <DrawerListItem title="Batas Kelurahan" useIcon={<ChevronRightIcon />} />
        <DrawerListItem title="Batas Blok" useIcon={<ChevronRightIcon />} />
        <DrawerListItem title="Batas Persil" useIcon={<ChevronRightIcon />} />
        <DrawerListItem title="Batas ZNT" useIcon={<ChevronRightIcon />} />
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <IconButton onClick={handleDrawerOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={handleDrawerClose} variant="persistent">
        {DrawerList}
      </Drawer>
    </>
  );
};

export default DrawerList;
