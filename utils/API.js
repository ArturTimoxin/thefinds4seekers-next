import axios from "axios";

const API = axios.create({
  baseURL: process.env.API_URL,
  headers: {
	  "Access-Control-Allow-Origin": "*",
  }
});

// API.interceptors.request.use(
//   function(config) {
//     // config.headers["Authorization"] = `Bearer`
//     return config;
//   },
//   function(error) {
//     return Promise.reject(error);
//   },
// );

// API.interceptors.response.use(
//   function(response) {
//     return response;
//   },
//   function(error) {
//     return Promise.reject(error);
//   },
// );

export default API;
