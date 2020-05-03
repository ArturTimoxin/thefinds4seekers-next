import axios from "axios";
import { toastError } from '../utils/toastrConfig';
import Router from 'next/router';

const API = axios.create({
  baseURL: process.env.API_URL,
  headers: {
	  "Access-Control-Allow-Origin": "*",
  }
});

API.interceptors.request.use(
  function(config) {
    if(!process.browser) return config;
    const token = JSON.parse(localStorage.getItem('token'));
    config.headers["Authorization"] = `Bearer ${token}`
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if(error.response && error.response.data && error.response.data.message) {
      toastError(error.response.data.message);
    }
    if(error.response && error.response.status === 401) {
      Router.push('/');
    }
    return Promise.reject(error);
  },
);

export default API;
