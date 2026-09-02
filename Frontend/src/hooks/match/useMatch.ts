import { useMutation, useQuery } from "@tanstack/react-query";
import { createMatchJob, getMatchJobId } from "../../lib/api";

export const useMatchCreateMutation = () => {
  return useMutation({
    mutationFn: createMatchJob,
  });
};

export const usePollingToMatchJobId = (jobId: string | undefined) => {
  return useQuery({
    queryKey: ["JobId", jobId],
    queryFn: () => getMatchJobId(jobId as string),
    enabled: !!jobId,
    refetchInterval(query) {
      const status = query.state?.data?.data?.status;

      return status === "COMPLETED" || status === "FAILED" ? false : 9000;
    },
  });
};
