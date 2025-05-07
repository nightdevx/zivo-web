import API from "../config/axios.config";
import { UserInsert } from "../models/users.model";

class AuthService {
  async login(email: string, password: string) {
    try {
      const response = await API.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
  async register(user: UserInsert): Promise<string> {
    try {
      const response = await API.post("/auth/register", user);
      return response.data.user.id;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }

  async refreshAccessToken(token: string) {
    try {
      const response = await API.post(
        "/auth/refresh-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Refresh token error:", error);
      throw error;
    }
  }

  async logout() {
    try {
      const response = await API.post("/auth/logout");
      return response.data;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
}

export default new AuthService();
