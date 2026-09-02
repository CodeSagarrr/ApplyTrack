import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Edit3,
  ExternalLink,
  FileText,
  Gauge,
  Loader2,
  Mail,
  MapPin,
  NotebookText,
  Wallet,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  EmptyState,
  PageHeader,
  StatCard,
  StatusBadge,
  SurfaceCard,
} from "../../../components/ui/PagePrimitives";
import { useGetApplicationByIdQuery } from "../../../hooks/application/useApplication";
import type { Application } from "../../../types/ApiTypes";
import { statusTone } from "./ApplicationsPage";

type ApplicationDetail = Partial<Application> & {
  id?: string;
};

function formatDate(date?: string) {
  if (!date) return "Not added";
  return new Date(date).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function detailValue(value?: string | null) {
  return value && value.trim().length > 0 ? value : "Not added";
}

function statTone(status?: Application["status"]) {
  if (!status) return "purple";
  return statusTone[status] === "neutral" ? "purple" : statusTone[status];
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-applytrack-primary shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase text-[#77768A]">
          {label}
        </p>
        <p className="mt-1 wrap-break-word text-sm font-semibold text-applytrack-ink">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ApplicationDetailPage() {
  const { id } = useParams();
    const { data, isLoading, isError } = useGetApplicationByIdQuery(id);
    const application = (data?.data) as
      | ApplicationDetail
      | undefined;
  const applicationId = application?._id ?? application?.id ?? id ?? "";
  let score =(application?.matchResult?.matchScore) ?? 0;

  if (isLoading && !application) {
    return (
      <div className="grid min-h-svh place-items-center px-4">
        <div className="text-center">
          <Loader2 className="mx-auto h-9 w-9 animate-spin text-applytrack-primary" />
          <p className="mt-4 text-sm font-semibold text-applytrack-ink">
            Loading application details...
          </p>
        </div>
      </div>
    );
  }

  if (isError && !application) {
    return (
      <div className="min-h-svh px-4 py-5 sm:px-6 lg:px-8">
        <EmptyState
          action={
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-applytrack-primary px-4 text-sm font-semibold text-white transition hover:bg-[#281BA8]"
              to="/applications"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to applications
            </Link>
          }
          description="This application could not be loaded. It may have been deleted or moved."
          icon={BriefcaseBusiness}
          title="Application not found"
        />
      </div>
    );
  }

  return (
    <div className="min-h-svh">
      <PageHeader
        eyebrow="Application detail"
        title={`${detailValue(application?.companyName)} - ${detailValue(application?.roleTitle)}`}
        description="Review the complete application record, resume match signals, and next navigation actions from one readable workspace."
        actions={
          <>
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-applytrack-outline bg-white px-3 text-sm font-semibold text-applytrack-primary transition hover:border-applytrack-primary hover:bg-[#F5F4FF]"
              to="/applications"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-applytrack-primary px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#281BA8]"
              state={{ application }}
              to={`/applications/${applicationId}/edit`}
            >
              <Edit3 className="h-4 w-4" />
              Edit
            </Link>
          </>
        }
      />

      <div className="space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            detail="Current pipeline stage"
            icon={BriefcaseBusiness}
            label="Status"
            tone={statTone(application?.status)}
            value={detailValue(application?.status)}
          />
          <StatCard
            detail="Resume alignment"
            icon={Gauge}
            label="ATS match"
            tone={score >= 80 ? "green" : "amber"}
            value={`${score}%`}
          />
          <StatCard
            detail="Application submitted"
            icon={CalendarDays}
            label="Date applied"
            tone="blue"
            value={formatDate(application?.dateApplied)}
          />
          <StatCard
            detail="Expected compensation"
            icon={Wallet}
            label="Salary"
            tone="amber"
            value={detailValue(application?.salary_range)}
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <main className="space-y-5">
            <SurfaceCard className="overflow-hidden">
              <div className="flex flex-col gap-2 border-b border-[#EEF0F5] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                    Application overview
                  </h2>
                  <p className="mt-1 text-sm text-[#646378]">
                    Key company, platform, contact, and location details.
                  </p>
                </div>
                {application?.status ? (
                  <StatusBadge tone={statusTone[application.status]}>
                    {application.status}
                  </StatusBadge>
                ) : null}
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-2">
                <InfoRow
                  icon={Building2}
                  label="Company"
                  value={detailValue(application?.companyName)}
                />
                <InfoRow
                  icon={BriefcaseBusiness}
                  label="Role"
                  value={detailValue(application?.roleTitle)}
                />
                <InfoRow
                  icon={ExternalLink}
                  label="Platform"
                  value={detailValue(application?.platForm)}
                />
                <InfoRow
                  icon={Mail}
                  label="Contact"
                  value={detailValue(application?.contact)}
                />
                <InfoRow
                  icon={MapPin}
                  label="Location"
                  value={detailValue(application?.location)}
                />
                <InfoRow
                  icon={CalendarDays}
                  label="Created"
                  value={formatDate(application?.createdAt)}
                />
              </div>
            </SurfaceCard>

            <SurfaceCard className="overflow-hidden">
              <div className="border-b border-[#EEF0F5] p-5">
                <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                  Job description
                </h2>
                <p className="mt-1 text-sm text-[#646378]">
                  Saved description and external posting link.
                </p>
              </div>
              <div className="space-y-4 p-5">
                {application?.jd_URL ? (
                  <a
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E1E3EC] px-3 text-sm font-semibold text-[#343447] transition hover:border-applytrack-outline hover:bg-[#F5F4FF] hover:text-applytrack-primary"
                    href={application.jd_URL}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open job post
                  </a>
                ) : null}
                <div className="rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-4">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-[#343447]">
                    {detailValue(application?.jd_text)}
                  </p>
                </div>
              </div>
            </SurfaceCard>
          </main>

          <aside className="space-y-5">
            <SurfaceCard className="p-5">
              <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                Resume match
              </h2>
              <div className="mt-5 grid place-items-center">
                <div className="grid h-36 w-36 place-items-center rounded-full border-14 border-[#E8F7EF] bg-white shadow-inner">
                  <div className="text-center">
                    <p className="font-heading text-4xl font-semibold text-[#047857]">
                      {score}
                    </p>
                    <p className="text-xs font-semibold text-[#77768A]">
                      match score
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-applytrack-primary shadow-sm">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-applytrack-ink">
                      {detailValue(application?.resume?.fileName)}
                    </p>
                    <p className="mt-1 text-xs text-[#77768A]">
                      Attached resume
                    </p>
                  </div>
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-5">
              <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
                Notes
              </h2>
              <div className="mt-4 flex gap-3 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3">
                <NotebookText className="mt-0.5 h-5 w-5 shrink-0 text-applytrack-primary" />
                <p className="text-sm leading-6 text-[#343447]">
                  {detailValue(application?.notes)}
                </p>
              </div>
            </SurfaceCard>
          </aside>
        </div>
      </div>
    </div>
  );
}
