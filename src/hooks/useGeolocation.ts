import { useEffect, useState } from "react";

export default function useGeolocation(){ 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({});

    useEffect(() => {
    const onSuccess = (e) => {
        setLoading(false);
        setError(null);
        setData(e.coords);
    }

    const onError = (e) => {
        setLoading(false);
        setError(e);
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
 }, [])

 return {loading, error, data}
}
