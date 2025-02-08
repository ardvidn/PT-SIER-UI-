import React, { useState } from "react";
import { TextField, IconButton, Button, Modal, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const mockData = {
  "74.08.060.012.001.0039.0": {
    wajibPajak: "NUR HAYATI",
    alamat: "JL POROS BATU PUTIH DUSUN I",
    rtRw: "/",
    dusun: "",
    kecamatan: "BATU PUTIH",
    kelurahan: "",
  },
};

const Navbar = () => {
  const [showMore, setShowMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [propertyData, setPropertyData] = useState(null);

  const formatNop = (value: any) => {
    // Hapus semua karakter non-digit
    let numbersOnly = value.replace(/\D/g, "");

    // Pastikan panjang maksimal 18 digit
    numbersOnly = numbersOnly.slice(0, 18);

    // Format sesuai pola "XX.XX.XXX.XXX.XXX.XXXX.X"
    let formatted = numbersOnly
      .replace(/^(\d{2})(\d{0,2})/, "$1.$2") // 2 digit pertama + titik + 2 digit berikutnya
      .replace(/^(\d{2})\.(\d{2})(\d{0,3})/, "$1.$2.$3") // 2 digit + titik + 2 digit + titik + 3 digit
      .replace(/^(\d{2})\.(\d{2})\.(\d{3})(\d{0,3})/, "$1.$2.$3.$4") // tambah 3 digit + titik + 3 digit
      .replace(/^(\d{2})\.(\d{2})\.(\d{3})\.(\d{3})(\d{0,3})/, "$1.$2.$3.$4.$5") // tambah 3 digit + titik + 3 digit
      .replace(/^(\d{2})\.(\d{2})\.(\d{3})\.(\d{3})\.(\d{3})(\d{0,4})/, "$1.$2.$3.$4.$5.$6") // tambah 4 digit + titik + 1 digit
      .replace(/^(\d{2})\.(\d{2})\.(\d{3})\.(\d{3})\.(\d{3})\.(\d{4})(\d{0,1})/, "$1.$2.$3.$4.$5.$6.$7"); // tambah 1 digit terakhir

    return formatted;
  };

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;

    // Jika pengguna menghapus karakter, biarkan penghapusan terjadi
    if (e.nativeEvent.inputType === "deleteContentBackward") {
      setSearchQuery(inputValue);
      return;
    }

    // Format input jika pengguna mengetik
    const formattedNop = formatNop(inputValue);
    setSearchQuery(formattedNop);
  };

  const handleSearch = () => {
    if (mockData[searchQuery]) {
      setPropertyData(mockData[searchQuery]);
      setOpenModal(true);
    } else {
      alert("Data tidak ditemukan");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md max-w-md mx-auto absolute top-4 left-4 z-[1000]">
      <div className="flex items-center space-x-2 border p-2 rounded-md">
        <MenuIcon />
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search NOP"
          value={searchQuery}
          onChange={handleSearchChange}
          inputProps={{ maxLength: 24 }} // Maksimal 24 karakter untuk format lengkap
        />
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </div>

      <Button fullWidth endIcon={showMore ? <ExpandLessIcon /> : <ExpandMoreIcon />} onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show Less" : "Show More"}
      </Button>

      {showMore && (
        <div className="mt-4 p-4 border rounded-md">
          <p>Wajib Pajak: </p>
          <p>Alamat Objek: </p>
          <p>RT/RW: /</p>
          <p>Dusun: </p>
          <p>Kecamatan: </p>
          <p>Kelurahan: </p>
        </div>
      )}

      {/* Modal Detail NOP */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-2">{searchQuery}</h2>
          {propertyData && (
            <div>
              <p>Wajib Pajak: {propertyData.wajibPajak}</p>
              <p>Alamat Objek: {propertyData.alamat}</p>
              <p>RT/RW: {propertyData.rtRw}</p>
              <p>Dusun: {propertyData.dusun}</p>
              <p>Kecamatan: {propertyData.kecamatan}</p>
              <p>Kelurahan: {propertyData.kelurahan}</p>
            </div>
          )}
          <Button fullWidth onClick={() => setOpenModal(false)} className="mt-4">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Navbar;
