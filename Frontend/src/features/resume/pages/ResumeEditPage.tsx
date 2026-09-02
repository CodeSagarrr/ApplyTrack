import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  PageHeader,
  StatusBadge,
  SurfaceCard,
} from "../../../components/ui/PagePrimitives";
import {
  getResume,
  updateResumeDetailsMutation,
} from "../../../hooks/resume/useResume";
import type { ResumeProps } from "../../../types/ApiTypes";
import { ResumeEditForm } from "../components/ResumeEditForm";
import { validateResumeFile } from "../components/ResumeUploadDropzone";
import { appendFormData } from "../../../utils/HelperFunctions";
import type { AxiosError } from "axios";
import { queryClient } from "../../../lib/queryClient";

function formatDate(value?: string) {
  if (!value) return "Not available";
  return new Date(value).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ResumeEditPage() {
  const { id } = useParams();
  const updateMutaion = updateResumeDetailsMutation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { Resumes } = getResume();
  const resume = useMemo(
    () => Resumes?.data?.find((item: ResumeProps) => item._id === id),
    [Resumes, id],
  );
  const [versionName, setVersionName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (resume) setVersionName(resume.versionName || resume.fileName);
  }, [resume]);

  function handleFileSelected(file?: File) {
    if (!file) return;

    const validationError = validateResumeFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSelectedFile(file);
  }

  function handleSave() {
    const data = new FormData() as any;
    appendFormData(data, { versionName, file : selectedFile });
    // mutate expects the resume id (string) as the variable parameter
    updateMutaion.mutate(
      { id, payLoad: data },
      {
        onSuccess() {
          toast.success("Resume updated successfully.");
          queryClient.invalidateQueries({ queryKey: ["resumes"] });
          navigate("/resumes");
        },
        onError(error) {
          const err = error as AxiosError<{ message: string }>;
          toast.error(err.response?.data.message || "Unable to update resume. Please try again.");
        },
      },
    );
  }

  return (
    <div className="min-h-svh">
      <PageHeader
        actions={
          <Link
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-applytrack-outline bg-white px-3 text-sm font-semibold text-applytrack-primary transition hover:border-applytrack-primary hover:bg-[#F5F4FF]"
            to="/resumes"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        }
        description="Update the resume file and version label while keeping list management on its own page."
        eyebrow="Resume Edit"
        title="Edit resume version"
      />

      <div className="grid gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8">
        <main>
          <ResumeEditForm
            error={error}
            fileInputRef={fileInputRef}
            isSaving={updateMutaion.isPending}
            onBrowse={() => fileInputRef.current?.click()}
            onFileSelected={handleFileSelected}
            onSubmit={handleSave}
            onVersionNameChange={(value) => {
              setVersionName(value);
            }}
            selectedFileName={selectedFile?.name}
            versionName={versionName}
          />
        </main>

        <aside className="space-y-5">
          <SurfaceCard className="p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#F5F4FF] text-applytrack-primary">
                <FileText className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate font-heading text-lg font-semibold text-applytrack-ink">
                  {resume?.versionName || resume?.fileName || "Resume version"}
                </h2>
                <p className="mt-1 text-sm text-[#646378]">
                  Updated {formatDate(resume?.updatedAt)}
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <div className="flex items-center justify-between gap-3 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3">
                <span className="text-sm text-[#646378]">ATS score</span>
                <StatusBadge tone="blue">{resume?.ats_score ?? 0}</StatusBadge>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3">
                <span className="text-sm text-[#646378]">Default</span>
                <span className="text-sm font-semibold text-applytrack-ink">
                  {resume?.isDefault ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </SurfaceCard>
        </aside>
      </div>
    </div>
  );
}
