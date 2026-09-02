import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  applicationAtsService,
  createApplicationApi,
  deleteApplicationApi,
  getApplicationByIdApi,
  getFiltersApplicationsApi,
  updateApplicationForm,
  type GetApplicationsParams,
  type updateApplicationsParams,
} from "../../lib/api";

export const useCreateApplicationMutation = () => {
  return useMutation({
    mutationFn: createApplicationApi,
  });
};

export const useUpdateApplicationMutation = (id: string) => {
  return useMutation({
    mutationFn: (payLoad: updateApplicationsParams) =>
      updateApplicationForm(id, payLoad),
  });
};

export const deleteApplicationMutation = () => {
  return useMutation({
    mutationFn: deleteApplicationApi,
  });
};

export const atsServiceMutation = (id : string) => {
  return useMutation({
    mutationFn: (payLoad : { jd_text : string , resumeId : string}) => applicationAtsService(id , payLoad),
  });
};

export const useGetFiltersQuery = (filters: GetApplicationsParams) => {
  return useInfiniteQuery({
    queryKey: ["applications", filters],
    queryFn: ({ pageParam }) => getFiltersApplicationsApi(filters, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.cursorId ?? undefined,
  });
};

export const useGetApplicationByIdQuery = (id?: string) => {
  return useQuery({
    queryKey: ["application", id],
    queryFn: () => getApplicationByIdApi(id as string),
    enabled: Boolean(id),
  });
};
