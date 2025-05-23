import AlbumsService from "../services/albums.service";
import {
  useQuery,
  useMutation,
  queryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { Album, AlbumInsert, AlbumUpdate } from "../models/albums.model";

export const GetAllAlbumsQueryOptions = queryOptions({
  queryKey: ["albums"],
  queryFn: AlbumsService.getAllAlbums,
  staleTime: 1000 * 60 * 5, // 5 minutes
});
export const GetAlbumsByCompanyIdQueryOptions = queryOptions({
  queryKey: ["albums", "company"],
  queryFn: AlbumsService.getAlbumsByCompanyId,
  staleTime: 1000 * 60 * 5, // 5 minutes
});
export const useGetAllAlbums = () => {
  return useQuery<Album[], unknown>({
    queryKey: ["albums"],
    queryFn: AlbumsService.getAllAlbums,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
export const useGetAlbumsByCompanyId = () => {
  return useQuery<Album[], unknown>({
    queryKey: ["albums", "company"],
    queryFn: AlbumsService.getAlbumsByCompanyId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
export const useCreateAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (album: AlbumInsert) => AlbumsService.createAlbum(album),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.refetchQueries({ queryKey: ["albums"] });
    },
  });
};
export const useUpdateAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (album: AlbumUpdate) => AlbumsService.updateAlbum(album),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.refetchQueries({ queryKey: ["albums"] });
    },
  });
};
export const useDeleteAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => AlbumsService.deleteAlbum(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.refetchQueries({ queryKey: ["albums"] });
    },
  });
};
export const useGetAlbumById = (id: string) => {
  return useQuery<Album, unknown>({
    queryKey: ["albums", id],
    queryFn: () => AlbumsService.getAlbumById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};