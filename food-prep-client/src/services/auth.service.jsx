import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      // Import and set server URL to base URL
      baseURL: import.meta.env.VITE_SERVER_URL,
    });

    this.api.interceptors.request.use((config) => {
      // Get stored token from user local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        // Send stored token in http header
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // Backend auth URLs
  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
  };

  signup = (requestBody) => {
    return this.api.post("/auth/signup", requestBody);
  };

  verify = () => {
    return this.api.get("/auth/verify");
  };
}

const authService = new AuthService();

export default authService;
