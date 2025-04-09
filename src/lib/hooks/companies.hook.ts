import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CompaniesService from "../services/companies.service";
import {
  Company,
  CompanyInsert,
  CompanyUpdate,
} from "../models/companies.model";

export const GetMyCompanyQueryOptions = {
  queryKey: ["myCompany"],
  queryFn: CompaniesService.getMyCompany,
  staleTime: 1000 * 60 * 5, // 5 minutes
};

// Hook to fetch the current user's company information
export const useGetMyCompany = () => {
  return useQuery<Company, unknown>({
    queryKey: ["myCompany"],
    queryFn: CompaniesService.getMyCompany,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook to create a new company
export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation<Company, unknown, CompanyInsert>({
    mutationFn: CompaniesService.createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};

// Hook to update a company
export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Company,
    unknown,
    { id: string; companyData: CompanyUpdate }
  >({
    mutationFn: ({ id, companyData }) =>
      CompaniesService.updateCompany(id, companyData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["company", id] });
    },
  });
};
