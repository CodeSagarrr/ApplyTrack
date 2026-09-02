import type { ComponentType, ReactNode } from "react";

type IconComponent = ComponentType<{ className?: string }>;

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-[#E6E8F0] bg-white px-4 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
      <div className="max-w-3xl">
        {eyebrow ? <p className="text-sm font-semibold text-applytrack-primary">{eyebrow}</p> : null}
        <h1 className="mt-1 font-heading text-2xl font-semibold text-applytrack-ink sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-[#646378]">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function SurfaceCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`rounded-lg border border-[#E1E3EC] bg-white shadow-sm shadow-applytrack-ink/3 ${className}`}>{children}</section>;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = "purple",
}: {
  icon: IconComponent;
  label: string;
  value: string | number;
  detail: string;
  tone?: "purple" | "blue" | "green" | "amber";
}) {
  const toneClass = {
    purple: "bg-[#F5F4FF] text-[#3525CD]",
    blue: "bg-[#EEF7FF] text-[#006591]",
    green: "bg-[#ECFDF5] text-[#047857]",
    amber: "bg-[#FFFBEB] text-[#B45309]",
  }[tone];

  return (
    <SurfaceCard className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#646378]">{label}</p>
          <p className="mt-2 font-heading text-2xl font-semibold text-applytrack-ink">{value}</p>
        </div>
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${toneClass}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-sm text-[#77768A]">{detail}</p>
    </SurfaceCard>
  );
}

export function StatusBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: "purple" | "blue" | "green" | "amber" | "neutral" }) {
  const toneClass = {
    purple: "border-[#D8D4FF] bg-[#F5F4FF] text-[#3525CD]",
    blue: "border-[#CFEAFF] bg-[#EEF7FF] text-[#006591]",
    green: "border-[#BDEFD8] bg-[#ECFDF5] text-[#047857]",
    amber: "border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]",
    neutral: "border-[#E1E3EC] bg-[#F8F9FF] text-[#646378]",
  }[tone];

  return <span className={`inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-semibold ${toneClass}`}>{children}</span>;
}

export function SkeletonBlock({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-hidden="true">
      {Array.from({ length: rows }).map((_, index) => (
        <div className="flex items-center gap-3" key={index}>
          <span className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-[#EEF0F5]" />
          <span className="min-w-0 flex-1 space-y-2">
            <span className="block h-3 w-2/3 animate-pulse rounded bg-[#EEF0F5]" />
            <span className="block h-3 w-1/2 animate-pulse rounded bg-[#F4F5F8]" />
          </span>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: IconComponent;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-applytrack-outline bg-[#FAFBFF] px-4 py-8 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#F5F4FF] text-applytrack-primary">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-sm font-semibold text-applytrack-ink">{title}</h3>
      <p className="mt-1 max-w-sm text-sm leading-6 text-[#646378]">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
