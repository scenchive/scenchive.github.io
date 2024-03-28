import axios from "axios";
import { response } from "express";

// console.log("toekn", token);
export const api = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
});

api.interceptors.response.use(
  (response) => {
    console.log('response', response)
    if (response.status === 401) {
      console.log('404페이지로 넘어가야 함');
    }
    return response;
  },
  async (error) => {
    console.log('error', error.response.status)
    if (error.response?.status === 401) {
      localStorage.removeItem('my-token');
      // window.location.replace("/login");   
    }
  }
)