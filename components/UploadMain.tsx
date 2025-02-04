import UploadBlok from "./UploadBlok";
import UploadKelurahan from "./UploadKeluarhan";
import UploadPersil from "./UploadPersil";

const UploadMain = () => {
  return (
    <div className="flex items-center gap-6 p-6 bg-white">
      <h2 className="text-lg font-semibold">Upload Batas Wilayah</h2>
      <UploadKelurahan />
      <UploadBlok />
      <UploadPersil />
    </div>
  );
};

export default UploadMain;
