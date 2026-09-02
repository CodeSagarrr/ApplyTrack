import type { RefObject } from "react";

export function ResumeVersionNameField({
  inputRef,
  value,
  onChange,
}: {
  inputRef?: RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-[#77768A]">
        Version name
      </span>
      <input
        className="mt-2 h-11 w-full rounded-lg border border-[#E1E3EC] bg-white px-3 text-sm text-applytrack-ink outline-none transition placeholder:text-[#9A99A8] hover:border-applytrack-outline focus:border-applytrack-primary focus:ring-4 focus:ring-applytrack-primary/10"
        name="versionName"
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. Frontend Engineer - Stripe"
        ref={inputRef}
        required
        value={value}
      />
    </label>
  );
}
