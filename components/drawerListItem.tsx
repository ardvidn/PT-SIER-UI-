import { Autocomplete, Box, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import BasicModal from "./BasicModal";
import CloseIcon from "@mui/icons-material/Close";
import UploadButton from "./UploadButton";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const options1 = ["kec1", "kec2"];
const options2 = ["kel1", "kel2"];

const DrawerListItem = ({ title, useIcon, identifier }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [value1, setValue1] = useState<string | null>(options1[0]);
  const [value2, setValue2] = useState<string | null>(options2[0]);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  // const optionKecamatan = await axios.get("http://localhost:8080/api/retrieve/kodekecamatan");
  // const optionKelurahan = await axios.get("http://localhost:8080/api/retrieve/kodekelurahan");

  const handdleModalOpen = () => {
    setOpenModal(true);
  };
  const handdleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <ListItem key={title} disablePadding onClick={handdleModalOpen}>
        <ListItemButton>
          <ListItemIcon>{useIcon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
      <Modal open={openModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <IconButton onClick={handdleModalClose} sx={{ paddingBottom: 2 }}>
            <CloseIcon />
          </IconButton>
          {identifier !== "kelurahan" ? (
            <>
              <Typography sx={{ paddingBottom: 4 }}>Upload Batas {title}</Typography>
              <Autocomplete
                key="autocomplete-value1"
                value={value1}
                onChange={(event: any, newValue: string | null) => {
                  setValue1(newValue);
                }}
                inputValue={inputValue1}
                onInputChange={(event, newInputValue) => {
                  setInputValue1(newInputValue);
                }}
                id="controllable-states-value1"
                options={options1}
                sx={{ width: 300, paddingBottom: 4 }}
                renderInput={(params) => <TextField {...params} label="Kecamatan" />}
              />

              <Autocomplete
                key="autocomplete-value2"
                value={value2}
                onChange={(event: any, newValue: string | null) => {
                  setValue2(newValue);
                }}
                inputValue={inputValue2}
                onInputChange={(event, newInputValue) => {
                  setInputValue2(newInputValue);
                }}
                id="controllable-states-value2"
                options={options2}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Kelurahan" />}
              />
              <UploadButton label={title} endpoint={`http://localhost:8080/api/convert/batas${title}`} />
            </>
          ) : (
            <>
              <Typography sx={{ paddingBottom: 4 }}>Upload Batas {title}</Typography>
              <Autocomplete
                key="autocomplete-value1"
                value={value1}
                onChange={(event: any, newValue: string | null) => {
                  setValue1(newValue);
                }}
                inputValue={inputValue1}
                onInputChange={(event, newInputValue) => {
                  setInputValue1(newInputValue);
                }}
                id="controllable-states-value1"
                options={options1}
                sx={{ width: 300, paddingBottom: 4 }}
                renderInput={(params) => <TextField {...params} label="Kecamatan" />}
              />
              <UploadButton label={title} endpoint={`http://localhost:8080/api/convert/batas${title}`} />
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default DrawerListItem;
