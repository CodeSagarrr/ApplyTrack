import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteResumeApi,
  getResumeByIdApi,
  getResumeApi,
  updateResumeDetails,
  updateResumeStatus,
  uploadResume,
} from "../../lib/api";
interface ResumeUpdateDetailsProps {
  id?: string;
  force?: boolean;
  payLoad: {
    versionName?: string;
    file?: File;
  };
}

export const uploadResumeMutation = () => {
  return useMutation({
    mutationFn: uploadResume,
  });
};

export const updateResumeStatusMutation = () => {
  return useMutation({
    mutationFn: updateResumeStatus,
  });
};

export const updateResumeDetailsMutation = () => {
  return useMutation({
    mutationFn: ({ id, payLoad }: ResumeUpdateDetailsProps) =>
      updateResumeDetails(id, payLoad),
  });
};

export const deleteResumeMutation = () => {
  return useMutation({
    mutationFn: deleteResumeApi,
  });
};

export const getResume = () => {
  const { data: Resumes } = useQuery({
    queryKey: ["resumes"],
    queryFn: getResumeApi,
    placeholderData: (previous) => previous,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { Resumes };
};

export const getResumeById = (id?: string) => {
  const { data: Resume, isLoading, isError } = useQuery({
    queryKey: ["resume", id],
    queryFn: () => getResumeByIdApi(id as string),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { Resume, isLoading, isError };
};
