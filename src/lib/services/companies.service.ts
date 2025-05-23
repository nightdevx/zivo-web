import API from "../config/axios.config";
import {
  Company,
  CompanyInsert,
  CompanyUpdate,
} from "../models/companies.model";
import FileService from "./file.service";
class CompaniesService {
  async getMyCompany(): Promise<
    Company & {
      logo_url: string;
      cover_image_url: string;
    }
  > {
    try {
      const response = await API.get("/companies/me");
      const company = response.data;

      // Replace logo and cover_image paths with URLs
      if (company.logo) {
        company.logo_url = await FileService.getFileUrl(company.logo);
      }
      if (company.cover_image) {
        company.cover_image_url = await FileService.getFileUrl(
          company.cover_image
        );
      }

      return company;
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

  async updateMyCompany(companyData: CompanyUpdate): Promise<Company> {
    try {
      const response = await API.put(`/companies`, companyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating company:`, error);
      throw error;
    }
  }
}

export default new CompaniesService();
