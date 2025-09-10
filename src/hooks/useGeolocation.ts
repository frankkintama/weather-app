/*Dùng navigator.geolocation để lấy vị trí của người dùng */
import { useEffect, useState } from "react";

/*hook yêu cầu người dùng cho phép quyền truy cập vị trí hiện tại
e là đối số(paramenter) dùng trong getCurrentPosition()

onSuccess: nếu lấy vị trí thành công thì dừng lưu, xóa lỗi và 
gán setData vĩ độ và kinh độ hiện tại
on Error: nếu lấy vị trí không thành công thì dừng lưu và ghi lại lỗi */
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
