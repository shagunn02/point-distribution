import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://leadboard-ranking-1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
