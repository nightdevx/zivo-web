import employeeServicesService from "../services/employee-services.service";
import { EmployeeServices } from "../models/employee-services.model";

import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";

export const useDeleteEmployeeServices = (
  options?: UseMutationOptions<
    EmployeeServices,
    unknown,
    { employee_id: string; service_id: string }
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      employee_id,
      service_id,
    }: {
      employee_id: string;
      service_id: string;
    }) =>
      employeeServicesService.deleteEmployeeService(employee_id, service_id),
    ...options,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
