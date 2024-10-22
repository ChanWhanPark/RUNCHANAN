import MapViewer from "../component/mapviewer/MapViewer"

import { Box } from "@mui/material";

const MapService = () => {
  return (
    <div>
      <h1>Map Viewer</h1>
      <Box>
        <MapViewer/>
      </Box>
      
    </div>
  )
}

export default MapService;