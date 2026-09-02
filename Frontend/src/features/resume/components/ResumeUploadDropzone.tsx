import { FileUp, Loader2 } from "lucide-react";
import type { ChangeEvent, DragEvent, RefObject } from "react";

export const MAX_RESUME_FILE_SIZE = 5 * 1024 * 1024;
export const RESUME_ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const RESUME_ACCEPT_ATTRIBUTE =
  ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export function validateResumeFile(file: File) {
  const name = file.name.toLowerCase();
  const isPdf = file.type === "application/pdf" || name.endsWith(".pdf");
  const isDocx = name.endsWith(".docx");

  if (!isPdf && !isDocx && !RESUME_ACCEPTED_TYPES.includes(file.type)) {
    return "Only PDF or DOCX files can be uploaded.";
  }

  if (file.size > MAX_RESUME_FILE_SIZE) {
    return "Resume files must be 5MB or smaller.";
  }

  return "";
}

export function ResumeUploadDropzone({
  inputRef,
  error,
  uploadProgress = 0,
  isAnalyzing = false,
  selectedFileName,
  onBrowse,
  onFileSelected,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
  error?: string;
  uploadProgress?: number;
  isAnalyzing?: boolean;
  selectedFileName?: string;
  onBrowse: () => void;
  onFileSelected: (file?: File) => void;
}) {
  function handleDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    onFileSelected(event.dataTransfer.files?.[0]);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onFileSelected(event.target.files?.[0]);
    event.target.value = "";
  }

  return (
    <div>
      <input
        accept={RESUME_ACCEPT_ATTRIBUTE}
        className="sr-only"
        name="file"
        onChange={handleChange}
        ref={inputRef}
        type="file"
      />
      <button
        className="flex min-h-52 w-full flex-col items-center justify-center rounded-lg border border-dashed border-applytrack-outline bg-[#FAFBFF] px-5 py-8 text-center transition hover:border-applytrack-primary hover:bg-[#F5F4FF]"
        onClick={onBrowse}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        type="button"
      >
        <span className="grid h-14 w-14 place-items-center rounded-lg bg-white text-applytrack-primary shadow-sm">
          <FileUp className="h-7 w-7" />
        </span>
        <span className="mt-4 text-base font-semibold text-applytrack-ink">
          Drop a PDF or DOCX resume here
        </span>
        <span className="mt-2 text-sm text-[#646378]">
          Maximum file size 5MB. ATS analysis starts automatically after upload.
        </span>
      </button>

      {selectedFileName ? (
        <div className="mt-3 rounded-lg border border-[#E1E3EC] bg-white px-3 py-2 text-sm">
          <span className="font-semibold text-applytrack-ink">Selected file: </span>
          <span className="text-[#646378]">{selectedFileName}</span>
        </div>
      ) : null}

      {error ? <p className="mt-3 text-sm font-medium text-[#DC2626]">{error}</p> : null}

      {uploadProgress > 0 ? (
        <div className="mt-4 rounded-lg border border-[#E1E3EC] bg-white p-4">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-semibold text-applytrack-ink">
              {isAnalyzing ? "Analyzing resume..." : "Uploading resume..."}
            </span>
            <span className="text-[#646378]">{uploadProgress}%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EEF0F5]">
            <span
              className="block h-full rounded-full bg-applytrack-primary transition-all duration-500"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          {isAnalyzing ? (
            <div className="mt-3 flex items-center gap-2 text-sm text-[#646378]">
              <Loader2 className="h-4 w-4 animate-spin text-applytrack-primary" />
              Checking parsing quality, keyword coverage, and formatting signals.
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
