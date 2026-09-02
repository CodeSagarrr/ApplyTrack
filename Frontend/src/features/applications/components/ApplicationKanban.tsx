import { Filter , ChevronDown, Inbox, Plus } from "lucide-react";
import { statuses} from "../pages/ApplicationsPage";
import type { ApplicationStatus } from "../../../types/ApiTypes";

export function KanbanSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {statuses.map((status) => (
        <div className="rounded-lg border border-[#E1E3EC] bg-white p-3 shadow-sm" key={status}>
          <div className="mb-4 flex items-center justify-between">
            <span className="h-4 w-24 animate-pulse rounded bg-[#EEF0F5]" />
            <span className="h-6 w-8 animate-pulse rounded-md bg-[#F4F5F8]" />
          </div>
          <div className="space-y-3">
            {[0, 1, 2].map((item) => (
              <div className="rounded-lg border border-[#EEF0F5] p-4" key={item}>
                <span className="block h-4 w-3/4 animate-pulse rounded bg-[#EEF0F5]" />
                <span className="mt-3 block h-3 w-1/2 animate-pulse rounded bg-[#F4F5F8]" />
                <span className="mt-5 block h-16 animate-pulse rounded-lg bg-[#FAFBFF]" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function IconButton({
  label,
  children,
  onClick,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      className={`grid h-9 w-9 place-items-center rounded-lg border border-[#E1E3EC] bg-white text-[#646378] transition hover:border-applytrack-outline hover:bg-applytrack-surface hover:text-applytrack-primary ${className}`}
      onClick={onClick}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}

export function FilterSelect({
  icon: Icon,
  label,
  value,
  options,
  onChange,
}: {
  icon: typeof Filter;
  label: string;
  value: string;
  options: string[];
  onChange: (e : React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <label className="relative min-w-0 flex-1 sm:min-w-40">
      <span className="sr-only">{label}</span>
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77768A]" />
      <select
        className="h-11 w-full appearance-none rounded-lg border border-[#E1E3EC] bg-white pl-9 pr-9 text-sm font-medium text-[#343447] outline-none transition hover:border-applytrack-outline focus:border-applytrack-primary focus:ring-4 focus:ring-applytrack-primary/10"
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77768A]" />
    </label>
  );
}

export function ColumnEmptyState({ status, onAdd }: { status: ApplicationStatus; onAdd: () => void }) {
  return (
    <div className="rounded-lg border border-dashed border-applytrack-outline bg-white/70 p-4 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-lg bg-[#F5F4FF] text-applytrack-primary">
        <Inbox className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-applytrack-ink">No applications in {status} yet</h3>
      <p className="mt-1 text-xs leading-5 text-[#646378]">Add a role or drag a card here when it reaches this stage.</p>
      <button
        className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-applytrack-primary px-3 text-sm font-semibold text-white transition hover:bg-[#281BA8]"
        onClick={onAdd}
        type="button"
      >
        <Plus className="h-4 w-4" />
        Add
      </button>
    </div>
  );
}