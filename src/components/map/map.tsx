import { useEffect, useRef, useState } from 'react';
import { Icon, Marker } from 'leaflet';

import useMap from '@src/hooks/use-map';

import type { Point } from '@src/types/map';
import { Points, URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '@src/const';

import 'leaflet/dist/leaflet.css';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [26, 24],
  iconAnchor: [13, 12]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [26, 24],
  iconAnchor: [13, 12]
});

const Map = () => {
  const [point, setPoint] = useState<Point>(Points[0]);
  const mapRef = useRef(null);
  const map = useMap(mapRef, point);

  useEffect(() => {
    const markers: Marker[] = [];

    if (map) {
      Points.forEach(({ name, location: { latitude: lat, longitude: lng } }) => {
        const marker = new Marker({
          lat,
          lng
        });

        marker
          .setIcon(point.name === name ? currentCustomIcon : defaultCustomIcon)
          .addTo(map);

        markers.push(marker);
      });

      map.setView(
        {
          lat: point.location.latitude,
          lng: point.location.longitude
        },
        point.location.zoom
      );
    }

    return () => {
      if (map) {
        markers.forEach((marker) => {
          map.removeLayer(marker);
        });
      }
    };
  }, [map, point,mapRef]);

  return (
    <section className="map">
      <div className="container">
        <h2 className="map__title">адреса</h2>
        <div className="map__wrapper" ref={mapRef}></div>
        <ul className="map__addresses">
          {
            Points.map(({name, address}, i) => (
              <li key={name} className="map__address">
                <div className="custom-toggle custom-toggle--radio custom-toggle--address">
                  <input type="radio"
                    value={`user-agreement-id-${i}`} id={`user-agreement-id-${i}`} name="user-agreement"
                    onChange={() => setPoint(Points[i])}
                    checked={point.name === name}
                  />
                  <label className="custom-toggle__label" htmlFor={`user-agreement-id-${i}`}>{name}</label>
                  <address className="custom-toggle__address">{address}
                    <svg className="custom-toggle__icon" width="26" height="24" aria-hidden="true">
                      <use xlinkHref="#icon-keks-footprint"></use>
                    </svg>
                  </address>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  );
};

export default Map;
