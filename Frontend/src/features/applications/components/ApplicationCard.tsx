import { Edit3, Sparkles, Trash2 , GripVertical} from "lucide-react";
import { StatusBadge } from "../../../components/ui/PagePrimitives";
import type { Application } from "../../../types/ApiTypes";
import { IconButton } from "./ApplicationKanban";
import { statusTone } from "../pages/ApplicationsPage";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";

export function ApplicationCard({
  application,
  isDragging,
  onEdit,
  onDragStart,
  onDragEnd,
  onDelete,
  isDeleting,
  onAtsService,
}: {
  application: Application;
  isDragging: boolean;
  onEdit: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDelete: () => void
  isDeleting: () => boolean
  onAtsService: () => void;
}) {
  return (
    <article
      className={`group rounded-lg border border-[#E1E3EC] bg-white p-4 shadow-sm shadow-applytrack-ink/3 transition duration-200 hover:-translate-y-0.5 hover:border-applytrack-outline hover:shadow-md ${isDragging ? "scale-[0.98] opacity-60 ring-2 ring-applytrack-primary/30" : ""}`}
      draggable
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#F5F4FF] text-sm font-bold text-applytrack-primary">
          {application.companyName.slice(0, 2).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-applytrack-ink">{application.companyName}</h3>
              <p className="mt-1 truncate text-sm text-[#646378]">{application.roleTitle}</p>
            </div>
            <GripVertical className="mt-1 h-4 w-4 shrink-0 text-[#B6B5C4] opacity-0 transition group-hover:opacity-100" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatusBadge tone={statusTone[application.status]}>{application.status}</StatusBadge>
        <span className="inline-flex h-7 items-center rounded-md border border-[#E1E3EC] bg-[#FAFBFF] px-2.5 text-xs font-semibold text-[#646378]">
          {application.platForm}
        </span>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-[#646378]">
        <div className="flex items-center justify-between gap-3">
          <span>Resume</span>
          <span className="min-w-0 truncate font-semibold text-applytrack-ink">
            {application.resume?.fileName || "Not selected"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span>Match score</span>
          <span className="font-semibold text-applytrack-ink">{application?.matchResult?.matchScore ?? 0}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#EEF0F5]">
          <span className="block h-full rounded-full bg-applytrack-primary" style={{ width: `${application?.matchResult?.matchScore ?? 0}%` }} />
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-[#FAFBFF] p-3">
        <p className="line-clamp-2 text-sm leading-5 text-[#343447]"> Application Created At</p>
        <p className="mt-2 text-xs font-semibold text-[#77768A]">{new Date(application.createdAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="truncate text-xs font-semibold text-[#77768A]">{application.salary_range}</span>
        <div className="flex items-center gap-1">
          <IconButton label={`Run ATS for ${application.companyName}`} onClick={onAtsService}>
            <Sparkles className="h-4 w-4" />
          </IconButton>
          <IconButton label={`Edit ${application.companyName}`} onClick={onEdit}>
            <Edit3 className="h-4 w-4" />
          </IconButton>
          <IconButton label={`Delete ${application.companyName}`} onClick={onDelete}>
            { isDeleting() ? <LoadingSpinner size="sm" /> : <Trash2 className="h-4 w-4" />}
          </IconButton>
        </div>
      </div>
    </article>
  );
}
