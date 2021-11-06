import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import { baseUrl } from "./constants";
axios.defaults.baseURL = baseUrl;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refreshToken");
    if (
      refreshToken &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`/api/v1/user/token/refresh/`, { refresh: refreshToken })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.access);
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
