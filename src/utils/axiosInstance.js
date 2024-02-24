import axios from "axios";
import { appConfig } from "../config";

const axiosInstance = axios.create({
    baseURL: appConfig.REACT_APP_API_URL,
});

axiosInstance.interceptors.response.use(
    response => response,
    error => Promise.reject(error || "Something went wrong"),
);

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
