import { Loader2, SearchCheck } from "lucide-react";
import { SkeletonBlock, SurfaceCard } from "../../../components/ui/PagePrimitives";

const steps = ["Analyzing keywords...", "Comparing against your resume...", "Preparing rewrite suggestions..."];

export function MatchLoadingState({ activeStep }: { activeStep: number }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <SurfaceCard className="p-5">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#F5F4FF] text-applytrack-primary">
            <Loader2 className="h-5 w-5 animate-spin" />
          </span>
          <div>
            <h2 className="font-heading text-lg font-semibold text-applytrack-ink">Running match analysis</h2>
            <p className="mt-1 text-sm leading-6 text-[#646378]">{steps[activeStep % steps.length]}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {steps.map((step, index) => (
            <div className="grid grid-cols-[auto_1fr] items-center gap-3" key={step}>
              <span className={`grid h-7 w-7 place-items-center rounded-lg text-xs font-semibold ${index <= activeStep ? "bg-applytrack-primary text-white" : "bg-[#EEF0F5] text-[#77768A]"}`}>
                {index + 1}
              </span>
              <div className="h-2 overflow-hidden rounded-full bg-[#EEF0F5]">
                <span
                  className="block h-full rounded-full bg-applytrack-primary transition-all duration-500"
                  style={{ width: index < activeStep ? "100%" : index === activeStep ? "68%" : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard className="p-5">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#EEF7FF] text-applytrack-secondary">
          <SearchCheck className="h-5 w-5" />
        </span>
        <h2 className="mt-4 font-heading text-lg font-semibold text-applytrack-ink">Expected wait</h2>
        <p className="mt-1 text-sm leading-6 text-[#646378]">Most match jobs take 15-30 seconds once the JD and resume version are selected.</p>
        <div className="mt-5">
          <SkeletonBlock rows={3} />
        </div>
      </SurfaceCard>
    </div>
  );
}
