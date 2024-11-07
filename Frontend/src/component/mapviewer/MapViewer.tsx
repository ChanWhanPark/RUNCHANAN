import { useEffect, useRef } from "react";

// ol
import "ol/ol.css";
import { Map as OlMap, View } from "ol";
import { OSM } from "ol/source";
import { Tile as TileLayer, Group as LayerGroup, Layer } from "ol/layer";

import { ScaleLine, defaults as defaultControls } from "ol/control";
import { createEmpty, extend, Extent, getCenter } from "ol/extent";

// ol-ext
import Colorize from "ol-ext/filter/Colorize";

// Map Viewer Type
import { RouteViewerInterface } from "./map-viewer-type";

// Redux
import { useAppSelector } from "../../redux/hooks";

//import { _Log_ } from "../utils/utils";

const MapViewer = (props: RouteViewerInterface) => {
  const { width = 1080, height = 720 } = props;

  const ref_map = useRef<OlMap | null>(null);
  const ref_layers = useRef<Array<Layer>>([]);
  const ref_osm = useRef<TileLayer<OSM> | null>(null);

  const gpxData = useAppSelector((state) => state.gpx.value);

  useEffect(() => {
    InitLayer();
    InitMapObject();
    return () => {
      console.log("unmount MapService");
    };
  }, []);

  useEffect(() => {
    console.log(gpxData);
  }, [gpxData]);

  const interpolation = (extents: Array<Extent>) => {
    if (ref_map.current && extents.length > 0) {
      const mergedExtent = extents.reduce((merged, extent) => {
        return extend(merged, extent);
      }, createEmpty());

      const center = getCenter(mergedExtent);
      const resolution = ref_map.current
        .getView()
        .getResolutionForExtent(mergedExtent, ref_map.current.getSize());
      const zoom = ref_map.current.getView().getZoomForResolution(resolution);
      ref_map.current.getView().animate({
        zoom: zoom ? zoom - 1 : 10,
        center: center,
        duration: 1000,
      });
    }
  };

  const UpdateLayers = (zoom = true) => {
    const updateLayer: Array<Layer> = [];
    if (ref_osm.current) updateLayer.push(ref_osm.current);
    ref_layers.current = updateLayer;

    if (ref_map.current) {
      ref_map.current.setLayerGroup(
        new LayerGroup({
          layers: ref_layers.current,
        })
      );
      ref_map.current.updateSize();
      if (zoom) {
        const extents: Array<Extent> = [];
        interpolation(extents);
      }
    }
  };

  const InitLayer = () => {
    ref_osm.current = new TileLayer({ source: new OSM() });
    ref_osm.current.addFilter(new Colorize({ operation: "grayscale" }));
  };

  const InitMapObject = () => {
    ref_map.current = new OlMap({
      controls: defaultControls().extend([new ScaleLine({ units: "degrees" })]),
      target: "route_viewer",
      layers: ref_layers.current,
      view: new View({
        projection: "EPSG:4326",
        center: [127.1143194, 37.5088916],
        zoom: 10,
        minZoom: 6,
      }),
    });
    UpdateLayers();
  };

  return (
    <>
      <div id="route_viewer" style={{ width: width, height: height }} />
    </>
  );
};

export default MapViewer;
