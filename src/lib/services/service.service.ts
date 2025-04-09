import API from "../config/axios.config";
import { Service, ServiceInsert, ServiceUpdate } from "../models/service.model";

class ServiceService {
  async getAll(): Promise<Service[]> {
    try {
      const response = await API.get(`/services`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all services:", error);
      throw error;
    }
  }

  async getById(id: number): Promise<Service | null> {
    try {
      const response = await API.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching service with ID ${id}:`, error);
      throw error;
    }
  }

  async create(service: ServiceInsert): Promise<Service> {
    try {
      const response = await API.post("/services", service);
      return response.data;
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  }

  async update(id: number, service: ServiceUpdate): Promise<Service> {
    try {
      const response = await API.put(`/services/${id}`, service);
      return response.data;
    } catch (error) {
      console.error(`Error updating service with ID ${id}:`, error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await API.delete(`/services/${id}`);
    } catch (error) {
      console.error(`Error deleting service with ID ${id}:`, error);
      throw error;
    }
  }
}

export default new ServiceService();
