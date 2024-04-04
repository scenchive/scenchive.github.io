import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("my-token");
      window.location.replace("/login");
    }
  }
);
