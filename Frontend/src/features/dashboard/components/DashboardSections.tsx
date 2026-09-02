import { ArrowRight } from "lucide-react";
import {
  StatCard,
  StatusBadge,
  SurfaceCard,
} from "../../../components/ui/PagePrimitives";
import type {
  IPipeline,
  RecentApplicationsProps,
} from "../../../types/ApiTypes";
import { formatDate } from "../../../utils/HelperFunctions";
import type { ComponentType } from "react";

type BadgeTone = "purple" | "blue" | "green" | "amber";

interface MatricsCard {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: number;
  detail: string;
  tone: BadgeTone;
}

function getStatusTone(status: string): BadgeTone {
  if (status === "Interview") {
    return "green";
  }
  if (status === "Screening") {
    return "blue";
  }
  return "purple";
}

function getPipelineTone(tone: string) {
  let toneColour;

  switch (tone.toLowerCase().trim()) {
    case "applied":
      toneColour = "bg-[#3525CD]";
      break;
    case "interview":
      toneColour = "bg-[#047857]";
      break;
    case "screening":
      toneColour = "bg-[#006591]";
      break;
    case "offer":
      toneColour = "bg-[#77768A]";
      break;
    case "rejected":
      toneColour = "bg-[#77768A]";
      break;
    default:
      break;
  }
  return toneColour;
}

export function MetricsSection({
  metricCards,
}: {
  metricCards: MatricsCard[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metricCards.map((metric: MatricsCard) => (
        <StatCard
          key={metric.label}
          icon={metric.icon}
          label={metric.label}
          value={metric.value}
          detail={metric.detail}
          tone={metric.tone}
        />
      ))}
    </div>
  );
}

export function RecentApplications({
  recentApplications,
}: {
  recentApplications: RecentApplicationsProps[];
}) {
  return (
    <SurfaceCard>
      <div className="flex flex-col gap-3 border-b border-[#EEF0F5] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold">
            Recent Applications
          </h2>
          <p className="mt-1 text-sm text-[#646378]">
            Latest roles added to your pipeline.
          </p>
        </div>
        <button
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#E1E3EC] px-3 text-sm font-semibold text-[#343447] transition hover:border-applytrack-outline hover:text-applytrack-primary"
          type="button"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#EEF0F5] text-xs font-semibold uppercase text-[#77768A]">
            <tr>
              <th className="px-5 py-3">Company</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Match Score</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEF0F5]">
            {recentApplications.length > 0 ? (
              recentApplications.map((application: RecentApplicationsProps) => (
                <tr
                  className="align-middle"
                  key={`${application.companyName}-${application.roleTitle}`}
                >
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-applytrack-ink">
                    {application.companyName}
                  </td>
                  <td className="min-w-48 px-5 py-4 text-[#646378]">
                    {application.roleTitle}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <StatusBadge tone={getStatusTone(application.status)}>
                      {application.status}
                    </StatusBadge>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-applytrack-ink">
                    {application.matchScore}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-[#646378]">
                    {formatDate(application.createdAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="whitespace-nowrap px-5 py-4 font-semibold text-applytrack-ink">
                <td>
                  <span className="font-semibold text-applytrack-ink">
                    No recent applications found.
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SurfaceCard>
  );
}

export function ApplicationPipeline({
  pipelineStages,
}: {
  pipelineStages: IPipeline[];
}) {
  return (
    <SurfaceCard className="p-5">
      <div>
        <h2 className="font-heading text-lg font-semibold">
          Application Pipeline
        </h2>
        <p className="mt-1 text-sm text-[#646378]">
          Current application status distribution.
        </p>
      </div>
      <div className="mt-5 space-y-4">
        {pipelineStages.length > 0 ? (
          pipelineStages.map((stage: IPipeline) => (
            <div className="grid gap-2" key={stage._id}>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="font-medium text-[#343447]">{stage._id}</span>
                <span className="font-semibold text-applytrack-ink">
                  {stage.count}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[#EEF0F5]">
                <div
                  className={`h-full rounded-full ${getPipelineTone(stage._id)}`}
                  style={{ width: `${stage.count}%` }}
                />
              </div>
            </div>
          ))
        ) : (
          <span className="font-semibold text-applytrack-ink">
            No status
          </span>
        )}
      </div>
    </SurfaceCard>
  );
}

export function AtsScoreOverview({
  matchScore,
  totalApplications,
}: {
  matchScore: number;
  totalApplications: number;
}) {
  return (
    <SurfaceCard className="p-5">
      <div>
        <h2 className="font-heading text-lg font-semibold">
          Match Score Overview
        </h2>
        <p className="mt-1 text-sm text-[#646378]">
          Average match performance across your analyzed applications.
        </p>
      </div>
      <div className="mt-6">
        <div className="flex items-end justify-between gap-4">
          <p className="font-heading text-5xl font-semibold leading-none text-[#047857]">
            {matchScore ?? 0}%
          </p>
          <StatusBadge tone="green" >{!matchScore ? "Unready": "Ready"}</StatusBadge>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-[#646378]">
              Across {totalApplications} analyzed applications
            </span>
            <span className="font-semibold text-applytrack-ink">
              {matchScore ?? 0}%
            </span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#EEF0F5]">
            <div
              className="h-full rounded-full bg-applytrack-primary"
              style={{ width: `${matchScore ?? 0}%` }}
            />
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}

export function QuickActions({ quickActions }: any) {
  return (
    <SurfaceCard className="p-5">
      <h2 className="font-heading text-lg font-semibold">Quick Actions</h2>
      <div className="mt-4 grid gap-2">
        {quickActions.map(({ icon: Icon, label }: any) => (
          <button
            className="flex h-10 items-center gap-3 rounded-lg border border-[#E1E3EC] px-3 text-sm font-semibold text-[#343447] transition hover:border-applytrack-outline hover:bg-applytrack-surface hover:text-applytrack-primary"
            key={label}
            type="button"
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </SurfaceCard>
  );
}
