import API from "../config/axios.config";
import type {
  Employee,
  EmployeeCreate,
  EmployeeUpdate,
} from "../models/employee.model";

class EmployeeService {
  async getAll(): Promise<Employee[]> {
    const response = await API.get("/employees");
    return response.data;
  }

  async getById(id: number): Promise<Employee> {
    const response = await API.get(`/employees/${id}`);
    return response.data;
  }

  async create(data: EmployeeCreate): Promise<Employee> {
    const response = await API.post("/employees", data);
    return response.data;
  }
  async update(id: number, updatedEmployee: EmployeeUpdate): Promise<Employee> {
    const response = await API.patch(`/employees/${id}`, updatedEmployee);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await API.delete(`/employees/${id}`);
  }
}

export default new EmployeeService();
