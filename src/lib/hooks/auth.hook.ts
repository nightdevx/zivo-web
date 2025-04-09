import { UserInsert } from "../models/users.model";
import authService from "../services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: UserInsert) => authService.register(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    },
  });
};
