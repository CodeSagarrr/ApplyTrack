import {
  AlertCircle,
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  FileText,
  Gauge,
  Loader2,
  MapPin,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import type { AxiosError } from "axios";
import {
  PageHeader,
  SkeletonBlock,
  StatusBadge,
  SurfaceCard,
} from "../../../components/ui/PagePrimitives";
import {
  atsServiceMutation,
  useGetApplicationByIdQuery,
  useUpdateApplicationMutation,
} from "../../../hooks/application/useApplication";
import { getResume } from "../../../hooks/resume/useResume";
import { queryClient } from "../../../lib/queryClient";
import type { Application, ResumeProps } from "../../../types/ApiTypes";
import { statusTone } from "./ApplicationsPage";
import { SuggestionCard } from "../../match/components/SuggestionCard";
import type { ISuggestions } from "../../match/pages/MatchToolPage";

type ApplicationDetail = Partial<Application> & {
  id?: string;
};

type AtsIssue = {
  severity: "LOW" | "MEDIUM" | "HIGH";
  category: string;
  message: string;
};

type AtsResult = {
  matchScore: number;
  matched_keywords: string[];
  missing_keywords: string[];
  suggestions: ISuggestions[];
  atsIssues: AtsIssue[];
};

const fieldClass =
  "mt-2 h-11 w-full rounded-lg border border-[#E1E3EC] bg-white px-3 text-sm text-applytrack-ink outline-none transition placeholder:text-[#9A99A8] hover:border-applytrack-outline focus:border-applytrack-primary focus:ring-4 focus:ring-applytrack-primary/10";

const textAreaClass =
  "mt-2 min-h-36 w-full resize-y rounded-lg border border-[#E1E3EC] bg-white px-3 py-3 text-sm text-applytrack-ink outline-none transition placeholder:text-[#9A99A8] hover:border-applytrack-outline focus:border-applytrack-primary focus:ring-4 focus:ring-applytrack-primary/10";

function detailValue(value?: string | null) {
  return value && value.trim().length > 0 ? value : "Not added";
}

function normalizeScore(score?: number) {
  if (typeof score !== "number" || Number.isNaN(score)) return 0;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getResumeId(application?: ApplicationDetail) {
  return application?.resume?._id ?? application?.resume?.id ?? "";
}

function scoreTone(score: number) {
  if (score >= 80) return "text-[#047857]";
  if (score >= 60) return "text-[#B45309]";
  return "text-[#B42318]";
}

function MiniDetail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 gap-3 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-applytrack-primary shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase text-[#77768A]">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-applytrack-ink">
          {value}
        </p>
      </div>
    </div>
  );
}

function KeywordList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "green" | "amber";
}) {
  const toneClass =
    tone === "green"
      ? "border-[#BDEFD8] bg-[#ECFDF5] text-[#047857]"
      : "border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]";

  return (
    <SurfaceCard className="p-5">
      <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
        {title}
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <span
              className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${toneClass}`}
              key={item}
            >
              {item}
            </span>
          ))
        ) : (
          <p className="text-sm text-[#646378]">No keywords returned yet.</p>
        )}
      </div>
    </SurfaceCard>
  );
}

function AtsLoadingState() {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <SurfaceCard className="p-5">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#F5F4FF] text-applytrack-primary">
            <Loader2 className="h-5 w-5 animate-spin" />
          </span>
          <div>
            <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
              Analyzing match quality
            </h2>
            <p className="mt-1 text-sm text-[#646378]">
              Comparing resume language with the saved job description.
            </p>
          </div>
        </div>
        <SkeletonBlock rows={5} />
      </SurfaceCard>
      <SurfaceCard className="p-5">
        <div className="h-40 animate-pulse rounded-lg bg-[#EEF0F5]" />
        <div className="mt-4 h-3 w-3/4 animate-pulse rounded bg-[#EEF0F5]" />
        <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-[#F4F5F8]" />
      </SurfaceCard>
    </div>
  );
}

export default function ApplicationAtsServicePage() {
  const { id } = useParams();
  const { data, isLoading } = useGetApplicationByIdQuery(id);
  const updateMutation = useUpdateApplicationMutation(id as string);
  const atsMutation = atsServiceMutation(id as string);
  const { Resumes }: any = getResume();
  const resumes = (Resumes?.data ?? []) as ResumeProps[];
  const application = data?.data as ApplicationDetail | undefined;
  const applicationId = application?._id ?? application?.id ?? id ?? "";
  const jdRef = useRef<HTMLTextAreaElement | null>(null);
  const [jdText, setJdText] = useState("");
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [jdMessage, setJdMessage] = useState("");
  const [result, setResult] = useState<AtsResult | null>(null);

  useEffect(() => {
    setJdText(application?.jd_text ?? "");
    setSelectedResumeId(getResumeId(application));
  }, [application]);

  useEffect(() => {
    if (application && !application.jd_text) {
      setJdMessage("jd_text is required");
      window.setTimeout(() => jdRef.current?.focus(), 50);
    }
  }, [application]);

  const selectedResume = useMemo(
    () => resumes.find((resume) => resume._id === selectedResumeId),
    [resumes, selectedResumeId],
  );

  const existingScore = normalizeScore(application?.matchResult?.matchScore);
  const visibleScore = normalizeScore(result?.matchScore ?? existingScore);
  const isBusy = updateMutation.isPending || atsMutation.isPending;
  const matchScore = application?.matchResult?.matchScore ?? 0;

  function handleRunAts() {
    const nextJdText = jdText.trim();

    if (!nextJdText) {
      setJdMessage("jd_text is required");
      jdRef.current?.focus();
      return;
    }

    if (!selectedResumeId) {
      toast.error("Please select a resume version to run ATS analysis.");
      return;
    }

    const payLoad = {
      jd_text: jdText,
      resumeId: selectedResumeId,
    };

    setJdMessage("");
    atsMutation.mutate(payLoad, {
      onSuccess(response) {
        setResult(response?.data ?? null);
        toast.success("ATS analysis complete. Review the results above.");
        queryClient.invalidateQueries({
          queryKey: ["applications"],
          type: "all",
        });
        queryClient.invalidateQueries({
          queryKey: ["application", applicationId],
        });
      },
      onError(err) {
        const error = err as AxiosError<{ message: string }>;
        toast.error(
          error.response?.data.message ||
            "Unable to run ATS analysis. Please try again.",
        );
      },
    });
  }

  if (isLoading && !application) {
    return (
      <div className="grid min-h-svh place-items-center px-4">
        <div className="text-center">
          <Loader2 className="mx-auto h-9 w-9 animate-spin text-applytrack-primary" />
          <p className="mt-4 text-sm font-semibold text-applytrack-ink">
            Loading ATS workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh">
      <PageHeader
        eyebrow="ATS service"
        title="Resume match analysis"
        description="Run a focused ATS check using the saved role details, job description, and one selected resume version."
        actions={
          <>
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-applytrack-outline bg-white px-3 text-sm font-semibold text-applytrack-primary transition hover:border-applytrack-primary hover:bg-[#F5F4FF]"
              to="/applications"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-applytrack-primary px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#281BA8] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isBusy}
              onClick={handleRunAts}
              type="button"
            >
              {isBusy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <WandSparkles className="h-4 w-4" />
              )}
              Run ATS check
            </button>
          </>
        }
      />

      <div className="space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MiniDetail
            icon={Building2}
            label="Company"
            value={detailValue(application?.companyName)}
          />
          <MiniDetail
            icon={BriefcaseBusiness}
            label="Role"
            value={detailValue(application?.roleTitle)}
          />
          <MiniDetail
            icon={MapPin}
            label="Location"
            value={detailValue(application?.location)}
          />
          <div className="flex items-center justify-between gap-3 rounded-lg border border-[#E1E3EC] bg-white p-3">
            <div>
              <p className="text-xs font-semibold uppercase text-[#77768A]">
                Status
              </p>
              <div className="mt-2">
                {application?.status ? (
                  <StatusBadge tone={statusTone[application.status]}>
                    {application.status}
                  </StatusBadge>
                ) : (
                  <StatusBadge>Not added</StatusBadge>
                )}
              </div>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#EEF7FF] text-applytrack-secondary">
              <Target className="h-5 w-5" />
            </span>
          </div>
        </div>

        {isBusy ? (
          <AtsLoadingState />
        ) : (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <main className="space-y-5">
              <SurfaceCard className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                      Required inputs
                    </h2>
                    <p className="mt-1 text-sm text-[#646378]">
                      Keep this lightweight: job description plus the resume you
                      want scored.
                    </p>
                  </div>
                  {!jdMessage && selectedResumeId ? (
                    <CheckCircle2 className="h-5 w-5 text-[#047857]" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-[#B45309]" />
                  )}
                </div>

                <div className="mt-5 grid gap-5">
                  <label>
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase text-[#77768A]">
                      <Sparkles className="h-4 w-4" />
                      Job description
                    </span>
                    <textarea
                      className={`${textAreaClass} ${
                        jdMessage
                          ? "border-[#F59E0B] focus:border-[#B45309] focus:ring-[#F59E0B]/15"
                          : ""
                      }`}
                      name="jd_text"
                      onChange={(event) => {
                        setJdText(event.target.value);
                        if (event.target.value.trim()) setJdMessage("");
                      }}
                      placeholder="Paste the job description, responsibilities, and required skills."
                      ref={jdRef}
                      value={jdText}
                    />
                    {jdMessage ? (
                      <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#B45309]">
                        <AlertCircle className="h-4 w-4" />
                        {jdMessage}
                      </p>
                    ) : null}
                  </label>

                  <label>
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase text-[#77768A]">
                      <FileText className="h-4 w-4" />
                      Existing resume
                    </span>
                    <select
                      className={fieldClass}
                      name="resume"
                      onChange={(event) =>
                        setSelectedResumeId(event.target.value)
                      }
                      value={selectedResumeId}
                    >
                      <option value="">Select existing resume</option>
                      {resumes.map((resume) => (
                        <option key={resume._id} value={resume._id}>
                          {resume.versionName || resume.fileName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </SurfaceCard>

              {result ? (
                <>
                  <div className="grid gap-5 md:grid-cols-2">
                    <KeywordList
                      items={result.matched_keywords ?? []}
                      title="Matched keywords"
                      tone="green"
                    />
                    <KeywordList
                      items={result.missing_keywords ?? []}
                      title="Missing keywords"
                      tone="amber"
                    />
                  </div>

                  <SurfaceCard className="p-5">
                    <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                      Suggestions
                    </h2>
                    <div className="mt-4 grid gap-3">
                      {(result.suggestions ?? []).map((suggestion, index) => (
                        <div
                          className="flex gap-3 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3"
                          key={`${suggestion}-${index}`}
                        >
                          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white text-xs font-semibold text-applytrack-primary shadow-sm">
                            {index + 1}
                          </span>
                          <p className="text-sm leading-6 text-[#343447]">
                            <SuggestionCard suggestion={suggestion} />
                          </p>
                        </div>
                      ))}
                    </div>
                  </SurfaceCard>
                </>
              ) : (
                <SurfaceCard className="p-5">
                  <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                    What this check reviews
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      "Keyword coverage",
                      "Experience alignment",
                      "Formatting risks",
                    ].map((item) => (
                      <div
                        className="rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-4"
                        key={item}
                      >
                        <CheckCircle2 className="h-5 w-5 text-[#047857]" />
                        <p className="mt-3 text-sm font-semibold text-applytrack-ink">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </SurfaceCard>
              )}
            </main>

            <aside className="space-y-5">
              <SurfaceCard className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#646378]">
                      ATS score
                    </p>
                    <p
                      className={`mt-2 font-heading text-5xl font-semibold ${scoreTone(
                        visibleScore,
                      )}`}
                    >
                      {visibleScore}
                    </p>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#ECFDF5] text-[#047857]">
                    <Gauge className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#EEF0F5]">
                  <span
                    className="block h-full rounded-full bg-applytrack-primary transition-all"
                    style={{ width: `${visibleScore}%` }}
                  />
                </div>
                <p className="mt-4 text-sm leading-6 text-[#646378]">
                  {result
                    ? "Fresh analysis completed for the selected resume and job description."
                    : "Run the service to replace the saved score with a fresh role-specific match."}
                </p>
              </SurfaceCard>

              <SurfaceCard className="p-5">
                <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                  Selected resume
                </h2>
                <div className="mt-4 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-4">
                  <p className="truncate text-sm font-semibold text-applytrack-ink">
                    {selectedResume?.fileName ||
                      application?.resume?.fileName ||
                      "No resume selected"}
                  </p>
                  <p className="mt-2 text-sm text-[#646378]">
                    Saved ATS: {matchScore}%
                  </p>
                </div>
              </SurfaceCard>

              {result?.atsIssues?.length ? (
                <SurfaceCard className="p-5">
                  <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                    Important issues
                  </h2>
                  <div className="mt-4 space-y-3">
                    {result.atsIssues.map((issue, index) => (
                      <div
                        className="rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3"
                        key={`${issue.category}-${index}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs font-semibold uppercase text-[#77768A]">
                            {issue.category}
                          </p>
                          <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-[#646378] shadow-sm">
                            {issue.severity}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-[#343447]">
                          {issue.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </SurfaceCard>
              ) : null}
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
