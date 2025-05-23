import { AlbumImage } from "../models/album-images.model";
import API from "../config/axios.config";

class AlbumImageService {
  async getAlbumImagesByAlbumId(albumId: string): Promise<AlbumImage[]> {
    const response = await API.get(`/album-images/${albumId}`);
    return response.data;
  }

  async createAlbumImage(albumImage: AlbumImage): Promise<AlbumImage> {
    const response = await API.post("/album-images", albumImage);
    return response.data;
  }

  async deleteAlbumImage(id: string): Promise<void> {
    await API.delete(`/album-images/${id}`);
  }
}

export default new AlbumImageService();
