import API from "../config/axios.config";
import { EmployeeServices } from "../models/employee-services.model";

class EmployeeServicesService {
  async getEmployeeServices() {
    const response = await API.get<EmployeeServices[]>("/employee-services");
    return response.data;
  }

  async getEmployeeServicesById(id: string) {
    const response = await API.get<EmployeeServices>(
      `/employee-services/${id}`
    );
    return response.data;
  }

  async createEmployeeServices(employeeServices: EmployeeServices[]) {
    const response = await API.post<EmployeeServices[]>(
      "/employee-services",
      employeeServices
    );
    return response.data;
  }

  async deleteEmployeeService(employee_id: string, service_id: string) {
    const response = await API.delete<EmployeeServices>(
      `/employee-services/${employee_id}/${service_id}`
    );
    return response.data;
  }
}

export default new EmployeeServicesService();
