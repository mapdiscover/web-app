export interface Place {
  lan: number;
  lat: number;
  name: string;
  properties: PlaceProperty<any>[];
}

interface PlaceProperty<T> {
  type: PlacePropertyType<T>;
  value: T;
}

interface PlacePropertyType<T> {
  icon: string;
  name: string;
  formatter: (arg: T) => string;
}

const phoneNumber: PlacePropertyType<number[]> = {
  icon: "phone",
  name: "phone number",
  formatter: (numbers) =>
    numbers.slice(0, 3).join("") + " " + numbers.slice(3),
};

const webPage: PlacePropertyType<string> = {
  icon: "public",
  name: "web page",
  formatter: (url) => `<a href="${url}" target="_blank">${url}</a>`,
};
