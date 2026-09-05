import axios from "axios";
import type {
  RegisterProps,
  LoginProps,
  FormProps,
  ApplicationApiProps,
} from "../types/ApiTypes";
import { BuildSearchParams } from "../utils/HelperFunctions";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // No response at all (network down, CORS, timeout) — nothing we can do
    if (!error.response) {
      return Promise.reject(error);
    }

    // The refresh call itself failed — session is truly dead
    if (originalRequest.url === "/auth/refresh") {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    // Access token expired, and we haven't already retried this request
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Start a refresh only if one isn't already running
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = api
            .post("/auth/refresh", {}, { withCredentials: true })
            .then(() => {})
            .finally(() => {
              isRefreshing = false;
              refreshPromise = null;
            });
        }

        // Every failed request waits for the SAME refresh call
        await refreshPromise;

        // Retry the original request now that the token is fresh
        return api(originalRequest);
      } catch (err) {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }

    // Any other error (403, 500, etc.) — just pass it through
    return Promise.reject(error);
  }
);
export const getUserApi = async() => {
  const { data } = await api.get("/users/me" , { withCredentials : true });

  return data
}

export const register = async (payLoad: RegisterProps) => {
  const { data } = await api.post("/auth/register", payLoad);

  return data;
};

export const login = async (payLoad: LoginProps) => {
  const { data } = await api.post("/auth/login", payLoad);

  return data;
};

export const Logout = async () => {
  const { data } = await api.post("/auth/logout" , { withCredentials : true });

  return data;
};

export const googleLogin = async (credentialId: string) => {
  const { data } = await api.post("/auth/google", { token: credentialId });

  return data;
};

// Profile

export const createProfile = async (payLoad: FormProps) => {
  const { data } = await api.patch("/users/profile", payLoad , { withCredentials : true });
  return data;
};

export const getProfileData = async () => {
  const { data } = await api.get("/users/profile" , { withCredentials : true });

  return data;
};

// Resume

export const uploadResume = async (payLoad: {
  file: File;
  versionName: string;
}) => {
  const { data } = await api.post("/v1/resumes", payLoad , { withCredentials : true });

  return data;
};

export const updateResumeDetails = async (
  id: string | undefined,
  payLoad: { versionName?: string; file?: File },
) => {
  const { data } = await api.patch(`/v1/resumes/${id}/details`, payLoad , { withCredentials : true });
  return data;
};

export const updateResumeStatus = async (id: string) => {
  const { data } = await api.patch(`/v1/resumes/${id}/status` , { withCredentials : true });
  return data;
};

export const getResumeApi = async () => {
  const { data } = await api.get("/v1/resumes" , { withCredentials : true });
  return data;
};

export const getResumeByIdApi = async (id: string) => {
  const { data } = await api.get(`/v1/resumes/${id.trim()}` , { withCredentials : true });
  return data;
};

export const deleteResumeApi = async ({
  id,
  force = false,
}: {
  id: string;
  force: boolean;
}) => {
  const { data } = await api.delete(`/v1/resumes/${id}?force=${force}`, { withCredentials : true});
  return data;
};

// Applications

export interface GetApplicationsParams {
  cursor?: string;
  status?: string;
  search?: string;
  from?: string;
  to?: string;
}

export interface updateApplicationsParams {
  id?: string;
  companyName?: string;
  roleTitle?: string;
  platForm?: string;
  salary_range?: string;
  location?: string;
  dateApplied?: string;
  jd_text?: string;
  jd_URL?: string;
  notes?: string;
  resume?: string;
  contact?: string;
}

export const createApplicationApi = async (payLoad: ApplicationApiProps) => {
  const { data } = await api.post("/v1/applications", payLoad , { withCredentials : true });

  return data;
};

export const getApplicationsApi = async () => {
  const { data } = await api.get("/v1/applications/all" , { withCredentials : true });

  return data;
};

export const getApplicationByIdApi = async (id: string) => {
  const { data } = await api.get(`/v1/applications/${id.trim()}` , { withCredentials : true });

  return data;
};

export const getFiltersApplicationsApi = async (
  params: GetApplicationsParams,
  pageParams: string | null,
) => {
  const searchParams = BuildSearchParams({
    ...params,
    ...(pageParams ? { cursorId: pageParams } : {}), // omit if null → first page
  });
  const { data } = await api.get(`/v1/applications?${searchParams.toString()}` , { withCredentials : true });
  return data;
};

export const updateApplicationForm = async (
  id: string,
  payLoad: updateApplicationsParams,
) => {
  const { data } = await api.patch(`/v1/applications/${id.trim()}`, payLoad , { withCredentials : true });
  return data;
};

export const deleteApplicationApi = async (id: string) => {
  const { data } = await api.delete(`/v1/applications/${id.trim()}` , { withCredentials : true });
  return data;
};

export const applicationAtsService = async (id: string , payLoad: { jd_text: string; resumeId: string }) => {
  const { data } = await api.post(`/v1/applications/${id}/application-ats` , payLoad ,{ withCredentials : true });

  return data;
};


// Match page

export const createMatchJob = async (payLoad: {
  resumeId: string;
  jd_text: string;
}) => {
  const { data } = await api.post(`/v1/match`, payLoad , { withCredentials : true });

  return data;
};

export const getMatchJobId = async(id : string) => {
  const { data } = await api.get(`/v1/match/${id.trim()}` , { withCredentials : true });

  return data;
}

// Dasboard

export const getDasboardSummary = async() => {
  const { data } = await api.get("/dashboard/summary" , { withCredentials : true })

  return data;
}