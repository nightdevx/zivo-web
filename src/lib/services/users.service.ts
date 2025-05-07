import API from "../config/axios.config";
import { User, UserInsert, UserUpdate } from "../models/users.model";

// filepath: /home/night/Desktop/Projects/zivo/zivo-web/lib/services/users.service.ts

class UsersService {
  async getMyUser(): Promise<User> {
    const response = await API.get<User>("/users/me");
    return response.data;
  }

  async createUser(user: UserInsert): Promise<User> {
    const response = await API.post<User>("/users", user);
    return response.data;
  }

  async updateUser(id: number, user: UserUpdate): Promise<User> {
    const response = await API.put<User>(`/users/${id}`, user);
    return response.data;
  }

  async deleteUser(id: number): Promise<void> {
    await API.delete(`/users/${id}`);
  }
}

export default new UsersService();
