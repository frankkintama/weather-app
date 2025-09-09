import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../services/api";
import type { GeoData, WeatherData } from "../services/api";

export default function useFetchWeather(
    geoData: GeoData | null, 
    searchQuery: string) {

    /*nếu người dùng nhập vào thanh search tên Thành phố hoặc vĩ độ và kinh độ thì thực hiện API call đến 
    Current Weather Data của OpenWeather*/
    const queryEnabled =
    !!searchQuery || (!!geoData?.latitude && !!geoData?.longitude);

    /*Dùng async để gọi API ưu tiên dữ liệu nhập từ người dùng (searchQuery), nếu không có searchQuery
    thì quay về geoData */ 
    const queryFn = async (): Promise<WeatherData> => {

    if (searchQuery) {
    const result = await fetchWeatherByCity(searchQuery);
    if (!result) throw new Error("No weather data found for city");
      return result;
    }

    if (geoData?.latitude && geoData?.longitude) {
      const result = await fetchWeatherByCoords(geoData);
      if (!result) throw new Error("No weather data found for coordinates");
      return result;
    }

    throw new Error("No valid search query or geo location provided.");
    };

    const {data, error, isLoading} = useQuery<WeatherData, Error>(
        {
            queryKey: ['weather', searchQuery || geoData],
            queryFn,
            enabled: queryEnabled,
            staleTime: 60 * 60 * 1000,
            gcTime: 60 * 60 * 1000
        })

    return {data, error, isLoading}
}