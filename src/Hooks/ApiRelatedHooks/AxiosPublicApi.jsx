"use client";

import axios from "axios";


const axiosPublicApi = axios.create({
    baseURL:"/api/",
});

export default function AxiosPublicApi() {
  return axiosPublicApi;
}
