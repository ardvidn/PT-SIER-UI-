import UploadButton from "./UploadButton";

const UploadKelurahan = () => {
  return (
    <UploadButton
      label="Batas Kelurahan"
      endpoint="http://localhost:8070/api/convert/bataskelurahan"
    />
  );
};

export default UploadKelurahan;
