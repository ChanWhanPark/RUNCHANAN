import React, { useEffect, useRef } from "react";
// mui
import { Box } from "@mui/material";

// ol
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";

const MapComponent: React.FC = () => {
  const map_ref = useRef<HTMLDivElement>(null);
  const map_instance = useRef<Map | null>(null);

  useEffect(() => {
    if (!map_ref.current) return;

    map_instance.current = new Map({
      target: map_ref.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 13,
      }),
    });

    return () => {
      if (map_instance.current) {
        map_instance.current.setTarget(undefined);
      }
    };
  }, []);

  return (
    <div>
      <Box component="section">
        <div
          id="map"
          style={{ width: "1080px", height: "400px" }}
          ref={map_ref}
        ></div>
      </Box>
    </div>
  );
};

export default MapComponent;
