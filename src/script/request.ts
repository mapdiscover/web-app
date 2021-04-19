export class Requests {
  public static getSuggestions() {
    return ["supermarket", "Lidl", "Rewe", "bus station"];
  }
  public static getPois(term: string) {
    return features.filter(
      (e) => e.properties.name == term || e.properties.type == term
    );
  }
  public static getDetails(id: string) {
    switch (id) {
      case "33100447-d8bb-4e14-a9c9-f4926e23f4c6":
        return three;
      default:
        return c;
    }
  }
}

export type poiType = "supermarket";

export type basicPOI = {
  type: "Feature";
  properties: {
    name: string;
    type: poiType;
    "poi-id": string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
};

const features: basicPOI[] = [
  {
    type: "Feature",
    properties: {
      name: "Rewe",
      type: "supermarket",
      "poi-id": "33100447-d8bb-4e14-a9c9-f4926e23f4c6",
    },
    geometry: {
      coordinates: [6.979005932807922, 51.25200437819795],
      type: "Point",
    },
  },
  {
    type: "Feature",
    properties: {
      name: "Lidl",
      type: "supermarket",
      "poi-id": "c323e2a4-2cd2-40af-9b1d-b1136d127976",
    },
    geometry: {
      type: "Point",
      coordinates: [6.98306143283844, 51.254831364221154],
    },
  },
];

const three = {
  name: "Rewe",
  type: "supermarket",
  "poi-id": "33100447-d8bb-4e14-a9c9-f4926e23f4c6",
  brand: {
    name: "REWE",
    id: "d18cf395-2187-43ec-bfdd-f5cb386150bc",
    images: {
      logo:
        "https://serverthatdoesnotexistyet.com/assets/brands/d18cf395-2187-43ec-bfdd-f5cb386150bc/logo.svg",
      primary:
        "https://serverthatdoesnotexistyet.com/assets/brands/d18cf395-2187-43ec-bfdd-f5cb386150bc/primary.png",
    },
    "motto-text": [
      "Dein Markt",
      "Bist du ein Fan, sind wir dein Markt",
      "Besser leben",
    ],
    "social-media": {
      twitter: "REWE_Supermarket",
      youtube: "UCPM443QsHVGPrAm52bCof8w",
      pinterest: "rewe",
      instagram: "rewe",
      facebook: "Rewe",
    },
    website: "https://www.rewe.de",
  },
  payment: {
    cash: true,
  },
  "opening-times": {
    pattern: "Mo-Fr 07:00-24:00; Sa 07:00-22:00; PH off",
    "is-open": true,
  },
  address: {
    "street-name": "Schwarzbachstraße",
    "house-number": "10, 12, 14",
    "zip-code": "40822",
    city: "Mettmann",
    state: "Nordrhein-Westfalen",
    country: "DE",
  },
  "located-in": [
    "Mettmann",
    "Kreis Mettmann",
    "Bergisches Land",
    "Verkehrsverbund Rhein-Ruhr",
    "Regierungsbezirk Düsseldorf",
    "Nordrhein-Westfalen",
    "Deutschland",
  ],
  website: "https://www.rewe.de",
  accessibility: {
    wheelchair: true,
  },
  "data-sources": {
    openstreetmap: "1618176066",
  },
};

const c = {
  name: "Lidl",
  type: "supermarket",
  "poi-id": "c323e2a4-2cd2-40af-9b1d-b1136d127976",
  "opening-times": {
    pattern: "Mo-Sa 08:00-21:00; PH off",
    "is-open": true,
  },
  address: {
    "street-name": "Seibelstraße",
    "house-number": "2",
    "zip-code": "40822",
    city: "Mettmann",
    state: "Nordrhein-Westfalen",
    country: "DE",
  },
  "located-in": [
    "Mettmann",
    "Kreis Mettmann",
    "Bergisches Land",
    "Verkehrsverbund Rhein-Ruhr",
    "Regierungsbezirk Düsseldorf",
    "Nordrhein-Westfalen",
    "Deutschland",
  ],
  website: "https://www.lidl.de",
  accessibility: {
    wheelchair: true,
  },
  "data-sources": {
    openstreetmap: "1618176066",
  },
};
