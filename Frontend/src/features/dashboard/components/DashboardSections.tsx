import { ArrowRight } from "lucide-react";
import { Chart, registerables } from "chart.js";
import { useEffect, useMemo, useRef, type ComponentType } from "react";
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

Chart.register(...registerables);

type BadgeTone = "purple" | "blue" | "green" | "amber";

interface MatricsCard {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: number;
  detail: string;
  tone: BadgeTone;
}

type ChartPoint = {
  month: string;
  count: number;
};

const fallbackPipelineDemo: IPipeline[] = [
  { _id: "Applied", count: 14 },
  { _id: "Screening", count: 7 },
  { _id: "Interview", count: 5 },
  { _id: "Offer", count: 2 },
  { _id: "Rejected", count: 3 },
];

const pipelineColors: Record<IPipeline["_id"], string> = {
  Applied: "#3525CD",
  Screening: "#006591",
  Interview: "#047857",
  Offer: "#B45309",
  Rejected: "#77768A",
};

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

function LineChart({ data }: { data: ChartPoint[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const chart = new Chart(canvas, {
      type: "line",
      data: {
        labels: data.map((item) => item.month),
        datasets: [
          {
            label: "Applications",
            data: data.map((item) => item.count),
            borderColor: "#3525CD",
            backgroundColor: "rgba(53, 37, 205, 0.12)",
            borderWidth: 3,
            fill: true,
            pointBackgroundColor: "#FFFFFF",
            pointBorderColor: "#3525CD",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 5,
            tension: 0.38,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#0B1C30",
            displayColors: false,
            padding: 10,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#77768A",
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#EEF0F5",
            },
            ticks: {
              color: "#77768A",
              precision: 0,
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvasRef} aria-label="Monthly application trend" />;
}

function DonutChart({ data }: { data: IPipeline[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: data.map((item) => item._id),
        datasets: [
          {
            data: data.map((item) => item.count),
            backgroundColor: data.map((item) => pipelineColors[item._id]),
            borderColor: "#FFFFFF",
            borderWidth: 4,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#0B1C30",
            padding: 10,
          },
        },
      },
    });

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvasRef} aria-label="Application status breakdown" />;
}

export function DashboardCharts({
  pipelineStages,
  applicationsPerMonth,
}: {
  pipelineStages: IPipeline[];
  applicationsPerMonth: { month: string; count: number }[];
}) {
  const donutData = useMemo(
    () => (pipelineStages.length > 0 ? pipelineStages : fallbackPipelineDemo),
    [pipelineStages]
  );
  const totalPipelineCount = donutData.reduce(
    (total, item) => total + item.count,
    0
  );

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
      <SurfaceCard className="min-w-0 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold">
              Application Trend
            </h2>
            <p className="mt-1 text-sm text-[#646378]">
              Demo monthly application volume for the current pipeline.
            </p>
          </div>
          <StatusBadge tone="blue">Last 7 months</StatusBadge>
        </div>
        <div className="mt-5 h-72 min-w-0 sm:h-80">
          <LineChart data={applicationsPerMonth} />
        </div>
      </SurfaceCard>

      <SurfaceCard className="min-w-0 p-5">
        <div>
          <h2 className="font-heading text-lg font-semibold">
            Status Breakdown
          </h2>
          <p className="mt-1 text-sm text-[#646378]">
            Application distribution by pipeline stage.
          </p>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,16rem)_1fr] sm:items-center xl:grid-cols-1">
          <div className="relative mx-auto h-64 w-full max-w-64">
            <DonutChart data={donutData} />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-heading text-3xl font-semibold text-applytrack-ink">
                {totalPipelineCount}
              </span>
              <span className="mt-1 text-xs font-semibold uppercase text-[#77768A]">
                Total
              </span>
            </div>
          </div>
          <div className="grid gap-3">
            {donutData.map((item) => (
              <div
                className="flex items-center justify-between gap-3 text-sm"
                key={item._id}
              >
                <span className="flex min-w-0 items-center gap-2 font-medium text-[#343447]">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: pipelineColors[item._id] }}
                  />
                  <span className="truncate">{item._id}</span>
                </span>
                <span className="font-semibold text-applytrack-ink">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}

export function RecentApplications({
  recentApplications,
}: {
  recentApplications: RecentApplicationsProps[];
}) {
  return (
    <SurfaceCard className="overflow-hidden">
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
              <tr>
                <td className="whitespace-nowrap px-5 py-4 font-semibold text-applytrack-ink">
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

