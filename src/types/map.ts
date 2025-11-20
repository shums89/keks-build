import type { IconNames } from '@src/const';

export type IconName = typeof IconNames[number];

export type Point = {
  name: string;
  address: string;
  mapMarker: IconName;
  location: Location;
};

export type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
};

export type MapMarker = {
  iconUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
}
