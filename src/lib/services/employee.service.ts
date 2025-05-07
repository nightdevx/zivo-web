import API from "../config/axios.config";
import { EmployeeServices } from "../models/employee-services.model";
import type {
  Employee,
  EmployeeCreate,
  EmployeeUpdate,
} from "../models/employee.model";
import EmployeeServicesService from "./employee-services.service";

class EmployeeService {
  async getAll(): Promise<Employee[]> {
    const response = await API.get("/employees");
    return response.data;
  }

  async getById(id: string): Promise<Employee> {
    const response = await API.get(`/employees/${id}`);
    return response.data;
  }

  async create(data: EmployeeCreate): Promise<Employee> {
    const { specialties, ...employeeData } = data;

    const response = await API.post("/employees", employeeData);

    const employee = response.data;
    if (specialties && specialties.length > 0) {
      const employeeServices: EmployeeServices[] = specialties.map(
        (service) => {
          return { employee_id: employee.id, service_id: service };
        }
      );

      await EmployeeServicesService.createEmployeeServices(employeeServices);
    }

    return employee;
  }
  async update(id: string, updatedEmployee: EmployeeUpdate): Promise<Employee> {
    const { specialties, ...employeeData } = updatedEmployee;

    let employee = {} as Employee;
    if (Object.keys(employeeData).length > 0) {
      const response = await API.put(`/employees/${id}`, employeeData);
      employee = response.data;
    } else {
      employee = await this.getById(id);
    }

    if (specialties && specialties.length > 0) {
      const employeeServices: EmployeeServices[] = specialties.map(
        (service) => {
          return { employee_id: id, service_id: service };
        }
      );

      await EmployeeServicesService.createEmployeeServices(employeeServices);
    }

    return employee;
  }

  async delete(id: string): Promise<void> {
    await API.delete(`/employees/${id}`);
  }
}

export default new EmployeeService();
