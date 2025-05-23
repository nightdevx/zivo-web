import ImagesService from "../services/images.service";
import {
  useQuery,
  useMutation,
  queryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { Image, ImageInsert } from "../models/images.model";

export const GetAllImagesQueryOptions = queryOptions({
  queryKey: ["images"],
  queryFn: ImagesService.getAllImages,
  staleTime: 1000 * 60 * 5, // 5 minutes
});

export const GetImagesByCompanyIdQueryOptions = queryOptions({
  queryKey: ["images", "company"],
  queryFn: ImagesService.getImagesByCompanyId,
  staleTime: 1000 * 60 * 5, // 5 minutes
});

export const useGetAllImages = () => {
  return useQuery<Image[], unknown>({
    queryKey: ["images"],
    queryFn: ImagesService.getAllImages,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGetImagesByCompanyId = () => {
  return useQuery<Image[], unknown>({
    queryKey: ["images", "company"],
    queryFn: ImagesService.getImagesByCompanyId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (image: ImageInsert) => ImagesService.createImage(image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
      queryClient.refetchQueries({ queryKey: ["images"] });
    },
  });
};

export const useCreateImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (images: ImageInsert[]) => ImagesService.createImages(images),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
      queryClient.refetchQueries({ queryKey: ["images"] });
    },
  });
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ImagesService.deleteImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
      queryClient.refetchQueries({ queryKey: ["images"] });
    },
  });
};
