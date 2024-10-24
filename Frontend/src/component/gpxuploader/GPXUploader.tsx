import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@mui/material";
import * as togeojson from "@tmcw/togeojson";
import { DOMParser } from "xmldom";

// GeoJSON 타입을 지정 (필요한 속성만 포함할 수 있음)
interface GeoJSON {
  type: string;
  features: unknown[];
}

const GPXUploader = () => {
  const [gpxData, setGpxData] = useState<GeoJSON | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const text = event.target?.result as string;
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");
        const geoJSON = togeojson.gpx(xml) as GeoJSON;
        setGpxData(geoJSON);
      } catch (err) {
        setError(`Error : ${err}`);
      }
    };

    reader.onerror = () => {
      setError(`Error reading file`);
    };

    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/gpx+xml": [".gpx"] },
  });

  return (
    <div
      {...getRootProps()}
      style={{ border: "2px dashed #007BFF", textAlign: "center" }}
    >
      <input {...getInputProps()} />
      <Typography variant="h6">
        Drag & Drop a GPX file here, or click to select one
      </Typography>

      {gpxData && (
        <div>
          <Typography variant="h6">GPX Data:</Typography>
          <pre>{JSON.stringify(gpxData, null, 2)}</pre>
        </div>
      )}

      {error && <Typography style={{ color: "#FF0000" }}>{error}</Typography>}
    </div>
  );
};

export default GPXUploader;
