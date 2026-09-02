import { FileUp } from "lucide-react";

export function UploadIllustration() {
  return (
    <div className="relative h-28 w-36" aria-hidden="true">
      <div className="absolute left-3 top-4 h-20 w-24 rotate-[-5deg] rounded-lg border border-[#D8D4FF] bg-white shadow-sm" />
      <div className="absolute left-8 top-0 h-24 w-24 rounded-lg border border-[#E1E3EC] bg-applytrack-surface shadow-md shadow-applytrack-ink/5">
        <div className="m-3 h-2 rounded bg-applytrack-primary/20" />
        <div className="mx-3 mt-3 h-2 w-14 rounded bg-applytrack-outline" />
        <div className="mx-3 mt-2 h-2 w-16 rounded bg-[#E1E3EC]" />
        <div className="mx-3 mt-2 h-2 w-10 rounded bg-[#E1E3EC]" />
      </div>
      <div className="absolute bottom-1 right-4 grid h-11 w-11 place-items-center rounded-lg bg-applytrack-primary text-white shadow-lg shadow-applytrack-primary/20">
        <FileUp className="h-5 w-5" />
      </div>
    </div>
  );
}