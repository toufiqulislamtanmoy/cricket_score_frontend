import globalConfig from "@/global.config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: globalConfig.baseUrl,
  headers: globalConfig.headers,
});

export default axiosInstance;
