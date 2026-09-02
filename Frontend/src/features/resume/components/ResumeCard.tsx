import {
  ExternalLink,
  FileText,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBadge } from "../../../components/ui/PagePrimitives";
import type { ResumeProps } from "../../../types/ApiTypes";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ResumeCard({
  resume,
  selected,
  visibleDeleteButton,
  onDelete,
  onSetDefault,
  isSetDefaultPending,
  isDeleteing,
}: {
  resume: ResumeProps;
  selected: boolean;
  visibleDeleteButton: boolean;
  onCompare: () => void;
  onDelete: (id: string, force: boolean) => void;
  onSetDefault: () => void;
  isSetDefaultPending: () => boolean;
  isDeleteing: () => boolean;
}) {
  return (
    <article
      className={`group rounded-lg border bg-white p-4 shadow-sm shadow-applytrack-ink/3 transition duration-200 hover:-translate-y-0.5 hover:border-applytrack-outline hover:shadow-md ${
        selected
          ? "border-applytrack-primary ring-4 ring-applytrack-primary/10"
          : "border-[#E1E3EC]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#F5F4FF] text-applytrack-primary">
            <FileText className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <Link
              className="block truncate text-sm font-semibold text-applytrack-ink transition hover:text-applytrack-primary"
              to={`/resumes/${resume._id}`}
            >
              {resume.fileName}
            </Link>
            <p className="mt-1 text-sm text-[#646378]">
              Updated {formatDate(resume.updatedAt)}
            </p>
          </div>
        </div>
        <Link
          to={resume.file_URL}
          target="_blank"
          className="inline-flex max-w-full items-center gap-2 text-applytrack-primary transition hover:text-[#281BA8]"
        >
          Open <ExternalLink className="h-4 w-4 shrink-0" />
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {resume.isDefault ? (
            <StatusBadge tone="purple">Default</StatusBadge>
          ) : null}
        </div>
        <div className="flex items-center gap-1">
          {visibleDeleteButton ? (
            <button
              className=" flex items-center justify-center gap-2 h-9 w-38 rounded-lg border border-[#E1E3EC] text-sm font-semibold text-[#424245] transition hover:border-[#f69797] hover:text-[#DC2626]"
              onClick={() => onDelete(resume._id, true)}
              title="confirm to delete"
              type="button"
            >
              {isDeleteing() ? (
                <LoadingSpinner size="sm"></LoadingSpinner>
              ) : (
                "Delete anyway"
              )}
            </button>
          ) : null}
          <Link
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#E1E3EC] text-[#646378] transition hover:border-applytrack-outline hover:text-applytrack-primary"
            title="Edit"
            to={`/resumes/${resume._id}/edit`}
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <button
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#E1E3EC] text-[#646378] transition hover:border-applytrack-outline hover:text-applytrack-primary"
            onClick={onSetDefault}
            title="Set as default"
            type="button"
          >
            {isSetDefaultPending() ? (
              <LoadingSpinner size="sm"></LoadingSpinner>
            ) : (
              <Star
                className={`h-4 w-4 ${resume.isDefault ? "fill-applytrack-primary text-applytrack-primary" : ""}`}
              />
            )}
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#E1E3EC] text-[#646378] transition hover:border-[#FCA5A5] hover:text-[#DC2626]"
            onClick={() => onDelete(resume._id, false)}
            title="Delete"
            type="button"
          >
            {isDeleteing() ? (
              <LoadingSpinner size="sm"></LoadingSpinner>
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
