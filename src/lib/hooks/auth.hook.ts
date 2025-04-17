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

// export const useLogin = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (user: UserInsert) => authService.login(user),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["auth"],
//       });
//     },
//   });
// }

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
