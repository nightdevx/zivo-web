import AlbumImageService from "../services/album-image.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlbumImage } from "../models/album-images.model";

export const GetAlbumImagesByAlbumIdQueryOptions = {
  queryKey: ["album-images"],
  queryFn: async (albumId: string) => {
    const response = await AlbumImageService.getAlbumImagesByAlbumId(albumId);
    return response;
  },
};
export const useGetAlbumImagesByAlbumId = (albumId: string) => {
  return useQuery<AlbumImage[], Error>({
    queryKey: [GetAlbumImagesByAlbumIdQueryOptions.queryKey, albumId],
    queryFn: () => GetAlbumImagesByAlbumIdQueryOptions.queryFn(albumId),
    enabled: !!albumId,
  });
};

export const useCreateAlbumImage = () => {
  return useMutation({
    mutationFn: (albumImage: AlbumImage) => {
      return AlbumImageService.createAlbumImage(albumImage);
    },
  });
};