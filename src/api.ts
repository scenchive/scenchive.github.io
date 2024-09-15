import axios from "axios";
import { resetUserType } from "./stores/useUserAuthority";

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
      resetUserType();
      alert("다시 로그인해주세요");
      window.location.replace("/login");
    }
  }
);
