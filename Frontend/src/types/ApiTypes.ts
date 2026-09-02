import type { ComponentType, ReactNode } from "react";

export interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

interface LocationLinks {
  city?: string;
  state?: string;
  country?: string;
}

interface Links {
  github?: string;
  linkedin?: string;
  portfolio?: string;
  twitter?: string;
  leetcode?: string;
}

export interface FormProps {
  user?: string;
  headline?: string;
  collegeName?: string;
  about?: string;
  profileImage?: string;
  phone?: string;
  location?: LocationLinks;
  socialLinks?: Links;
  skills?: string[];
  preferredRole?: string;
  yearsOfExperience?: number;
}

// Profile Section Props
export interface InputOption {
  headline: string;
  collegeName: string;
  phone: string;
  preferredRole: string;
  about: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    portfolio: string;
    twitter: string;
    leetcode: string;
  };
  skills: string[];
  yearsOfExperience: number;
}



// Profile Section Props
export type ProfileFieldProps = {
  icon?: ComponentType<{ className?: string }>;
  value: number | string;
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ProfileTextareaProps = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export type ProfileSectionProps = {
  children: ReactNode;
  title: string;
  description: string;
};

// Resume Section Props
export type ResumeVersion = {
  id: number;
  name: string;
  score: number;
  updatedAt: string;
  size: string;
  isDefault?: boolean;
};

export interface ResumeProps {
  _id: string;
  user: string;
  fileName: string;
  versionName: string;
  file_URL: string;
  parsedText?: string;
  parsingStatus: string;
  ats_score: number;
  isDefault: boolean;
  updatedAt: string;
  createdAt: Date;
}

// applications

export interface ApplicationApiProps {
  companyName?: string;
  roleTitle?: string;
  salary_range?: string;
  platForm?: string;
  dateApplied?: Date;
  location?: string;
  contact?: string;
  jd_URL?: string;
  jd_text?: string;
  resume: string | null;
  notes?: string;
}

// Editable application payload shared by the edit page and update API.
export type ApplicationEditFormValues = {
  companyName: string;
  roleTitle: string;
  salary_range: string;
  contact: string;
  platForm: string;
  dateApplied: string;
  location: string;
  jd_text: string;
  resume: string;
  jd_URL: string;
  notes: string;
  status:"Applied" | "Interview" | "Offer" | "Screening" | "Rejected";
};

// Small field contract used to keep application edit inputs consistent.
export type ApplicationEditFieldProps = {
  label: string;
  name: keyof ApplicationEditFormValues;
  placeholder: string;
  type?: string;
  icon: ComponentType<{ className?: string }>;
};

export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Screening"
  | "Rejected";

export type Application = {
  _id: string;
  companyName: string;
  roleTitle: string;
  status: ApplicationStatus;
  platForm: string;
  dateApplied: string;
  salary_range: string;
  contact: string;
  location?: string;
  jd_text?: string;
  jd_URL?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  resume: {
    _id?: string;
    id?: string;
    fileName: string;
    ats_score: number;
  } | null;
  matchResult ?: {
    _id : string,
    matchScore : number
  };
};

export type initialParamsFiltersTypes = {
  search: string;
  status: string;
  dateRange: string;
};


// dashboard
export interface IPipeline {
  _id : "Interview" | "Applied" | "Screening" | "Rejected" | "Offer";
  count : number
}

export interface RecentApplicationsProps {
    _id : string;
    companyName : string;
    createdAt :string;
    matchScore : number;
    roleTitle : string;
    status : ApplicationStatus
}

export interface DashboardDataProps {
  activeApplications : number;
  analyzedApplications : number;
  applicationsThisMonth : number;
  averageMatchScore : number;
  interviewApplications : number;
  pipeline : IPipeline[];
 recentApplications : RecentApplicationsProps[];
 totalApplications : number;
}