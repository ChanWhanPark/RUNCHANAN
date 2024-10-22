import MapViewer from "../component/mapviewer/MapViewer";
import GPXUploader from "../component/gpxuploader/GPXUploader";

import { Card, Grid2 as Grid } from "@mui/material";

const MapService = () => {
  return (
    <div>
      <h3>Map Viewer</h3>
        <Grid container spacing={2}>
          <Grid size={8}>
            <Card><MapViewer/></Card>
          </Grid>
          <Grid size={4}>
            <Card><GPXUploader/></Card>
          </Grid>
        </Grid>
    </div>
  )
}

export default MapService;