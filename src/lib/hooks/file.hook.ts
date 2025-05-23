import FileService from "../services/file.service";
import { useMutation } from "@tanstack/react-query";

export const useUploadFile = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const response = await FileService.uploadFile(file);
      return response;
    },
  });
};

export const useGetFileUrl = () => {
  return useMutation({
    mutationFn: async (filePath: string) => {
      const response = await FileService.getFileUrl(filePath);
      return response;
    },
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: async (filePath: string) => {
      const response = await FileService.deleteFile(filePath);
      return response;
    },
  });
};
