import API from "../config/axios.config";

class FileService {
  async uploadFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await API.post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.path;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async getFileUrl(filePath: string): Promise<string> {
    try {
      const response = await API.post(`/files/url`, {
        filePath,
      });
      return response.data.url;
    } catch (error) {
      console.error("Error fetching file URL:", error);
      throw error;
    }
  }

  async deleteFile(filePath: string): Promise<any> {
    try {
      const response = await API.delete(`/files/${filePath}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }
}

export default new FileService();
