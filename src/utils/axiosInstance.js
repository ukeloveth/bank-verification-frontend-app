import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8090/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
    if(token){
        axiosInstance.defaults.headers["Authorization"] = token;
    } else {
        delete axiosInstance.defaults.headers["Authorization"];
    }
}

export default axiosInstance;
