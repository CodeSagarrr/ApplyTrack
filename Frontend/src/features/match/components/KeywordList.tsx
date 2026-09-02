import { CheckCircle2, CircleAlert } from "lucide-react";
import { SurfaceCard } from "../../../components/ui/PagePrimitives";

export function KeywordList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "matched" | "missing";
}) {
  const isMatched = tone === "matched";
  const Icon = isMatched ? CheckCircle2 : CircleAlert;
  const chipClass = isMatched
    ? "border-[#BDEFD8] bg-[#ECFDF5] text-[#047857]"
    : "border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]";

  return (
    <SurfaceCard className="p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold text-applytrack-ink">{title}</h2>
        <span className={`grid h-9 w-9 place-items-center rounded-lg ${isMatched ? "bg-[#ECFDF5] text-[#047857]" : "bg-[#FFFBEB] text-[#B45309]"}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${chipClass}`} key={item}>
            {item}
          </span>
        ))}
      </div>
    </SurfaceCard>
  );
}
