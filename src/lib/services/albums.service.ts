import { Album, AlbumInsert, AlbumUpdate } from "../models/albums.model";
import API from "../config/axios.config";

class AlbumsService {
  async getAllAlbums(): Promise<Album[]> {
    const response = await API.get("/albums");
    return response.data;
  }

  async getAlbumById(id: string): Promise<Album> {
    const response = await API.get(`/albums/${id}`);
    return response.data;
  }

  async createAlbum(album: AlbumInsert): Promise<Album> {
    const response = await API.post("/albums", album);
    return response.data;
  }
  async updateAlbum(album: AlbumUpdate): Promise<Album> {
    const response = await API.put(`/albums/${album.id}`, album);
    return response.data;
  }
  async deleteAlbum(id: string): Promise<void> {
    await API.delete(`/albums/${id}`);
  }
  async getAlbumsByCompanyId(): Promise<Album[]> {
    const response = await API.get(`/albums/company`);
    return response.data;
  }
}
export default new AlbumsService();
