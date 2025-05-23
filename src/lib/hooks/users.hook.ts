import { useQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";
import UsersService from "../services/users.service";
import { User, UserInsert, UserUpdate } from "../models/users.model";

// Hook to fetch the current user's information
export const GetMyUserQueryOptions = queryOptions({
  queryKey: ["myUser"],
  queryFn: UsersService.getMyUser,
  staleTime: 1000 * 60 * 5, // 5 minutes
});

export const useGetMyUser = () => {
  return useQuery<User, unknown>({
    queryKey: ["myUser"],
    queryFn: UsersService.getMyUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook to create a new user
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, unknown, UserInsert>({
    mutationFn: UsersService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Hook to update a user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, unknown, { id: string; userData: UserUpdate }>({
    mutationFn: ({ id, userData }) => UsersService.updateUser(id, userData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
};

// Hook to delete a user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: UsersService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
