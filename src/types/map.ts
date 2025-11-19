export type Point = {
  name: string;
  address: string;
  location: Location;
};

export type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
};
