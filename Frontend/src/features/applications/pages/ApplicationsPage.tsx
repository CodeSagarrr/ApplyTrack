import { useEffect, useMemo, useRef, useState } from "react";
import {
  Archive,
  CalendarDays,
  Columns3,
  Edit3,
  ExternalLink,
  FilePlus2,
  Filter,
  KanbanSquare,
  List,
  Loader2,
  MoreVertical,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmptyState,
  PageHeader,
  StatusBadge,
  SurfaceCard,
} from "../../../components/ui/PagePrimitives";
import {
  ColumnEmptyState,
  FilterSelect,
  KanbanSkeleton,
} from "../components/ApplicationKanban";
import { ApplicationCard } from "../components/ApplicationCard";
import {
  deleteApplicationMutation,
  useGetFiltersQuery,
} from "../../../hooks/application/useApplication";
import type {
  Application,
  ApplicationStatus,
  initialParamsFiltersTypes,
} from "../../../types/ApiTypes";
import { useDebounce } from "../../../utils/Debounce";
import { getDate } from "../../../utils/HelperFunctions";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { queryClient } from "../../../lib/queryClient";

export const statuses: ApplicationStatus[] = [
  "Applied",
  "Interview",
  "Offer",
  "Screening",
  "Rejected",
];

export const statusTone: Record<
  ApplicationStatus,
  "purple" | "blue" | "green" | "amber" | "neutral"
> = {
  Applied: "purple",
  Interview: "blue",
  Offer: "green",
  Screening: "amber",
  Rejected: "amber",
};

const initialParamsFilters = {
  search: "",
  status: "",
  dateRange: "",
};

export default function ApplicationsPage() {
  const navigate = useNavigate();
  const deleteMutation = deleteApplicationMutation();
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"kanban" | "list">("list");
  const [applications, setApplications] = useState<Application[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [paramsFilter, setParamsFilter] =
    useState<initialParamsFiltersTypes>(initialParamsFilters);
  const deBouncedSearch = useDebounce(paramsFilter.search, 500);
  const { from, to } = getDate(paramsFilter.dateRange);

  const queryFilter = useMemo(
    () => ({
      search: deBouncedSearch,
      status:
        paramsFilter.status === "All statuses"
          ? undefined
          : paramsFilter.status,
      from: from,
      to: to,
    }),
    [deBouncedSearch, paramsFilter.status, paramsFilter.dateRange],
  );

  const { data: filteredApplication } = useGetFiltersQuery(queryFilter);

  useMemo(() => {
    setApplications(
      filteredApplication?.pages.flatMap((page) => page.data ?? []) ?? [],
    );
  }, [filteredApplication?.pages]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);



  const groupedApplications = useMemo(
    () =>
      statuses.reduce<Record<ApplicationStatus, Application[]>>(
        (grouped, status) => {
          grouped[status] =
            applications?.filter(
              (application: Application) => application?.status === status,
            ) || [];
          return grouped;
        },
        {} as Record<ApplicationStatus, Application[]>,
      ),
    [applications],
  );

  function moveApplication(targetStatus: ApplicationStatus) {
    if (draggedId === null) return;
    setApplications((current: Application[]) =>
      current.map((application) =>
        application._id === draggedId
          ? { ...application, status: targetStatus }
          : application,
      ),
    );
    setDraggedId(null);
  }

  function handleDeleteApplication(id: string) {
    deleteMutation.mutate(id, {
      onSuccess() {
        toast.success("Application deleted successfully.");
        queryClient.invalidateQueries({
          queryKey: ["applications"],
          type: "all",
        });
      },
      onError(err) {
        const error = err as AxiosError<{ message: string }>;
        toast.error(error.response?.data.message || "Unable to delete application. Please try again.");
      },
    });
  }

  return (
    <div className="min-h-svh">
      <PageHeader
        eyebrow="Applications"
        title="Manage your application pipeline"
        description="Track roles from wishlist to offer with fast filters, polished cards, and a responsive kanban workflow."
        actions={
          <>
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-applytrack-primary px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#281BA8]"
              to="/applications/new"
            >
              <FilePlus2 className="h-4 w-4" />
              Add application
            </Link>
          </>
        }
      />

      <div className="space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        <SurfaceCard className="p-4">
          <div className="grid gap-3 xl:grid-cols-[1fr_auto] xl:items-center">
            <div className="grid gap-3 md:grid-cols-[minmax(12rem,1.2fr)_repeat(3,minmax(10rem,0.8fr))]">
              <label className="relative">
                <span className="sr-only">Search applications</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77768A]" />
                <input
                  className="h-11 w-full rounded-lg border border-[#E1E3EC] bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-[#9A99A8] hover:border-applytrack-outline focus:border-applytrack-primary focus:ring-4 focus:ring-applytrack-primary/10"
                  onChange={(event) =>
                    setParamsFilter({
                      ...paramsFilter,
                      search: event.target.value,
                    })
                  }
                  placeholder="Search company, role, contact"
                  value={paramsFilter.search}
                />
              </label>
              <FilterSelect
                icon={Filter}
                label="Status"
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                  setParamsFilter({
                    ...paramsFilter,
                    status: event.target.value,
                  })
                }
                options={["All statuses", ...statuses]}
                value={paramsFilter.status}
              />
              <FilterSelect
                icon={CalendarDays}
                label="Date"
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                  setParamsFilter({
                    ...paramsFilter,
                    dateRange: event.target.value,
                  })
                }
                options={[
                  "Any date",
                  "Last 7 days",
                  "Last 30 days",
                  "Last 90 days",
                ]}
                value={paramsFilter.dateRange}
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex h-11 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-1">
                <button
                  aria-label="List view"
                  className={`grid h-9 w-10 place-items-center rounded-md transition ${view === "list" ? "bg-white text-applytrack-primary shadow-sm" : "text-[#77768A] hover:text-applytrack-ink"}`}
                  onClick={() => setView("list")}
                  title="List view"
                  type="button"
                >
                  <List className="h-4 w-4" />
                </button>
                                <button
                  aria-label="Kanban view"
                  className={`grid h-9 w-10 place-items-center rounded-md transition ${view === "kanban" ? "bg-white text-applytrack-primary shadow-sm" : "text-[#77768A] hover:text-applytrack-ink"}`}
                  onClick={() => setView("kanban")}
                  title="Kanban view"
                  type="button"
                >
                  <KanbanSquare className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm font-medium text-[#646378]">
                {applications.length} shown
              </p>
            </div>
          </div>
        </SurfaceCard>

        {isLoading ? (
          <KanbanSkeleton />
        ) : applications.length === 0 ? (
          <EmptyState
            action={
              <button
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-applytrack-primary px-4 text-sm font-semibold text-white transition hover:bg-[#281BA8]"
                onClick={() => navigate("/applications/new")}
                type="button"
              >
                <Plus className="h-4 w-4" />
                Add application
              </button>
            }
            description="Try adjusting filters or add a new role to start filling your pipeline."
            icon={Archive}
            title="No applications match these filters"
          />
        ) : view === "kanban" ? (
          <div className="grid gap-4 lg:grid-cols-5">
            {statuses.map((status, index) => (
              <section
                key={index}
                className={`min-h-80 rounded-lg border border-[#E1E3EC] bg-[#FDFDFF] p-3 transition ${draggedId !== null ? "ring-2 ring-applytrack-primary/10" : ""}`}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => moveApplication(status)}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-applytrack-primary shadow-sm">
                      <Columns3 className="h-4 w-4" />
                    </span>
                    <h2 className="text-sm font-semibold text-applytrack-ink">
                      {status}
                    </h2>
                  </div>
                  <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-[#77768A] shadow-sm">
                    {groupedApplications[status].length}
                  </span>
                </div>
                <div className="space-y-3">
                  {groupedApplications[status].length > 0 ? (
                    groupedApplications[status].map((application  :Application) => (
                      <ApplicationCard
                        application={application}
                        isDragging={draggedId === application._id}
                        key={application._id}
                        onDragEnd={() => setDraggedId(null)}
                        onDragStart={() => setDraggedId(application._id)}
                        onEdit={() =>
                          navigate(`/applications/${application._id}/edit`, {
                            state: { application },
                          })
                        }
                        onAtsService={() =>
                          navigate(
                            `/applications/${application._id}/ats-service`,
                            {
                              state: { application },
                            },
                          )
                        }
                        onDelete={() =>
                          handleDeleteApplication(application._id)
                        }
                        isDeleting={() =>
                          application._id === deleteMutation.variables &&
                          deleteMutation.isPending
                        }
                      />
                    ))
                  ) : (
                    <ColumnEmptyState
                      onAdd={() => navigate("/applications/new")}
                      status={status}
                    />
                  )}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <SurfaceCard >
            <div className="hidden grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_1fr_0.6fr_auto] gap-4 border-b border-[#EEF0F5] bg-[#FAFBFF] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#77768A] lg:grid">
              <span>Role</span>
              <span>Status</span>
              <span>Platform</span>
              <span>Date</span>
              <span>Resume</span>
              <span>Match</span>
              <span className="text-right">Actions</span>
            </div>
            <div className="divide-y divide-[#EEF0F5]">
              {applications.map((application) => (
                <article
                  className="grid gap-4 p-5 transition hover:bg-[#FAFBFF] lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_1fr_0.6fr_auto] lg:items-center"
                  key={application._id}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-applytrack-ink">
                      {application.companyName}
                    </p>
                    <p className="mt-1 truncate text-sm text-[#646378]">
                      {application.roleTitle}
                    </p>
                  </div>
                  <StatusBadge tone={statusTone[application.status]}>
                    {application.status}
                  </StatusBadge>
                  <p className="text-sm font-medium text-[#646378]">
                    {application.platForm}
                  </p>
                  <p className="text-sm text-[#646378]">
                    {new Date(application.createdAt).toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="min-w-0 truncate text-sm font-medium text-[#646378]">
                    {application.resume?.fileName || "Not selected"}
                  </p>
                  <p className="text-sm font-semibold text-applytrack-ink">
                    {application?.matchResult?.matchScore ?? 0}%
                  </p>
                  <div className="relative flex items-center lg:justify-end" ref={menuRef}>
                    <button
                      aria-label="Open application menu"
                      className="grid h-9 w-9 place-items-center rounded-lg border border-[#E1E3EC] bg-white text-[#646378] transition hover:border-applytrack-outline hover:bg-applytrack-surface hover:text-applytrack-primary"
                      onClick={() =>
                        setOpenMenuId(openMenuId === application._id ? null : application._id)
                      }
                      title="Actions"
                      type="button"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    {openMenuId === application._id && (
                      <div className="absolute right-0 top-full z-50 mt-1 flex gap-2 rounded-lg border border-[#E1E3EC] bg-white p-2 shadow-lg">
                        <button
                          className="grid h-8 w-8 place-items-center rounded-md text-[#646378] transition hover:bg-[#F5F4FF] hover:text-applytrack-primary"
                          onClick={() => {
                            navigate(
                              `/applications/${application._id}/ats-service`,
                              { state: { application } },
                            );
                          }}
                          title="Run ATS"
                          type="button"
                        >
                          <Sparkles className="h-4 w-4" />
                        </button>
                        <button
                          className="grid h-8 w-8 place-items-center rounded-md text-[#646378] transition hover:bg-[#F5F4FF] hover:text-applytrack-primary"
                          onClick={() => {
                            navigate(`/applications/${application._id}`, {
                              state: { application },
                            });
                          }}
                          title="View"
                          type="button"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button
                          className="grid h-8 w-8 place-items-center rounded-md text-[#646378] transition hover:bg-[#F5F4FF] hover:text-applytrack-primary"
                          onClick={() => {
                            navigate(`/applications/${application._id}/edit`, {
                              state: { application },
                            });
                          }}
                          title="Edit"
                          type="button"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          className="grid h-8 w-8 place-items-center rounded-md text-[#646378] transition hover:bg-[#FEE2E2] hover:text-[#DC2626]"
                          onClick={() => {
                            handleDeleteApplication(application._id);
                          }}
                          title="Delete"
                          type="button"
                        >
                          {application._id === deleteMutation.variables &&
                          deleteMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </SurfaceCard>
        )}
      </div>
    </div>
  );
}
