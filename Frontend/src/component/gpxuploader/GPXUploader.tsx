import { useDropzone } from "react-dropzone";
import { Card } from "@mui/material";
const GPXUploader = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => {
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>;
  });

  return (
    <Card>
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p> Drag & Drop some files here, or click to select files.</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
    </Card>
  );
};

export default GPXUploader;
