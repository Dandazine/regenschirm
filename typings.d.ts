export interface Data {
  clouds: Cloud;
  cod: string | 200;
  coord: Coords;
  main: Main;
  sys: Sys;
  name: string;
  timezone: number;
  dt: number;
  visibility: number;
  weather: Weather[];
  wind: Wind;
  message: string;
}

interface Cloud {
  all: number;
}

interface Coords {
  lat: number;
  lon: number;
}

interface Main {
  feels_like: number;
  temp: number;
  humidity: number;
  pressure: number;
}

interface Weather {
  description: string;
  icon: string;
  main: string;
}

interface Wind {
  deg: number;
  speed: number;
}

interface Sys {
  country: string;
  id: number;
  type: number;
}
