import { useQuery } from "@tanstack/react-query";
import { getDasboardSummary } from "../../lib/api";

export const useGetSumary = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: getDasboardSummary,
    placeholderData: (previous) => previous,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
