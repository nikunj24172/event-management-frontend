import axios from "axios";

const axiosInstance = axios.create({ baseURL: "https://event-management-backend-3-yupw.onrender.com/api" });
export default axiosInstance;
