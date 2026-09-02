import { Lightbulb } from "lucide-react";
import type { ISuggestions } from "../pages/MatchToolPage";

export type SuggestionStatus = "pending" | "accepted" | "editing" | "rejected";


export function SuggestionCard({
  suggestion,
}: {
  suggestion: ISuggestions;
}) {

  return (
    <article className="rounded-lg border border-[#E1E3EC] bg-white p-4 shadow-sm shadow-applytrack-ink/3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#F5F4FF] text-applytrack-primary">
              <Lightbulb className="h-4 w-4" />
            </span>
            <h3 className="text-sm font-semibold text-applytrack-ink">{suggestion.title}</h3>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#646378]">{suggestion.impact}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3">
          <p className="text-xs font-semibold uppercase text-[#77768A]">Current wording</p>
          <p className="mt-2 text-sm leading-6 text-[#343447]">{suggestion.current}</p>
        </div>
        <div className="rounded-lg border border-[#D8D4FF] bg-[#F8F7FF] p-3">
          <p className="text-xs font-semibold uppercase text-[#77768A]">Suggested wording</p>
            <p className="mt-2 text-sm leading-6 text-[#343447]">{suggestion.suggested}</p>
        </div>
      </div>
    </article>
  );
}
