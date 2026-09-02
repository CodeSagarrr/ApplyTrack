import {
  AlertCircle,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Link2,
  Loader2,
  Play,
  RotateCcw,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  EmptyState,
  PageHeader,
  SurfaceCard,
} from "../../../components/ui/PagePrimitives";
import { KeywordList } from "../components/KeywordList";
import { AtsIssuesPanel, type AtsIssue } from "../components/AtsIssuesPanel";
import { MatchLoadingState } from "../components/MatchLoadingState";
import { MatchScoreGauge } from "../components/MatchScoreGauge";
import { SuggestionCard } from "../components/SuggestionCard";
import {
  useMatchCreateMutation,
  usePollingToMatchJobId,
} from "../../../hooks/match/useMatch";
import { getResume } from "../../../hooks/resume/useResume";
import type { ResumeProps } from "../../../types/ApiTypes";
import { formatDate } from "../../../utils/HelperFunctions";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { queryClient } from "../../../lib/queryClient";

export interface ISuggestions {
  _id: string;
  title: string;
  current: string;
  impact: string;
  suggested: string;
}
type InputMode = "text" | "url";

const sampleJd =
  "We are hiring a Senior Frontend Engineer to build scalable React and TypeScript workflows for a B2B SaaS platform. The role requires design system experience, accessibility knowledge, performance optimization, API collaboration, analytics instrumentation, and strong communication with product and design partners.";

const textAreaClass =
  "mt-2 min-h-48 w-full resize-y rounded-lg border border-[#E1E3EC] bg-white px-3 py-3 text-sm leading-6 text-applytrack-ink outline-none transition placeholder:text-[#9A99A8] hover:border-applytrack-outline focus:border-applytrack-primary focus:ring-4 focus:ring-applytrack-primary/10";

const fieldClass =
  "mt-2 h-11 w-full rounded-lg border border-[#E1E3EC] bg-white px-3 text-sm text-applytrack-ink outline-none transition placeholder:text-[#9A99A8] hover:border-applytrack-outline focus:border-applytrack-primary focus:ring-4 focus:ring-applytrack-primary/10";

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function getJdValidation(mode: InputMode, jdText: string, jdUrl: string) {
  if (mode === "text") {
    if (!jdText.trim()) return "JD text is required.";
    if (jdText.trim().length < 50)
      return "JD text must be at least 50 characters.";
    return "";
  }

  if (!jdUrl.trim()) return "Paste a JD URL or switch to text.";
  if (!isValidUrl(jdUrl.trim())) return "Enter a valid URL.";
  return "";
}

export default function MatchToolPage() {
  const Mutation = useMatchCreateMutation();
  const { Resumes } = getResume();
  const [mode, setMode] = useState<InputMode>("text");
  const [jdText, setJdText] = useState("");
  const [jdUrl, setJdUrl] = useState("");
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [jdError, setJdError] = useState("");
  const [resumeError, setResumeError] = useState("");
  const [systemError, setSystemError] = useState("");
  const resumes = (Resumes?.data ?? []) as ResumeProps[];
  const [jobId, setJobId] = useState<string | undefined>();
  const { data: getJobData } = usePollingToMatchJobId(jobId);
  const [isMatchRunning, setIsMatchRunning] = useState(false);

  const matchState = getJobData?.data.status ?? "empty";

  let suggestions = getJobData?.data.result.suggestions ?? [];

  let matchedKeywords = getJobData?.data.result.matched_keywords ?? [];

  let missingKeywords = getJobData?.data.result.missing_keywords ?? [];

  let matchScore = getJobData?.data.result.matchScore ?? 0;

  let atsIssues = (getJobData?.data.result.atsIssues ?? []) as AtsIssue[];


  const selectedResume = useMemo(
    () => resumes.find((resume) => resume._id === selectedResumeId),
    [selectedResumeId],
  );

  useEffect(() => {
  if (matchState === "COMPLETED" || matchState === "FAILED") {
    setIsMatchRunning(false);
  }
}, [matchState]);

  useEffect(() => {
    if (matchState === "FAILED") {
      toast.error("Match analysis failed. Please try again.");
      return;
    }

    if (matchState !== "QUEUED" && matchState !== "PROCESSING") {
      return;
    }

    const stepTimer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % 3);
    }, 900);

    return () => {
      window.clearInterval(stepTimer);
    };
  }, [matchState]);

  function handleUseSample() {
    setMode("text");
    setJdText(sampleJd);
    setJdUrl("");
    setJdError("");
    setSystemError("");
  }

  function handleCheckMatch() {
    const nextJdError = getJdValidation(mode, jdText, jdUrl);
    const nextResumeError = selectedResumeId ? "" : "Select a resume version.";

    setJdError(nextJdError);
    setResumeError(nextResumeError);
    setSystemError("");

    if (nextJdError || nextResumeError) return;

    if (mode === "url") {
      setSystemError(
        "Couldn't fetch JD from that URL - paste the text instead",
      );
      return;
    }

    setActiveStep(0);
    setIsMatchRunning(true);
    const payLoad = { resumeId: selectedResumeId, jd_text: jdText };

    Mutation.mutate(payLoad, {
      onSuccess(data) {
        setJobId(data?.data.jobId);
        queryClient.invalidateQueries({
          queryKey: ["applications"],
          type: "all",
        });
      },
      onError(error) {
        setActiveStep(1);
        setIsMatchRunning(false);
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message || "Unable to analyze resume. Please try again.");
      },
    });
  }

  const isBusy = Mutation.isPending || isMatchRunning || getJobData?.data.status === "QUEUED" || getJobData?.data.status === "PROCESSING";


  return (
    <div className="min-h-svh">
      <PageHeader
        eyebrow="Match tool"
        title="Score a resume against any job description"
        description="Paste a JD or start from a posting URL, choose a resume version, and review match coverage before logging the application."
        actions={
          <>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-applytrack-outline bg-white px-3 text-sm font-semibold text-applytrack-primary transition hover:border-applytrack-primary hover:bg-[#F5F4FF]"
              onClick={handleUseSample}
              type="button"
            >
              <Play className="h-4 w-4" />
              Sample JD
            </button>
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-applytrack-primary px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#281BA8]"
              to="/applications/new"
            >
              <BriefcaseBusiness className="h-4 w-4" />
              Log this Application
            </Link>
          </>
        }
      />

      <div className="space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        {systemError ? (
          <div className="flex flex-col gap-3 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#B45309]" />
              <p className="text-sm font-semibold leading-6 text-[#92400E]">
                {systemError}
              </p>
            </div>
            <button
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-white px-3 text-sm font-semibold text-[#B45309] shadow-sm transition hover:bg-[#FFF7D6]"
              onClick={
                systemError.includes("retry")
                  ? handleCheckMatch
                  : () => setMode("text")
              }
              type="button"
            >
              <RotateCcw className="h-4 w-4" />
              {systemError.includes("retry") ? "Retry" : "Paste text"}
            </button>
          </div>
        ) : null}

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <main className="space-y-5">
            <SurfaceCard className="p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                    Match inputs
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-[#646378]">
                    Provide one job description source and select the resume
                    version you want to compare.
                  </p>
                </div>
                <div className="inline-flex h-11 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-1">
                  <button
                    aria-label="Use JD text"
                    className={`grid h-9 w-10 place-items-center rounded-md transition ${mode === "text" ? "bg-white text-applytrack-primary shadow-sm" : "text-[#77768A] hover:text-applytrack-ink"}`}
                    onClick={() => setMode("text")}
                    title="JD text"
                    type="button"
                  >
                    <FileText className="h-4 w-4" />
                  </button>
                  <button
                    aria-label="Use JD URL"
                    className={`grid h-9 w-10 place-items-center rounded-md transition ${mode === "url" ? "bg-white text-applytrack-primary shadow-sm" : "text-[#77768A] hover:text-applytrack-ink"}`}
                    onClick={() => setMode("url")}
                    title="JD URL"
                    type="button"
                  >
                    <Link2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-5">
                {mode === "text" ? (
                  <label>
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase text-[#77768A]">
                      <Sparkles className="h-4 w-4" />
                      Job description text
                    </span>
                    <textarea
                      className={`${textAreaClass} ${jdError ? "border-[#F59E0B] focus:border-[#B45309] focus:ring-[#F59E0B]/15" : ""}`}
                      onChange={(event) => {
                        setJdText(event.target.value);
                        if (jdError) setJdError("");
                      }}
                      placeholder="Paste responsibilities, required skills, seniority, and nice-to-have keywords."
                      value={jdText}
                    />
                  </label>
                ) : (
                  <label>
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase text-[#77768A]">
                      <Link2 className="h-4 w-4" />
                      Job description URL
                    </span>
                    <input
                      className={`${fieldClass} ${jdError ? "border-[#F59E0B] focus:border-[#B45309] focus:ring-[#F59E0B]/15" : ""}`}
                      onChange={(event) => {
                        setJdUrl(event.target.value);
                        if (jdError) setJdError("");
                      }}
                      placeholder="https://company.com/jobs/frontend-engineer"
                      value={jdUrl}
                    />
                  </label>
                )}

                {jdError ? (
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#B45309]">
                    <AlertCircle className="h-4 w-4" />
                    {jdError}
                  </p>
                ) : null}

                <label>
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase text-[#77768A]">
                    <FileText className="h-4 w-4" />
                    Resume version
                  </span>
                  <select
                    className={`${fieldClass} ${resumeError ? "border-[#F59E0B] focus:border-[#B45309] focus:ring-[#F59E0B]/15" : ""}`}
                    onChange={(event) => {
                      setSelectedResumeId(event.target.value);
                      if (resumeError) setResumeError("");
                    }}
                    value={selectedResumeId}
                  >
                    <option value="">Select resume version</option>
                    {resumes.map((resume) => (
                      <option key={resume._id} value={resume._id}>
                        {resume.fileName}
                      </option>
                    ))}
                  </select>
                  {resumeError ? (
                    <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#B45309]">
                      <AlertCircle className="h-4 w-4" />
                      {resumeError}
                    </p>
                  ) : null}
                </label>

                <div className="flex flex-col gap-3 border-t border-[#EEF0F5] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-sm text-[#646378]">
                    <CheckCircle2 className="h-4 w-4 text-[#047857]" />
                    POST /match ready once when button get touched
                  </div>
                  <button
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-applytrack-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#281BA8] disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={isBusy}
                    onClick={handleCheckMatch}
                    type="button"
                  >
                    {isBusy ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <WandSparkles className="h-4 w-4" />
                    )}
                    Check Match
                  </button>
                </div>
              </div>
            </SurfaceCard>

            {isBusy ? (
              <MatchLoadingState activeStep={activeStep} />
            ) : null}

            {matchState === "empty" ? (
              <EmptyState
                action={
                  <button
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-applytrack-primary px-4 text-sm font-semibold text-white transition hover:bg-[#281BA8]"
                    onClick={handleUseSample}
                    type="button"
                  >
                    <Play className="h-4 w-4" />
                    Try it with a sample JD
                  </button>
                }
                description="Run your first comparison from a pasted JD, or load a sample posting to preview the match workflow."
                icon={Sparkles}
                title="No match analysis yet"
              />
            ) : null}

            {matchState === "COMPLETED" ? (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  <KeywordList
                    items={matchedKeywords}
                    title="Matched keywords"
                    tone="matched"
                  />
                  <KeywordList
                    items={missingKeywords}
                    title="Missing keywords"
                    tone="missing"
                  />
                </div>

                <AtsIssuesPanel issues={atsIssues} />

                <SurfaceCard className="p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                        Suggestions
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-[#646378]">
                        Make things better.
                      </p>
                    </div>
                    {/* <StatusBadge tone="green">
                    </StatusBadge> */}
                  </div>
                  <div className="mt-5 grid gap-4">
                    {suggestions.map((suggestion: ISuggestions) => (
                      <SuggestionCard
                        key={suggestion._id}
                        // onTextChange={handleSuggestionText}
                        suggestion={suggestion}
                      />
                    ))}
                  </div>
                </SurfaceCard>
              </>
            ) : null}
          </main>

          <aside className="space-y-5">
            <MatchScoreGauge
              score={matchState === "COMPLETED" ? matchScore : 0}
            />

            <SurfaceCard className="p-5">
              <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                Selected resume
              </h2>
              <div className="mt-4 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-4">
                <p className="truncate text-sm font-semibold text-applytrack-ink">
                  {selectedResume?.fileName ?? "No resume selected"}
                </p>
                <p className="mt-2 text-sm text-[#646378]">
                  {formatDate(selectedResume?.updatedAt) ??
                    "Choose a version to continue"}
                </p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#EEF0F5]">
                  <span
                    className="block h-full rounded-full bg-applytrack-primary"
                    style={{
                      width: `${getJobData?.data.result.ats_score ?? 0}%`,
                    }}
                  />
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-5">
              <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                Next step
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#646378]">
                When the score and suggestions look right, create an application
                record with this JD and resume version attached.
              </p>
              <Link
                className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-applytrack-primary px-3 text-sm font-semibold text-white transition hover:bg-[#281BA8]"
                to="/applications/new"
              >
                Log this Application
                <ArrowRight className="h-4 w-4" />
              </Link>
            </SurfaceCard>
          </aside>
        </div>
      </div>
    </div>
  );
}
