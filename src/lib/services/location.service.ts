import API from "../config/axios.config";
import { Location } from "../models/location.model";

class LocationService {
  async getMyLocation(): Promise<Location> {
    try {
      const response = await API.get(`/locations/me`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching location:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch location. Please try again later.");
    }
  }

  async createLocation(locationData: Location): Promise<Location> {
    try {
      const response = await API.post("/locations", locationData);
      return response.data;
    } catch (error: any) {
      const status = error.response?.status;
      const statusText = error.response?.statusText;
      const errorMessage = error.response?.data?.message || error.message;

      console.error(
        `Error creating location: 
            Status: ${status} ${statusText || ""}
            Message: ${errorMessage}`
      );

      throw new Error(
        `Failed to create location. 
            Status: ${status} ${statusText || ""}
            Message: ${errorMessage}`
      );
    }
  }

  async updateMyLocation(locationData: Location): Promise<Location> {
    try {
      const response = await API.put(`/locations`, locationData);
      return response.data;
    } catch (error: any) {
      const status = error.response?.status;
      const statusText = error.response?.statusText;
      const errorMessage = error.response?.data?.message || error.message;

      console.error(
        `Error updating location: 
            Status: ${status} ${statusText || ""}
            Message: ${errorMessage}`
      );

      throw new Error(
        `Failed to update location. 
            Status: ${status} ${statusText || ""}
            Message: ${errorMessage}`
      );
    }
  }
}

export default new LocationService();
