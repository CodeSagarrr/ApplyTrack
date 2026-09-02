import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  FileText,
  Link2,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import {
  EmptyState,
  PageHeader,
  StatusBadge,
  SurfaceCard,
} from "../../../components/ui/PagePrimitives";
import { getResumeById } from "../../../hooks/resume/useResume";
import type { ResumeProps } from "../../../types/ApiTypes";

function valueOrFallback(value?: string | null) {
  return value && value.trim() ? value : "Not available";
}

function statusTone(status?: string): "green" | "amber" | "neutral" {
  if (status === "COMPLETED") return "green";
  if (status === "PENDING" || status === "PROCESSING") return "amber";
  return "neutral";
}

function DetailField({
  label,
  value,
  children,
}: {
  label: string;
  value?: string | null;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-4">
      <p className="text-xs font-semibold uppercase text-[#77768A]">{label}</p>
      <div className="mt-2 min-w-0 text-sm font-semibold leading-6 text-applytrack-ink">
        {children ?? <p className="wrap-break-word">{valueOrFallback(value)}</p>}
      </div>
    </div>
  );
}

function ResumeOverview({ resume }: { resume: ResumeProps }) {
  return (
    <SurfaceCard className="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#F5F4FF] text-applytrack-primary">
            <FileText className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 className="wrap-break-word font-heading text-xl font-semibold text-applytrack-ink">
              {valueOrFallback(resume.fileName)}
            </h2>
            <p className="mt-1 text-sm leading-6 text-[#646378]">
              Resume source, parsing state, and extracted text in one place.
            </p>
          </div>
        </div>
        <StatusBadge tone={statusTone(resume.parsingStatus)}>
          {valueOrFallback(resume.parsingStatus)}
        </StatusBadge>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <DetailField label="fileName" value={resume.fileName} />
        <DetailField label="parsingStatus">
          <StatusBadge tone={statusTone(resume.parsingStatus)}>
            {valueOrFallback(resume.parsingStatus)}
          </StatusBadge>
        </DetailField>
        <DetailField label="file_URL">
          {resume.file_URL ? (
            <a
              className="inline-flex max-w-full items-center gap-2 text-applytrack-primary transition hover:text-[#281BA8]"
              href={resume.file_URL}
              rel="noreferrer"
              target="_blank"
            >
              <Link2 className="h-4 w-4 shrink-0" />
              <span className="truncate">Open pdf</span>
              <ExternalLink className="h-4 w-4 shrink-0" />
            </a>
          ) : (
            <p>Not available</p>
          )}
        </DetailField>
      </div>
    </SurfaceCard>
  );
}

export default function ResumeDetailPage() {
  const { id } = useParams();
  const { Resume, isError, isLoading } = getResumeById(id);
  const resume = Resume?.data as ResumeProps | undefined;

  return (
    <div className="min-h-svh">
      <PageHeader
        eyebrow="Resume detail"
        title={resume?.fileName || "Resume details"}
        description="Review the uploaded resume file details and parsed text returned by the system."
        actions={
          <Link
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-applytrack-outline bg-white px-3 text-sm font-semibold text-applytrack-primary transition hover:border-applytrack-primary hover:bg-[#F5F4FF]"
            to="/resumes"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        }
      />

      <main className="px-4 py-5 sm:px-6 lg:px-8">
        {isLoading ? (
          <SurfaceCard className="grid min-h-80 place-items-center p-6 text-center">
            <div>
              <Loader2 className="mx-auto h-9 w-9 animate-spin text-applytrack-primary" />
              <p className="mt-4 text-sm font-semibold text-applytrack-ink">
                Loading resume details...
              </p>
              <p className="mt-1 text-sm text-[#646378]">
                Fetching file information and parsed text.
              </p>
            </div>
          </SurfaceCard>
        ) : isError || !resume ? (
          <EmptyState
            icon={ShieldAlert}
            title="Resume details unavailable"
            description="The selected resume could not be loaded right now."
            action={
              <Link
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-applytrack-primary px-4 text-sm font-semibold text-white transition hover:bg-[#281BA8]"
                to="/resumes"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to resumes
              </Link>
            }
          />
        ) : (
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <section className="space-y-5">
              <ResumeOverview resume={resume} />

              <SurfaceCard className="overflow-hidden">
                <div className="flex flex-col gap-2 border-b border-[#EEF0F5] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                      parsedText
                    </h2>
                    <p className="mt-1 text-sm text-[#646378]">
                      Full text extracted from the uploaded resume.
                    </p>
                  </div>
                  <StatusBadge tone={resume.parsedText ? "green" : "neutral"}>
                    {resume.parsedText ? "Available" : "Empty"}
                  </StatusBadge>
                </div>
                <div className="max-h-136 overflow-auto bg-[#FAFBFF] p-5">
                  <pre className="min-h-72 whitespace-pre-wrap rounded-lg border border-[#E1E3EC] bg-white p-5 font-mono text-sm leading-7 text-[#343447]">
                    {valueOrFallback(resume.parsedText)}
                  </pre>
                </div>
              </SurfaceCard>
            </section>

            <aside className="space-y-5">
              <SurfaceCard className="p-5">
                <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                  Field summary
                </h2>
                <div className="mt-4 space-y-3">
                  {[
                    ["fileName", resume.fileName],
                    ["file_URL", resume.file_URL ? "Available" : ""],
                    ["parsedText", resume.parsedText ? "Available" : ""],
                    ["parsingStatus", resume.parsingStatus],
                  ].map(([label, value]) => (
                    <div
                      className="flex items-center justify-between gap-3 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3"
                      key={label}
                    >
                      <span className="text-sm text-[#646378]">{label}</span>
                      <span className="max-w-40 truncate text-sm font-semibold text-applytrack-ink">
                        {valueOrFallback(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#ECFDF5] text-[#047857]">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                      Clean layout
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-[#646378]">
                      Details are aligned for scanning and wrap safely on small
                      screens.
                    </p>
                  </div>
                </div>
              </SurfaceCard>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
