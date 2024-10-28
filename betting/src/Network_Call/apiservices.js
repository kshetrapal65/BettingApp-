/** @format */

import Axios from "axios";
import { getToken } from "../Helper/Storage";
const axiosInstance = Axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    let token = window.localStorage.getItem("@userToken");
    config.headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Length": 0,
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      "Access-Control-Allow-Headers":
        "Content-Type, x-requested-with,X-Custom-Header,pgrade-Insecure-Requests,Accept,Content-Type",
      "Access-Control-Max-Age": 86400,
    };
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};

const newAxiosInstance = Axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
let token = getToken();

export const apiCallNew = (method, body, url, formData, headers) => {
  return new Promise((resolve) => {
    const header = { ...headers, Authorization: `Bearer ${token}` };
    const data = {};
    if (method.toLowerCase() == "get" && data) {
      data.params = body;
    }
    if (method.toLowerCase() == "post" && !formData) {
      data.data = body;
    }
    if (method.toLowerCase() == "post" && formData) {
      data.formData = getFormData(body);
    }
    newAxiosInstance({
      method: method,
      url: url,
      ...data,
      headers: header,
    })
      .then(async (res) => {
        let response = res.data;
        resolve(response);
      })
      .catch(async (error) => {
        if (error.response) {
          if (error.response.status === 409) {
            alert(error.response.data.message);
          }

          if (error.response.status === 502 || error.response.status === 404) {
          }
          resolve(error.response.data);
          return;
        }
        if (error.code === "ECONNABORTED") {
          resolve({ status: 400 });
          return;
        }
        resolve({ status: 400 });
      });
  });
};
