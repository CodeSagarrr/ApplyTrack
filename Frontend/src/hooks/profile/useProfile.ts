import { useMutation, useQuery } from "@tanstack/react-query";
import { createProfile, getProfileData, getUserApi } from "../../lib/api";
import { queryClient } from "../../lib/queryClient";

export const useUserProfile = () => {
  return useMutation({
    mutationFn: createProfile,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const getUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
    placeholderData: (previous) => previous,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const getProfileserverData = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileData,
    placeholderData: (previous) => previous,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { profile };
};
