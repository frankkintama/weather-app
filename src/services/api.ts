import axios from 'axios';

const weatherUrl = 'https://api.openweathermap.org/data/2.5'
const currentWeatherUrl = `${weatherUrl}/weather`;
const currentForecastUrl = `${weatherUrl}/forecast`;

export const weatherIconUrls = 'https://openweathermap.org/img/wn/';

const apiKey = import.meta.env.VITE_API_KEY;

export interface GeoData {
    latitude: number;
    longitude: number;
}

export interface WeatherInfo {
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

export interface ForecastItem {
  dt_txt: string;
  main: {temp: number;};
  weather: {
    description: string;
    icon: string;
  }[];
}

/*ForecastData có prop 'list'
list là array chứa các ForecastItem
mỗi ForecastItem có cấu trúc như định nghĩa */
export interface ForecastData {list: ForecastItem[];}

export interface WeatherData {
  currentWeather: WeatherInfo;
  forecast: ForecastData;
}

/*Nhận tạo độ người dùng -> tạo tham số API
-> gửi 2 request song song đến OpenWeatherMap 
-> trích dữ liệu từ response.data -> trả dữ liệu thời tiết hiện tại, dự báo*/
export const fetchWeatherByCoords = async (
  geoData: GeoData | null
): Promise<WeatherData | undefined> => {
  /*nếu geoData thiếu vĩ độ hoặc kinh độ hoặc là null thì dừng hàm */
  if (!geoData?.latitude || !geoData?.longitude) return;

  const params = {
    lat: geoData.latitude,
    lon: geoData.longitude,
    units: "metric",
    appid: apiKey,
  };

  /*Promise.all() gọi 2 request song song thay vì lần lượt
  axios.get(..., {params}) là cách thêm query string tự động */
  const [current, forecast] = await Promise.all([
    axios.get(currentWeatherUrl, { params }),
    axios.get(currentForecastUrl, { params }),
  ]);

  /*trả dữ liệu JSON từ API thời tiết hiện tại và dự báo */
  return {
    currentWeather: current.data,
    forecast: forecast.data,
  };
};

export const fetchWeatherByCity = async (
  searchQuery: string
): Promise<WeatherData | undefined> => {
  if (!searchQuery) return;

  const params = {
    q: searchQuery,
    units: "metric",
    appid: apiKey,
  };

  const [current, forecast] = await Promise.all([
    axios.get(currentWeatherUrl, { params }),
    axios.get(currentForecastUrl, { params }),
  ]);

  return {
    currentWeather: current.data,
    forecast: forecast.data,
  };
};