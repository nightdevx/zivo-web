import API from "../config/axios.config";
import {
  Company,
  CompanyInsert,
  CompanyUpdate,
} from "../models/companies.model";

class CompaniesService {
  async getMyCompany(): Promise<Company> {
    try {
      const response = await API.get("/companies/me");
      return response.data;
    } catch (error) {
      console.error("Error fetching my company:", error);
      throw error;
    }
  }
  async createCompany(companyData: CompanyInsert): Promise<Company> {
    try {
      const response = await API.post("/companies", companyData);
      return response.data;
    } catch (error) {
      console.error("Error creating company:", error);
      throw error;
    }
  }

  async updateCompany(
    id: string,
    companyData: CompanyUpdate
  ): Promise<Company> {
    try {
      const response = await API.put(`/companies/${id}`, companyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating company with id ${id}:`, error);
      throw error;
    }
  }
}

export default new CompaniesService();
