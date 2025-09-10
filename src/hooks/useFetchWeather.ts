/*Gọi API để lấy dữ liệu thời tiết và dự báo */
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../services/api";
import { GeoData, WeatherData } from "../types/weatherTypes"

export default function useFetchWeather(
    geoData: GeoData | null, 
    searchQuery: string) {

    /*queryEnabled: bật gọi API 
    nếu người dùng nhập vào thanh search tên Thành phố hoặc vĩ độ và kinh độ thì bật gọi API đến 
    Current Weather Data của OpenWeather*/
    const queryEnabled =
    !!searchQuery || (!!geoData?.latitude && !!geoData?.longitude);

    /*queryFn: query function
    async bắt đầu khai báo đây là hàm bất đồng bộ 
    Cách hàm hoạt động: người dùng nhập dữ liệu, dữ liệu sẽ được kiểm tra để trả dữ liệu thời tiết
    quá trình kiểm tra là pending nên ta dùng Promise*/ 
    const queryFn = async (): Promise<WeatherData> => {

    /*khi người dùng nhập thành phố, gọi fetchWeatherByCity ở api.ts
     nếu không kiếm ra kết quả thì đưa lỗi*/
    if (searchQuery) {
    const result = await fetchWeatherByCity(searchQuery);
    if (!result) throw new Error("No weather data found for city");
      return result;
    }

    /*khi người dùng nhập vĩ độ hoặc kinh độ, gọi fetchWeatherByCoords ở api.ts
    nếu không kiếm ra kết quả thì đưa lỗi */
    if (geoData?.latitude && geoData?.longitude) {
      const result = await fetchWeatherByCoords(geoData);
      if (!result) throw new Error("No weather data found for coordinates");
      return result;
    }

    /*nếu dữ liệu nhập không hợp cả 2 trường hợp thì đưa lỗi */
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
