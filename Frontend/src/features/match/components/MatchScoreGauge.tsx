import { Gauge, TrendingUp } from "lucide-react";

function scoreTone(score: number) {
  if (score >= 80) return "text-[#047857]";
  if (score >= 60) return "text-[#B45309]";
  return "text-[#B42318]";
}

export function MatchScoreGauge({
  score,
  label = "Match score",
}: {
  score: number;
  label?: string;
}) {
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (normalizedScore / 100) * circumference;

  return (
    <div className="rounded-lg border border-[#E1E3EC] bg-white p-5 shadow-sm shadow-applytrack-ink/3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#646378]">{label}</p>
          <p className={`mt-2 font-heading text-5xl font-semibold ${scoreTone(normalizedScore)}`}>
            {normalizedScore}
          </p>
        </div>
        <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#ECFDF5] text-[#047857]">
          <Gauge className="h-6 w-6" />
        </span>
      </div>

      <div className="mt-6 grid place-items-center">
        <div className="relative h-36 w-36">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128" role="img" aria-label={`${normalizedScore}% match score`}>
            <circle cx="64" cy="64" fill="none" r="54" stroke="#EEF0F5" strokeWidth="12" />
            <circle
              cx="64"
              cy="64"
              fill="none"
              r="54"
              stroke="#3525CD"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              strokeWidth="12"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="text-xs font-semibold uppercase text-[#77768A]">Coverage</p>
              <p className="mt-1 text-xl font-semibold text-applytrack-ink">{normalizedScore}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3">
        <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-applytrack-primary" />
        <p className="text-sm leading-6 text-[#646378]">
          Strong resumes usually land above 80 after role-specific keyword coverage and summary alignment are tightened.
        </p>
      </div>
    </div>
  );
}
