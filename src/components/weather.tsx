/*Main component:
lấy vị trí người dùng bằng useGeolocation
Cho phép người dùng nhập tên City và search
Gọi API để lấy currentWeather và forecast
Child component WeatherCard và Forecast hiển thị thời tiết hiện tại và dự báo*/
/*1. Import và khai báo interface */
import { FormEvent, useState } from "react";
import { CurrentWeather, GeoData, WeatherData, WeatherItem, ForecastItem, ForecastData } from "../types/weatherTypes";
import useFetchWeather from "../hooks/useFetchWeather";
import useGeolocation from "../hooks/useGeolocation";
import { WeatherCard } from "./WeatherCard";
import { Forecast } from "./Forecast";


export default function Weather() {
/*2. useGeolocation hook */
/*Hook tự động lấy vị trí của người dùng
Nếu geoData tồn tại, nó sẽ được dùng để lấy thời tiết mặc định*/
    const {
        loading, 
        error, 
        data: geoData
    }= useGeolocation() as {
        loading: boolean;
        error: Error | null;
        data: GeoData | null
    };

/*3. State quản lý input và kết quả */
    const[city, setCity] = useState<string>('');
    const[searchQuery, setSearchQuery] = useState<string>('')

/*4. useFetchWeather hook */
    const {
        data, 
        error: apiError, 
        isLoading: apiLoading
    } = useFetchWeather(geoData, searchQuery) as {
        data: WeatherData | undefined;
        error: Error | null;
        isLoading: boolean;
    };

    const {currentWeather, forecast} = data || {};

/*5. xử lý trạng thái loading và error*/
    if (loading) {
        return <p className='text-blue-500 text-lg font-semibold'>
            Loading...</p>
    }

    if (error) {
        return (
            <p className='text-red-500 text-lg font-semibold'>
                Error:{error['message']};
            </p>
        )
    }

/*6. Xử lý form tìm kiếm */
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(city.trim()) {
            setSearchQuery(city.trim())
        }
    }

/*7. Render giao diện*/
    return (
    <div >
        <form onSubmit={handleSearch}>
            <input 
                type='text' 
                placeholder="Enter City name" 
                className='p-2 border border-gray-300 rounded'
                value={city}
                onChange={(e) => setCity(e.target.value)}/>
            
            <button type='submit' className='ml-2 p-2 bg-blue-500 text-white rounded'>
                Search
            </button>
        </form>

        {apiLoading && (
        <p className="text-blue-500 text-lg font-semibold">
          Loading weather data...
        </p>
        )}

        {apiError && (
        <p className="text-red-500 text-lg font-semibold">
          Error: {apiError.message}
        </p>
        )}
        
        {currentWeather && (
        <div className='bg-white shadow-md p-6 rounded-lg mb-4 w-full'>
            <WeatherCard data={currentWeather} />
        </div>)}

        {forecast && (
        <div className='bg-white shadow-md p-6 rounded-lg mb-4 w-full'>
            <Forecast  forecast={forecast}/>
        </div>)}
    </div>
    )
}