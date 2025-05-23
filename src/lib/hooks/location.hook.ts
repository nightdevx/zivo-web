import LocationService from "../services/location.service";
import { Location } from "../models/location.model";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const GetMyLocationQueryOptions = {
  queryKey: ["myLocation"],
  queryFn: LocationService.getMyLocation,
  staleTime: 1000 * 60 * 5, // 5 minutes
};

// Hook to fetch the current user's location information
export const useGetMyLocation = () => {
  return useQuery<Location, unknown>({
    queryKey: ["myLocation"],
    queryFn: LocationService.getMyLocation,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
// Hook to create a new location
export const useCreateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation<Location, unknown, Location>({
    mutationFn: LocationService.createLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
};
// Hook to update a location
export const useUpdateMyLocation = () => {
  const queryClient = useQueryClient();
  return useMutation<Location, unknown, { locationData: Location }>({
    mutationFn: ({ locationData }) =>
      LocationService.updateMyLocation(locationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
};
