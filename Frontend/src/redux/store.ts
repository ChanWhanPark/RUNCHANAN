import { configureStore } from "@reduxjs/toolkit";

import gpxReducer from "./gpx/gpx.reducer";

export const reduxApp = configureStore({
  reducer: {
    gpx: gpxReducer,
  },
});

export type AppStore = typeof reduxApp;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
