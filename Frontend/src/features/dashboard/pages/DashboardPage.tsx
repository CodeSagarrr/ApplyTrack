import {
  BriefcaseBusiness,
  CirclePlus,
  FileSearch,
  Gauge,
  Sparkles,
  TrendingUp,
  Upload,
} from "lucide-react";
import { PageHeader } from "../../../components/ui/PagePrimitives";
import {
  ApplicationPipeline,
  AtsScoreOverview,
  MetricsSection,
  QuickActions,
  RecentApplications,
} from "../components/DashboardSections";
import { useGetSumary } from "../../../hooks/dashboard/useFetch";
import { LoadingState } from "../../../components/ui/LoadingSpinner";
import type {
  DashboardDataProps,
  IPipeline,
  RecentApplicationsProps,
} from "../../../types/ApiTypes";
import { Link } from "react-router";
import { getUser } from "../../../hooks/profile/useProfile";

const quickActions = [
  { icon: CirclePlus, label: "Add Application" },
  { icon: Upload, label: "Upload Resume" },
  { icon: Sparkles, label: "Run Match Check" },
];

export default function DashboardPage() {
  const { data, isLoading } = useGetSumary();
  const { data : User } = getUser()
  const results = (data?.result as DashboardDataProps) ?? {};
  const recentApplications =
    (data?.result.recentApplications as RecentApplicationsProps[]) ?? [];
  const pipelineStages = (data?.result.pipeline as IPipeline[]) ?? [];
  if (isLoading) {
    <LoadingState />;
  }

  console.log(User)
  console.log(results)

  const metricCards = [
    {
      icon: BriefcaseBusiness,
      label: "Active applications",
      value: results.activeApplications ?? 0,
      detail: "+6 this month",
      tone: "purple" as const,
    },
    {
      icon: Gauge,
      label: "Average match score",
      value: results.averageMatchScore ?? 0,
      detail: `${results.totalApplications ?? 0} analyzed applications`,
      tone: "green" as const,
    },
    {
      icon: TrendingUp,
      label: "Applications this month",
      value: results.applicationsThisMonth ?? 0,
      detail: "+3 vs last month",
      tone: "blue" as const,
    },
    {
      icon: TrendingUp,
      label: "Interview rate",
      value: results.interviewApplications ?? 0,
      detail: "Last 30 days",
      tone: "amber" as const,
    },
  ];

  return (
    <div className="min-h-svh">
      <PageHeader
        eyebrow="Dashboard"
        title={`Good morning, ${User?.data.name ?? "User"} !`}
        description="Track applications, monitor match quality, and keep your resume readiness in view."
        actions={
          <>
            <Link
              to={"/resumes"}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-applytrack-outline bg-white px-3 text-sm font-semibold text-applytrack-primary transition hover:border-applytrack-primary hover:bg-[#F5F4FF]"
              type="button"
            >
              <FileSearch className="h-4 w-4" />
              Upload Resume
            </Link>
            <Link
              to={"/applications/new"}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-applytrack-primary px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#281BA8]"
              type="button"
            >
              <CirclePlus className="h-4 w-4" />
              Add Application
            </Link>
          </>
        }
      />

      <div className="grid gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
        <main className="space-y-5">
          <MetricsSection metricCards={metricCards} />
          <RecentApplications recentApplications={recentApplications} />
          <div className="grid gap-5 xl:grid-cols-2">
            <ApplicationPipeline pipelineStages={pipelineStages} />
            <AtsScoreOverview
              matchScore={results.averageMatchScore}
              totalApplications={results.totalApplications}
            />
          </div>
        </main>

        <aside className="space-y-5">
          <QuickActions quickActions={quickActions} />
        </aside>
      </div>
    </div>
  );
}
