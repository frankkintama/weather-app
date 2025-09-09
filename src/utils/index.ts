export const getFormattedDate = (): string => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    return currentDate.toLocaleString('en-US', options);
};

export const getShortDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); 
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
    };

    return date.toLocaleString('en-US', options);
};