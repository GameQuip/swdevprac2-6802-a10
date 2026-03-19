export interface Venue {
  vid: string;
  name: string;
  image: string;
}

export const mockVenue: Venue[] = [
  { vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg" },
  { vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg" },
  { vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg" },
];

export const venueMap = new Map<string, Venue>(
  mockVenue.map((v) => [v.vid, v]),
);
