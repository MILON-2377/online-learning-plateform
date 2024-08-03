import axios from "axios";

const axiosSecureApi = axios.create({
  baseURL: "/api/",
  withCredentials:true,
});

export default axiosSecureApi;
