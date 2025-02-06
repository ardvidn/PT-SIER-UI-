import UploadButton from "./UploadButton";

const UploadKelurahan = () => {
  return (
    <UploadButton
      label="Batas Kelurahan"
      endpoint="http://localhost:8080/api/convert/bataskelurahan"
    />
  );
};

export default UploadKelurahan;
