export interface CurrentWeather {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {speed: number;};
  sys: {country: string;};
}

export interface GeoData{
    latitude: number;
    longitude: number
}

export interface WeatherItem {
  main: string;
  description: string;
  icon: string;
};

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {temp: number;};
  weather: WeatherItem[];
  wind: {speed:number};
}

export interface ForecastData {list: ForecastItem[];}

export interface WeatherData {
  currentWeather: CurrentWeather;
  forecast: ForecastData;
}