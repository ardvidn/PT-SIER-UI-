// import { Autocomplete, Box, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, TextField, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import BasicModal from "./BasicModal";
// import CloseIcon from "@mui/icons-material/Close";
// import UploadButton from "./UploadButton";
// import axios from "axios";

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };

// const options1 = ["001 - aaa", "002 - bbb"];
// const options2 = ["010 - zzz", "011 - xxx"];

// const DrawerListItem = async ({ title, useIcon, identifier }: any) => {
//   const [openModal, setOpenModal] = useState(false);
//   const [value1, setValue1] = useState<[] | null>([]);
//   const [value2, setValue2] = useState<[] | null>([]);
//   const [inputValue1, setInputValue1] = useState("");
//   const [inputValue2, setInputValue2] = useState("");

//   useEffect(() => {
//     // Fetch data dari API
//     const fetchData = async () => {
//       try {
//       const response = await axios.get("http://localhost:8070/api/retrieve/kodekecamatan");

//       setGeoJsonData(response.data.data); // Simpan data GeoJSON ke state
//       } catch (error) {
//         console.error("Error fetching GeoJSON data:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   // const optionKelurahan = await axios.get("http://localhost:8080/api/retrieve/kodekelurahan");

//   const handdleModalOpen = () => {
//     setOpenModal(true);
//   };
//   const handdleModalClose = () => {
//     setOpenModal(false);
//   };

//   return (
//     <>
//       <ListItem key={title} disablePadding onClick={handdleModalOpen}>
//         <ListItemButton>
//           <ListItemIcon>{useIcon}</ListItemIcon>
//           <ListItemText primary={title} />
//         </ListItemButton>
//       </ListItem>
//       <Modal open={openModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
//         <Box sx={style}>
//           <IconButton onClick={handdleModalClose} sx={{ paddingBottom: 2 }}>
//             <CloseIcon />
//           </IconButton>
//           {identifier !== "kelurahan" ? (
//             <>
//               <Typography sx={{ paddingBottom: 4 }}>Upload Batas {title}</Typography>
//               <Autocomplete
//                 key="autocomplete-value1"
//                 value={value1}
//                 onChange={(event: any, newValue: string | null) => {
//                   setValue1(newValue);
//                 }}
//                 inputValue={inputValue1}
//                 onInputChange={(event, newInputValue) => {
//                   setInputValue1(newInputValue);
//                 }}
//                 id="controllable-states-value1"
//                 options={options1}
//                 sx={{ width: 300, paddingBottom: 4 }}
//                 renderInput={(params) => <TextField {...params} label="Kecamatan" />}
//               />

//               <Autocomplete
//                 key="autocomplete-value2"
//                 value={value2}
//                 onChange={(event: any, newValue: string | null) => {
//                   setValue2(newValue);
//                 }}
//                 inputValue={inputValue2}
//                 onInputChange={(event, newInputValue) => {
//                   setInputValue2(newInputValue);
//                 }}
//                 id="controllable-states-value2"
//                 options={options2}
//                 sx={{ width: 300 }}
//                 renderInput={(params) => <TextField {...params} label="Kelurahan" />}
//               />
//               <UploadButton label={title} endpoint={`http://localhost:8080/api/convert/batas${title}`} jenis={identifier} kecamatan={inputValue1} kelurahan={inputValue2} />
//             </>
//           ) : (
//             <>
//               <Typography sx={{ paddingBottom: 4 }}>Upload Batas {title}</Typography>
//               <Autocomplete
//                 key="autocomplete-value1"
//                 value={value1}
//                 onChange={(event: any, newValue: string | null) => {
//                   setValue1(newValue);
//                 }}
//                 inputValue={inputValue1}
//                 onInputChange={(event, newInputValue) => {
//                   setInputValue1(newInputValue);
//                 }}
//                 id="controllable-states-value1"
//                 options={options1}
//                 sx={{ width: 300, paddingBottom: 4 }}
//                 renderInput={(params) => <TextField {...params} label="Kecamatan" />}
//               />
//               <UploadButton label={title} endpoint={`http://localhost:8080/api/convert/batas${title}`} jenis={identifier} kecamatan={inputValue1} kelurahan={inputValue2} />
//             </>
//           )}
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default DrawerListItem;

import { Autocomplete, Box, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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

const DrawerListItem = ({ title, useIcon, identifier }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [options1, setOptions1] = useState<string[]>([]);
  const [options2, setOptions2] = useState<string[]>([]);
  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>(null);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch data kecamatan dari backend
        const response1 = await axios.get("http://localhost:8070/api/retrieve/kodekecamatan");
        const kecamatanData = response1.data.data.map((item: any) => `${item.kdKecamatan} - ${item.nmKecamatan}`);

        setOptions1(kecamatanData);

        // Fetch data kelurahan dari backend
        const response2 = await axios.get("http://localhost:8070/api/retrieve/kodekelurahan");
        const kelurahanData = response2.data.data.map((item: any) => `${item.kdKelurahan} - ${item.nmKelurahan}`);
        setOptions2(kelurahanData);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  console.log(options1);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <ListItem key={title} disablePadding onClick={handleModalOpen}>
        <ListItemButton>
          <ListItemIcon>{useIcon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
      <Modal open={openModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <IconButton onClick={handleModalClose} sx={{ paddingBottom: 2 }}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ paddingBottom: 4 }}>Upload Batas {title}</Typography>

          <Autocomplete
            key="autocomplete-value1"
            value={value1}
            onChange={(event: any, newValue: string | null) => setValue1(newValue)}
            inputValue={inputValue1}
            onInputChange={(event, newInputValue) => setInputValue1(newInputValue)}
            id="controllable-states-value1"
            options={options1}
            sx={{ width: 300, paddingBottom: 4 }}
            renderInput={(params) => <TextField {...params} label="Kecamatan" />}
          />

          {identifier !== "kelurahan" && (
            <Autocomplete
              key="autocomplete-value2"
              value={value2}
              onChange={(event: any, newValue: string | null) => setValue2(newValue)}
              inputValue={inputValue2}
              onInputChange={(event, newInputValue) => setInputValue2(newInputValue)}
              id="controllable-states-value2"
              options={options2}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Kelurahan" />}
            />
          )}

          <UploadButton label={title} endpoint={`http://localhost:8080/api/upload/batas${title}`} jenis={identifier} kecamatan={inputValue1} kelurahan={inputValue2} />
        </Box>
      </Modal>
    </>
  );
};

export default DrawerListItem;
