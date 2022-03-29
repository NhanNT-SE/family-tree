import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import history from "../helpers/history";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    const { response } = error;
    if (response && (response.status === 401 || response.status === 403)) {
      history.push("/login");
      return Promise.resolve();
    }
    return Promise.reject(error);
  }
);

export { axiosClient };
