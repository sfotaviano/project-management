import axios from "axios";

const baseURL = "http://localhost/api/";

const api = axios.create({ baseURL, timeout: 30000 });

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  async (res) => {
    // console.log('intercept reponse', res.config.url);
    return res;
  },
  async (error) => {
    const storagedToken = localStorage.getItem("token");

    if (error.response?.status === 401 && !!storagedToken) {
      // If the token is invalid, remove it from localStorage
      localStorage.removeItem("token");
      // Optionally, you can redirect to login or show a message
      console.error("Token expired or invalid, redirecting to login...");
      window.location.href = "/login"; // Adjust the path as needed
    }

    return Promise.reject(error);
  }
);

export default api;
