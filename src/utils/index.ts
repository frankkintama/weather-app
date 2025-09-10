//thời gian đầy đủ
export const getFormattedDate = (): string => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    return currentDate.toLocaleString('vi-VN', options);
};

//thời gian ngắn gọn
export const getShortDate = (timestamp: number): string => {
    const forecastDate = new Date(timestamp * 1000) /*mặc định xài mili sec, chuyển mili sec sang sec*/; 
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
    };

    return forecastDate.toLocaleString('vi-VN', options);
};
