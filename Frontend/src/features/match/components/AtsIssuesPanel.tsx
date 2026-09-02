import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { SurfaceCard } from "../../../components/ui/PagePrimitives";

export type AtsIssueSeverity = "HIGH" | "MEDIUM" | "LOW";

export interface AtsIssue {
  _id?: string;
  severity: AtsIssueSeverity;
  category: string;
  message: string;
}

const severityStyles: Record<
  AtsIssueSeverity,
  {
    badge: string;
    icon: string;
    Icon: typeof AlertTriangle;
  }
> = {
  HIGH: {
    badge: "border-[#FCA5A5] bg-[#FEF2F2] text-[#B91C1C]",
    icon: "bg-[#FEF2F2] text-[#DC2626]",
    Icon: AlertTriangle,
  },
  MEDIUM: {
    badge: "border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]",
    icon: "bg-[#FFFBEB] text-[#D97706]",
    Icon: Info,
  },
  LOW: {
    badge: "border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]",
    icon: "bg-[#EFF6FF] text-[#2563EB]",
    Icon: CheckCircle2,
  },
};

export function AtsIssuesPanel({ issues }: { issues: AtsIssue[] }) {
  const hasIssues = issues.length > 0;

  return (
    <SurfaceCard className="p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
            ATS issues
          </h2>
          <p className="mt-1 text-sm leading-6 text-[#646378]">
            Resume parsing and screening issues found during this match.
          </p>
        </div>
        <span className="inline-flex h-8 items-center rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] px-3 text-xs font-semibold text-[#646378]">
          {issues.length} found
        </span>
      </div>

      {hasIssues ? (
        <div className="mt-5 grid gap-3">
          {issues.map((issue, index) => {
            const severity = severityStyles[issue.severity] ?? severityStyles.LOW;
            const Icon = severity.Icon;

            return (
              <article
                className="rounded-lg border border-[#E1E3EC] bg-white p-4 shadow-sm shadow-applytrack-ink/3"
                key={issue._id ?? `${issue.category}-${index}`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${severity.icon}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-applytrack-ink">
                        {issue.category}
                      </h3>
                      <span
                        className={`inline-flex h-7 items-center rounded-lg border px-2 text-xs font-semibold ${severity.badge}`}
                      >
                        {issue.severity}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#646378]">
                      {issue.message}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-[#D1FAE5] bg-[#F0FDF4] p-4">
          <p className="text-sm font-semibold text-[#047857]">
            No ATS issues detected.
          </p>
          <p className="mt-1 text-sm leading-6 text-[#646378]">
            The resume looks clean for parser readability in this analysis.
          </p>
        </div>
      )}
    </SurfaceCard>
  );
}
