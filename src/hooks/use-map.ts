import { type RefObject, useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'leaflet';

import type { Point } from '@src/types/map';

const MapSettings = {
  TILE_LAYER: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
};

const useMap = (
  mapRef: RefObject<HTMLElement | null>,
  point: Point
): Map | null => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: point.location.latitude,
          lng: point.location.longitude,
        },
        zoom: point.location.zoom,
      });

      const layer = new TileLayer(
        MapSettings.TILE_LAYER,
        {
          attribution: MapSettings.ATTRIBUTION,
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, map, point]);

  return map;
};

export default useMap;
