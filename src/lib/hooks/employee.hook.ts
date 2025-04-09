import {
  useQuery,
  useMutation,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";

import EmployeeService from "../services/employee.service";
import {
  Employee,
  EmployeeCreate,
  EmployeeUpdate,
} from "../models/employee.model";
import { Operation } from "fast-json-patch";

// Hook to fetch all employees
export const GetAllEmployeesQueryOptions = queryOptions({
  queryKey: ["employees"],
  queryFn: EmployeeService.getAll,
  staleTime: 1000 * 60 * 5, // 5 minutes
});

export const useGetEmployeeById = (id: number) => {
  return useQuery<Employee, unknown>({
    queryKey: ["employee", id],
    queryFn: () => EmployeeService.getById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (employee: EmployeeCreate) => EmployeeService.create(employee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updatedEmployee,
    }: {
      id: number;
      updatedEmployee: EmployeeUpdate;
      }) => EmployeeService.update(id, updatedEmployee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => EmployeeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
