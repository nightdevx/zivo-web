import { Image, ImageInsert } from "../models/images.model";
import API from "../config/axios.config";

class ImagesService {
  async getAllImages(): Promise<Image[]> {
    const response = await API.get("/images");
    return response.data;
  }

  // async getImagesByAlbumId(albumId: string): Promise<Image[]> {
  //   const response = await API.get(`/images/album/${albumId}`);
  //   return response.data;
  // }

  async getImagesByCompanyId(): Promise<Image[]> {
    const response = await API.get("/images/company");
    return response.data;
  }

  async getImageById(id: string): Promise<Image> {
    const response = await API.get(`/images/${id}`);
    return response.data;
  }

  async createImage(image: ImageInsert): Promise<Image> {
    const response = await API.post("/images", image);
    return response.data;
  }

  async createImages(images: ImageInsert[]): Promise<Image[]> {
    const response = await API.post("/images/bulk", images);
    return response.data;
  }

  async deleteImage(id: string): Promise<void> {
    await API.delete(`/images/${id}`);
  }
}

export default new ImagesService();
