/*Hiển thị danh sách dự báo 5 ngày tới: ngày ngắn gọn, nhiệt độ, icon thời tiết, tốc độ gió */
import { getShortDate } from "../utils";
import { ForecastItem } from "../types/weatherTypes";

const weatherIconUrl = "https://openweathermap.org/img/wn/";

type ForecastProps = {
  forecast: {list: ForecastItem[];};
};

/*React Function Component: nhận prop forecast có list chứa các ForecastItem */
export const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
    return (
        <div className='text-lg font-bold mb-2'>
                <h2 className='text-lg font-bold mb-4'>Forecast</h2>
        
                <div className='flex gap-4 overflow-x-auto pb-2'>
                    {forecast.list.slice(0, 5).map((forecastItem, index) => { /*lấy 5 phần 
                    tử đầu tiên rồi .map(...)lặp qua từng forecastItem để render UI */
                        const {dt, weather, main, wind} = forecastItem;
                        return (
                        <div key={index} className='p-2 w-32 rounded-lg shadow-md 
                        flex-shrink-0 bg-gray-50'>
                            
                             <p className='font-semibold'>
                                {getShortDate(dt)}
                            </p>

                            <div className='flex justify-center mb-1'>
                                <img 
                                src={`${weatherIconUrl}${weather[0].icon}.png`} 
                                alt={weather[0].description} />
                            </div>
                           

                            <p className='text-xl font-bold'>
                                {Math.round(main.temp)}&deg;C
                            </p>
                                
                            <p className= 'font-semibold'>
                                {weather[0].main}
                            </p>

                            <div>{Math.round(wind.speed)} m/s</div>
                        </div>
                    )})}
                </div>
            </div>
    )
}