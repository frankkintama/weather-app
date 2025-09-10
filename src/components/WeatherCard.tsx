/*Hiển thị: nhiệt độ; mô tả thời tiết; tốc độ gió; độ ẩm; icon thời tiết */
import { getFormattedDate } from "../utils";
import { CurrentWeather, WeatherData } from "../types/weatherTypes";

interface WeatherCardProps {
    data: CurrentWeather;
}

const weatherIconUrl = 'https://openweathermap.org/img/wn/'

export function WeatherCard({data}: WeatherCardProps) {
    const {name, main, weather, wind, sys} = data;

    return (
        <div className='flex flex-col items-center bg-white shadow-md rounded-md p-6 w-72 flex-shrink-0'>
                <h2 className='text-lg font-bold'>
                    {name}, {sys.country}
                </h2>

                <h3 className='text-sm'>
                    {getFormattedDate()}
                </h3>

                <h3 className='mt-2 mb-4 font-semibold'>
                    Current Weather
                </h3>

                <div className='flex items-center justify-center w-full mb-4'>
                    <img 
                    src={`${weatherIconUrl}${weather[0].icon}@2x.png`} 
                    alt={weather[0].description} 
                    className='w16 h-16'/>

                    <span className='text-4xl font-bold'>
                        {Math.round(main.temp)}
                        <sup>&deg;C</sup>
                    </span>

                    <div className='text-right'>
                        <span className='block font-semibold'>{weather[0].main}</span>
                        <span className='block text-sm'>
                            Feels like {Math.round(main.feels_like)}
                            <sup>&deg;C</sup>
                        </span>
                    </div>
                </div>

                    <div className='flex justify-between text-sm w-full mt-4 space-x-4'>
                        <div className='text-center'>
                            Wind <br /> {Math.round(wind.speed)} km/h
                        </div>

                        <div className='text-center'>
                            Humidity <br /> {main.humidity}%
                        </div>

                        <div className='text-center'>
                            Pressure <br /> {main.pressure} mb
                        </div>
                    </div>
        </div>
    )
}