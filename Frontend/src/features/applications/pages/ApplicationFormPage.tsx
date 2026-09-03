import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  FilePlus2,
  Globe2,
  IndianRupeeIcon,
  Link2,
  Mail,
  MapPin,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader, SurfaceCard } from "../../../components/ui/PagePrimitives";
import React, { useCallback, useEffect, useState } from "react";
import { selectedFields } from "../../../utils/HelperFunctions";
import { useCreateApplicationMutation } from "../../../hooks/application/useApplication";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";
import { getResume } from "../../../hooks/resume/useResume";
import type { ResumeProps } from "../../../types/ApiTypes";
import { queryClient } from "../../../lib/queryClient";

const fieldClass =
  "mt-2 h-11 w-full rounded-lg border border-[#E1E3EC] bg-white px-3 text-sm text-applytrack-ink outline-none transition placeholder:text-[#9A99A8] hover:border-applytrack-outlinefocus:border-applytrack-primary focus:ring-4 focus:ring-[#3525CD]/10";

function Field({
  label,
  icon: Icon,
  placeholder,
  name,
  type = "text",
  onChange,
}: {
  label: string;
  icon: typeof BriefcaseBusiness;
  placeholder: string;
  name: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label>
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#77768A]">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <input
        className={fieldClass}
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={onChange}
        max={new Date().toISOString().split("T")[0]}
      />
    </label>
  );
}

const applicationFormInp = {
  companyName: "",
  roleTitle: "",
  platForm: "",
  dateApplied: null,
  location: "",
  contact: "",
  jd_URL: "",
  jd_text: "",
  resume : "",
  salary_range: "",
  resumeVersion: "",
  notes: "",
};

export default function ApplicationFormPage() {
  const Mutation = useCreateApplicationMutation();
  const { Resumes }: any = getResume();
  const [resume, setResumes] = useState<ResumeProps[]>([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(applicationFormInp);

  useEffect(() => {
    if (Resumes?.data) setResumes(Resumes.data);
  }, [Resumes]);


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitForm = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if(formData.companyName === "" || formData.roleTitle === "" || formData.platForm === "" || formData.dateApplied === null){
      toast.error("Please fill all the required fields.");
      return;
    }

    const result = selectedFields(formData);

    Mutation.mutate(result, {
      onSuccess() {
        toast.success("Application created successfully.");
        queryClient.invalidateQueries({
          queryKey : ["applications"],
          type : "all"
        })
        queryClient.invalidateQueries({
          queryKey: ["summary"],
          type: "all",
        });
        navigate("/applications")
      },
      onError(err) {
        const { response } = err as AxiosError<{ message: string }>;
        toast.error(response?.data.message || "Unable to create application. Please try again.");
      },
    });
  } , [Mutation])

  return (
    <div className="min-h-svh">
      <PageHeader
        eyebrow="Applications"
        title="Add application"
        description="Create a clean application record with role details, source, contacts, and next-step notes."
        actions={
          <Link
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-applytrack-outline not-[]:bg-white px-3 text-sm font-semibold text-applytrack-primary transition hover:border-applytrack-primary hover:bg-[#F5F4FF]"
            to="/applications"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to pipeline
          </Link>
        }
      />

      <div className="grid gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8">
        <SurfaceCard className="p-5">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#F5F4FF] text-applytrack-primary">
              <FilePlus2 className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                Application details
              </h2>
              <p className="mt-1 text-sm text-[#646378]">
                Capture the essentials before moving it through kanban stages.
              </p>
            </div>
          </div>

          <form className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                icon={BriefcaseBusiness}
                label="Company"
                placeholder="e.g. Stripe"
                name="companyName"
                onChange={handleChange}
              />
              <Field
                icon={UserRound}
                label="Role"
                placeholder="e.g. Frontend Engineer"
                name="roleTitle"
                onChange={handleChange}
              />
              <Field
                icon={Globe2}
                label="Platform"
                placeholder="LinkedIn, Referral, Company Site"
                name="platForm"
                onChange={handleChange}
              />
              <Field
                icon={CalendarDays}
                label="Applied date"
                placeholder="Select date"
                type="date"
                name="dateApplied"
                onChange={handleChange}
              />
              <Field
                icon={MapPin}
                label="Location"
                placeholder="Remote, Hybrid, City"
                name="location"
                onChange={handleChange}
              />
              <Field
                icon={Mail}
                label="Recruiter contact"
                placeholder="Name or email"
                name="contact"
                onChange={handleChange}
              />

              <Field
                icon={IndianRupeeIcon}
                label="Salary Range"
                placeholder="300k - 400k"
                name="salary_range"
                onChange={handleChange}
              />
              <label>
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#77768A]">
                  <FilePlus2 className="h-4 w-4" />
                  Resume Version
                </span>
                <select
                  className={fieldClass}
                  name="resume"
                  onChange={handleChange}
                >
                  <option value="">Select resume version</option>
                  {resume &&
                    resume.map(
                      (resumeVersion: {
                        versionName: string;
                        _id: string;
                        fileName: string;
                      }) => (
                        <option
                          value={resumeVersion._id}
                          key={resumeVersion._id}
                          onChange={() => setFormData({ ...formData, resume: resumeVersion._id })}
                        >
                          {resumeVersion.fileName}
                        </option>
                      ),
                    )}
                </select>
              </label>
            </div>

            <label>
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#77768A] mt-4">
                <Link2 className="h-4 w-4" />
                Job URL
              </span>
              <input
                className={fieldClass}
                placeholder="https://company.com/jobs/role"
                name="jd_URL"
                onChange={handleChange}
              />
            </label>

            <label>
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#77768A]">
                <Sparkles className="h-4 w-4" />
                Job description
              </span>
              <textarea
                className="mt-2 min-h-32 w-full resize-y rounded-lg border border-[#E1E3EC] bg-white px-3 py-3 text-sm text-applytrack-ink outline-none transition placeholder:text-[#9A99A8] hover:border-applytrack-outlinefocus:border-applytrack-primary focus:ring-4 focus:ring-applytrack-primary/10"
                placeholder="Paste role notes, next steps, interview prep, or resume tailoring reminders."
                name="jd_text"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, jd_text: e.target.value })
                }
              />

              <span className="flex mt-3 items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#77768A]">
                <Sparkles className="h-4 w-4" />
                Notes
              </span>
              <textarea
                className="mt-2 min-h-32 w-full resize-y rounded-lg border border-[#E1E3EC] bg-white px-3 py-3 text-sm text-applytrack-ink outline-none transition placeholder:text-[#9A99A8] hover:border-applytrack-outlinefocus:border-applytrack-primary focus:ring-4 focus:ring-applytrack-primary/10"
                placeholder="Paste role notes, next steps, interview prep, or resume tailoring reminders."
                name="notes"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
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
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-applytrack-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#281BA8]"
                onClick={handleSubmitForm}
              >
                {Mutation.isPending ? (
                  <LoadingSpinner size="sm" label="Creating" />
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Save application
                  </>
                )}
              </button>
            </div>
          </form>
        </SurfaceCard>

        <aside className="space-y-5">
          <SurfaceCard className="p-5">
            <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
              Preview
            </h2>
            <div className="mt-4 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-sm font-bold text-applytrack-primary shadow-sm">
                  AT
                </span>
                <div>
                  <p className="text-sm font-semibold text-applytrack-ink">
                    New company
                  </p>
                  <p className="mt-1 text-sm text-[#646378]">New role</p>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-[#E1E3EC]">
                <span className="block h-full w-2/3 rounded-full bg-applytrack-primary" />
              </div>
              <p className="mt-3 text-xs font-semibold text-[#77768A]">
                Starts in Applied after saving
              </p>
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-5">
            <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
              Suggested next steps
            </h2>
            <div className="mt-4 space-y-3">
              {[
                "Attach tailored resume",
                "Add follow-up reminder",
                "Run match check",
              ].map((item) => (
                <div
                  className="flex items-center gap-3 rounded-lg border border-[#E1E3EC] bg-white p-3"
                  key={item}
                >
                  <CheckCircle2 className="h-4 w-4 text-[#047857]" />
                  <p className="text-sm font-medium text-[#343447]">{item}</p>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </aside>
      </div>
    </div>
  );
}
