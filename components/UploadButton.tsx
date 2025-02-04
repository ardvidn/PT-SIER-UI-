// import React, { useState } from "react";

// interface UploadButtonProps {
//   label: string;
//   endpoint: string;
// }

// const UploadButton: React.FC<UploadButtonProps> = ({ label, endpoint }) => {
//   const [files, setFiles] = useState<File[]>([]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setFiles(Array.from(e.target.files));
//   };

//   const handleUpload = async () => {
//     if (files.length !== 2) {
//       alert("Silakan unggah 2 file (.shp & .dbf)");
//       return;
//     }

//     const formData = new FormData();
//     files.forEach((file) => formData.append("files", file));

//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         alert(`Berhasil mengunggah ${label}`);
//       } else {
//         alert(`Gagal mengunggah ${label}`);
//       }
//     } catch (error) {
//       console.error("Error uploading files:", error);
//       alert(`Terjadi kesalahan saat mengunggah ${label}`);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-2 p-4">
//       <input
//         type="file"
//         accept=".shp,.dbf"
//         multiple
//         onChange={handleFileChange}
//         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//       />
//       <button
//         onClick={handleUpload}
//         className="rounded-lg px-4 py-2 text-white hover:opacity-80 transition"
//         style={{
//           backgroundColor:
//             label === "Batas Kelurahan"
//               ? "blue"
//               : label === "Batas Blok"
//               ? "green"
//               : "red",
//         }}
//       >
//         Upload {label}
//       </button>
//     </div>
//   );
// };

// export default UploadButton;

/////////////////////////////////

import React, { useState } from "react";
import axios from "axios";

interface UploadButtonProps {
  label: string;
  endpoint: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({ label, endpoint }) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (files.length !== 2) {
      alert("Silakan unggah 2 file (.shp & .dbf)");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert(`Berhasil mengunggah ${label}`);
      } else {
        alert(`Gagal mengunggah ${label}: ${response.data.message}`);
      }
    } catch (error: any) {
      console.error("Error uploading files:", error);
      alert(
        `Terjadi kesalahan saat mengunggah ${label}: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <input
        type="file"
        accept=".shp,.dbf"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        className="rounded-lg px-4 py-2 text-white hover:opacity-80 transition"
        style={{
          backgroundColor:
            label === "Batas Kelurahan"
              ? "blue"
              : label === "Batas Blok"
              ? "green"
              : "red",
        }}
      >
        Upload {label}
      </button>
    </div>
  );
};

export default UploadButton;
