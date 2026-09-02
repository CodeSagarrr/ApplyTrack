import { ArrowLeft, Save } from "lucide-react";
import type { FormEvent, RefObject } from "react";
import { Link } from "react-router-dom";
import { SurfaceCard } from "../../../components/ui/PagePrimitives";
import { ResumeUploadDropzone } from "./ResumeUploadDropzone";
import { ResumeVersionNameField } from "./ResumeVersionNameField";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";

export function ResumeEditForm({
  versionName,
  fileInputRef,
  error,
  isSaving,
  selectedFileName,
  onVersionNameChange,
  onBrowse,
  onFileSelected,
  onSubmit,
}: {
  versionName: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  error?: string;
  isSaving: boolean;
  selectedFileName?: string;
  onVersionNameChange: (value: string) => void;
  onBrowse: () => void;
  onFileSelected: (file?: File) => void;
  onSubmit: () => void;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <SurfaceCard className="p-5">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <ResumeVersionNameField value={versionName} onChange={onVersionNameChange} />
        <ResumeUploadDropzone
          error={error}
          inputRef={fileInputRef}
          onBrowse={onBrowse}
          onFileSelected={onFileSelected}
          selectedFileName={selectedFileName}
        />
        <div className="flex flex-col-reverse gap-3 border-t border-[#EEF0F5] pt-5 sm:flex-row sm:justify-end">
          <Link
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-applytrack-outline bg-white px-4 text-sm font-semibold text-applytrack-primary transition hover:border-applytrack-primary hover:bg-[#F5F4FF]"
            to="/resumes"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </Link>
          <button
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-applytrack-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#281BA8] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSaving}
            type="submit"
          >
            {isSaving ? <LoadingSpinner size="sm" label="Saving..." /> : <><Save className="h-4 w-4" /> Save</>}
          </button>
        </div>
      </form>
    </SurfaceCard>
  );
}
