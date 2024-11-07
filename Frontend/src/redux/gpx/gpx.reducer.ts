import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { GeoJSON } from "../../component/gpxuploader/geojson";

interface GPX {
  value: GeoJSON;
}

const initialState: GPX = {
  value: {
    type: "FeatureCollection",
    features: [],
  },
};

export const gpxReducer = createSlice({
  name: "gpx",
  initialState,
  reducers: {
    valueUpdate: (state, action: PayloadAction<GeoJSON>) => {
      console.log(state, action);
      state.value.type = action.payload.type;
      state.value.features = action.payload.features;
    },
  },
});

export const gpxActions = gpxReducer.actions;

export const gpxUpdate = (state: RootState) => state.gpx;

export default gpxReducer.reducer;
