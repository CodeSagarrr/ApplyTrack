import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe2,
  IndianRupeeIcon,
  Link2,
  Mail,
  MapPin,
  PanelRightOpen,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { PageHeader, SurfaceCard } from "../../../components/ui/PagePrimitives";
import { getResume } from "../../../hooks/resume/useResume";
import type {
  Application,
  ApplicationEditFieldProps,
  ApplicationEditFormValues,
  ResumeProps,
} from "../../../types/ApiTypes";
import { useUpdateApplicationMutation } from "../../../hooks/application/useApplication";
import toast from "react-hot-toast";
import { queryClient } from "../../../lib/queryClient";
import type { AxiosError } from "axios";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";

const fieldClass =
  "mt-2 h-11 w-full rounded-lg border border-[#E1E3EC] bg-white px-3 text-sm text-applytrack-ink outline-none transition placeholder:text-[#9A99A8] hover:border-applytrack-outline focus:border-applytrack-primary focus:ring-4 focus:ring-[#3525CD]/10";

const textAreaClass =
  "mt-2 min-h-32 w-full resize-y rounded-lg border border-[#E1E3EC] bg-white px-3 py-3 text-sm text-applytrack-ink outline-none transition placeholder:text-[#9A99A8] hover:border-applytrack-outline focus:border-applytrack-primary focus:ring-4 focus:ring-applytrack-primary/10";

const emptyFormValues: ApplicationEditFormValues = {
  companyName: "",
  roleTitle: "",
  salary_range: "",
  contact: "",
  platForm: "",
  dateApplied: "",
  location: "",
  jd_text: "",
  resume: "",
  jd_URL: "",
  notes: "",
  status: "Applied",
};

const editFields: ApplicationEditFieldProps[] = [
  {
    icon: BriefcaseBusiness,
    label: "Company Name",
    name: "companyName",
    placeholder: "e.g. Stripe",
  },
  {
    icon: UserRound,
    label: "Role",
    name: "roleTitle",
    placeholder: "e.g. Frontend Engineer",
  },
  {
    icon: IndianRupeeIcon,
    label: "Salary Range",
    name: "salary_range",
    placeholder: "300k - 400k",
  },
  {
    icon: Mail,
    label: "Contact",
    name: "contact",
    placeholder: "Recruiter name or email",
  },
  {
    icon: Globe2,
    label: "Platform",
    name: "platForm",
    placeholder: "LinkedIn, Referral, Company Site",
  },
  {
    icon: CalendarDays,
    label: "Date Applied",
    name: "dateApplied",
    placeholder: "Select date",
    type: "date",
  },
  {
    icon: MapPin,
    label: "Location",
    name: "location",
    placeholder: "Remote, Hybrid, City",
  },
  {
    icon: Link2,
    label: "Job URL",
    name: "jd_URL",
    placeholder: "https://company.com/jobs/role",
  },
];

function normalizeApplication(
  application?: Application,
): ApplicationEditFormValues {
  if (!application) return emptyFormValues;
  return {
    companyName: application.companyName ?? "",
    roleTitle: application.roleTitle ?? "",
    salary_range: application.salary_range ?? "",
    contact: application.contact ?? "",
    platForm: application.platForm ?? "",
    dateApplied: application.dateApplied
      ? new Date(application.dateApplied).toISOString().split("T")[0]
      : "",
    location: application.location ?? "",
    jd_text: application.jd_text ?? "",
    resume: application.resume?._id ?? application.resume?.id ?? "",
    jd_URL: application.jd_URL ?? "",
    notes: application.notes ?? "",
    status: application.status ?? "",
  };
}

function EditField({
  field,
  value,
  onChange,
}: {
  field: ApplicationEditFieldProps;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const Icon = field.icon;

  return (
    <label>
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#77768A]">
        <Icon className="h-4 w-4" />
        {field.label}
      </span>
      <input
        className={fieldClass}
        max={
          field.type === "date"
            ? new Date().toISOString().split("T")[0]
            : undefined
        }
        name={field.name}
        onChange={onChange}
        placeholder={field.placeholder}
        type={field.type ?? "text"}
        value={value}
      />
    </label>
  );
}

export default function ApplicationEditPage() {
  const { id } = useParams();
  const updateMutaion = useUpdateApplicationMutation(id as string);
  const location = useLocation();
  const selectedApplication = (
    location.state as { application?: Application } | null
  )?.application;
  const [formData, setFormData] = useState<ApplicationEditFormValues>(() =>
    normalizeApplication(selectedApplication),
  );
  const [isResumeDrawerOpen, setIsResumeDrawerOpen] = useState(false);
  const { Resumes }: any = getResume();
  const resumes = (Resumes?.data ?? []) as ResumeProps[];

  const selectedResume = useMemo(
    () => resumes.find((resume) => resume._id === formData.resume),
    [formData.resume, resumes],
  );

  function handleInputChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  console.log(formData)
  function handleFormEdit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const payLoad: Partial<Record<string, unknown>> = { id: id };

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        payLoad[key as keyof ApplicationEditFormValues] = value;
      }
    });

    updateMutaion.mutate(payLoad, {
      onSuccess() {
        toast.success("Application updated successfully.");
        queryClient.invalidateQueries({
          queryKey: ["applications"],
          type: "all",
        });
        queryClient.invalidateQueries({
          queryKey: ["summary"],
          type: "all",
        });
        window.location.href = "/applications";
      },
      onError(err) {
        const error = err as AxiosError<{ message: string }>;
        toast.error(error.response?.data.message || "Unable to update application. Please try again.");
      },
    });
  }

  return (
    <div className="min-h-svh">
      <PageHeader
        eyebrow="Applications"
        title="Edit application"
        description="Review and adjust application details without opening a modal."
        actions={
          <Link
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-applytrack-outline bg-white px-3 text-sm font-semibold text-applytrack-primary transition hover:border-applytrack-primary hover:bg-[#F5F4FF]"
            to="/applications"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to pipeline
          </Link>
        }
      />

      <div className="grid gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
        <SurfaceCard className="p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#F5F4FF] text-applytrack-primary">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                  Application details
                </h2>
                <p className="mt-1 text-sm text-[#646378]">
                  Editing record {id ? `#${id.slice(-6)}` : "details"}.
                </p>
              </div>
            </div>
          </div>

          <form className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              {editFields.map((field) => (
                <EditField
                  field={field}
                  key={field.name}
                  onChange={handleInputChange}
                  value={formData[field.name]}
                />
              ))}

              <label>
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#77768A]">
                  <FileText className="h-4 w-4" />
                  Existing Resume
                </span>
                <select
                  className={fieldClass}
                  name="resume"
                  onChange={handleInputChange}
                  value={formData.resume}
                >
                  <option value="">Select existing resume</option>
                  {resumes.map((resume) => (
                    <option key={resume._id} value={resume._id}>
                      {resume.fileName}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#77768A]">
                  <FileText className="h-4 w-4" />
                  Status
                </span>
                <select
                  className={fieldClass}
                  name="status"
                  onChange={handleInputChange}
                >
                  <option value="">Select status for resume</option>
                  {[
                    "Applied",
                    "Interview",
                    "Offer",
                    "Screening",
                    "Rejected",
                  ].map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#77768A]">
                <Sparkles className="h-4 w-4" />
                Job Description
              </span>
              <textarea
                className={textAreaClass}
                name="jd_text"
                onChange={handleInputChange}
                placeholder="Paste job description, requirements, responsibilities, and useful hiring notes."
                value={formData.jd_text}
              />
            </label>

            <label>
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#77768A]">
                <Sparkles className="h-4 w-4" />
                Notes
              </span>
              <textarea
                className={textAreaClass}
                name="notes"
                onChange={handleInputChange}
                placeholder="Add follow-up notes, interview prep, or anything you want to remember."
                value={formData.notes}
              />
            </label>

            <div className="flex flex-col-reverse gap-2 border-t border-[#EEF0F5] pt-5 sm:flex-row sm:justify-end">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E1E3EC] px-4 text-sm font-semibold text-[#343447] transition hover:bg-applytrack-surface"
                to="/applications"
              >
                Cancel
              </Link>
              <button
                onClick={handleFormEdit}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-applytrack-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#281BA8]"
                type="button"
              >
                <CheckCircle2 className="h-4 w-4" />
                {updateMutaion.isPending ? (
                  <LoadingSpinner size="sm" label="updating" />
                ) : (
                  <>Save changes</>
                )}
              </button>
            </div>
          </form>
        </SurfaceCard>

        <aside className="space-y-5">
          <SurfaceCard className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                  Existing resume
                </h2>
                <p className="mt-1 text-sm text-[#646378]">
                  {selectedResume?.fileName ??
                    "Choose the resume used for this role."}
                </p>
              </div>
              <button
                aria-label="Open resume drawer"
                className="grid h-10 w-10 place-items-center rounded-lg border border-[#E1E3EC] text-applytrack-primary transition hover:border-applytrack-primary hover:bg-[#F5F4FF]"
                onClick={() => setIsResumeDrawerOpen(true)}
                title="Open resume drawer"
                type="button"
              >
                <PanelRightOpen className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-4">
              <p className="text-sm font-semibold text-applytrack-ink">
                {selectedResume?.versionName ||
                  selectedApplication?.resume?.fileName ||
                  "No resume selected"}
              </p>
              <p className="mt-2 text-sm text-[#646378]">
                ATS score: {selectedApplication?.matchResult?.matchScore ?? 0}%
              </p>
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-5">
            <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
              Clean edit view
            </h2>
            <div className="mt-4 space-y-3 text-sm text-[#646378]">
              <p>
                Company, role, salary, contact, platform, applied date, and
                location stay grouped for quick scanning.
              </p>
              <p>
                Long-form job description and notes have full-width writing
                space.
              </p>
            </div>
          </SurfaceCard>
        </aside>
      </div>

      {isResumeDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-applytrack-ink/35 backdrop-blur-sm">
          <div className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl shadow-applytrack-ink/20">
            <div className="flex items-start justify-between gap-4 border-b border-[#EEF0F5] p-5">
              <div>
                <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                  Existing resumes
                </h2>
                <p className="mt-1 text-sm text-[#646378]">
                  Select a resume version for this application.
                </p>
              </div>
              <button
                aria-label="Close resume drawer"
                className="grid h-10 w-10 place-items-center rounded-lg border border-[#E1E3EC] text-[#646378] transition hover:border-applytrack-primary hover:text-applytrack-primary"
                onClick={() => setIsResumeDrawerOpen(false)}
                title="Close resume drawer"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {resumes.length > 0 ? (
                resumes.map((resume) => (
                  <button
                    className={`flex w-full items-center justify-between gap-4 rounded-lg border p-4 text-left transition ${
                      formData.resume === resume._id
                        ? "border-applytrack-primary bg-[#F5F4FF]"
                        : "border-[#E1E3EC] bg-white hover:border-applytrack-outline"
                    }`}
                    key={resume._id}
                    onClick={() => {
                      setFormData((current) => ({
                        ...current,
                        resume: resume._id,
                      }));
                      setIsResumeDrawerOpen(false);
                    }}
                    type="button"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-applytrack-ink">
                        {resume.fileName}
                      </span>
                      <span className="mt-1 block text-sm text-[#646378]">
                        {resume.versionName || "Resume version"}{" "}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#77768A]" />
                  </button>
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-[#D8DAE6] bg-[#FAFBFF] p-5 text-sm text-[#646378]">
                  No resume versions found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
