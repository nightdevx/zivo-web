import {
  useQuery,
  useMutation,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";

import ServiceService from "../services/service.service";
import { Service, ServiceInsert, ServiceUpdate } from "../models/service.model";

// Hook to fetch all services
export const GetAllServicesQueryOptions = queryOptions({
  queryKey: ["services"],
  queryFn: ServiceService.getAll,
  staleTime: 1000 * 60 * 5, // 5 minutes
});
export const useGetAllServices = () => {
  return useQuery<Service[], unknown>({
    queryKey: ["services"],
    queryFn: ServiceService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
// Hook to fetch a service by ID
export const GetServiceByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["service", id],
    queryFn: () => ServiceService.getById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (service: ServiceInsert) => ServiceService.create(service),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.refetchQueries({ queryKey: ["services"] });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, service }: { id: string; service: ServiceUpdate }) =>
      ServiceService.update(id, service),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["service"] });
      queryClient.refetchQueries({ queryKey: ["services"] });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ServiceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};
