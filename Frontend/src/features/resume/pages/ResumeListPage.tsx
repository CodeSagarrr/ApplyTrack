import { useCallback, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  FileUp,
  Plus,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import {
  PageHeader,
  SurfaceCard,
} from "../../../components/ui/PagePrimitives";
import { appendFormData } from "../../../utils/HelperFunctions";
import {
  deleteResumeMutation,
  getResume,
  updateResumeStatusMutation,
  uploadResumeMutation,
} from "../../../hooks/resume/useResume";
import { queryClient } from "../../../lib/queryClient";
import type { ResumeProps } from "../../../types/ApiTypes";
import { ResumeCard } from "../components/ResumeCard";
import {
  ResumeUploadDropzone,
  validateResumeFile,
} from "../components/ResumeUploadDropzone";
import { ResumeVersionNameField } from "../components/ResumeVersionNameField";
import { UploadIllustration } from "../components/UplloadIllustration";

const VERSION_NAME_REQUIRED =
  "Version name is required before uploading a resume.";

function VersionHealthCard({ resumes }: { resumes: ResumeProps[] }) {
  const defaultResume =
    resumes.find((resume) => resume.isDefault)?.fileName ?? "Not set";

  return (
    <SurfaceCard className="p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
            Version health
          </h2>
          <p className="mt-1 text-sm text-[#646378]">
            Your default resume is ready for high-match roles.
          </p>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#ECFDF5] text-[#047857]">
          <ShieldCheck className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-5 grid gap-3">
        {[
          ["All resume versions", `${resumes.length}`],
          ["Default", defaultResume],
        ].map(([label, value]) => (
          <div
            className="flex items-center justify-between gap-3 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3"
            key={label}
          >
            <span className="text-sm text-[#646378]">{label}</span>
            <span className="max-w-36 truncate text-sm font-semibold text-applytrack-ink">
              {value}
            </span>
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
}



function RecommendedChecksCard() {
  return (
    <SurfaceCard className="p-5">
      <h2 className="font-heading text-lg font-semibold text-applytrack-ink">
        Recommended checks
      </h2>
      <div className="mt-4 space-y-3">
        {[
          "Keyword coverage above 85%",
          "Single-column formatting",
          "Work dates parsed clearly",
        ].map((item) => (
          <div className="flex items-center gap-3" key={item}>
            <CheckCircle2 className="h-4 w-4 text-[#047857]" />
            <p className="text-sm text-[#646378]">{item}</p>
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
}

export default function ResumeListPage() {
  const uploadMutation = uploadResumeMutation();
  const updateMutation = updateResumeStatusMutation();
  const deleteMutation = deleteResumeMutation();
  const { Resumes } = getResume();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const versionNameRef = useRef<HTMLInputElement | null>(null);
  const [resumes, setResumes] = useState<ResumeProps[]>([]);
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [versionName, setVersionName] = useState("");
  const [visibleDeleteButton, setVisibleDeleteButton] = useState(false);
  const [error, setError] = useState("");

  useMemo(() => {
    if (Resumes?.data) setResumes(Resumes.data);
  }, [Resumes])


  function triggerFileInput() {
    if (!versionName.trim()) {
      setError(VERSION_NAME_REQUIRED);
      versionNameRef.current?.focus();
      return;
    }

    inputRef.current?.click();
  }

  const handleCreateResume = useCallback(
    (file: File, uploadVersionName: string) => {
      const formData = new FormData() as any;
      appendFormData(formData, { versionName: uploadVersionName, file });

      uploadMutation.mutate(formData, {
        onSuccess() {
          toast.success("Resume uploaded successfully.");
          setVersionName("");
          setUploadProgress(0);
          setIsAnalyzing(false);
          queryClient.invalidateQueries({ queryKey: ["resumes"] });
        },
        onError(error) {
          const err = error as AxiosError<{ message: string }>;
          toast.error(err.response?.data.message || "Unable to upload resume. Please try again.");
          setUploadProgress(0);
          setIsAnalyzing(false);
        },
      });
    },
    [uploadMutation],
  );

  const handleDelete =
    (id: string , force : boolean = false) => {
      deleteMutation.mutate(
        { id, force },
        {
          onSuccess() {
            toast.success("Resume deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["resumes"] });
            setVisibleDeleteButton(false);
          },
          onError(error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data.message || "Unable to delete resume. Please try again.");
            setUploadProgress(0);
            if (err.status === 409) {
              setVisibleDeleteButton(true);
            }
            setIsAnalyzing(false);
          },
        },
      );
    }

  function handleFile(file?: File) {
    if (!file) return;

    const uploadVersionName = versionName.trim();
    if (!uploadVersionName) {
      setError(VERSION_NAME_REQUIRED);
      versionNameRef.current?.focus();
      return;
    }

    const validationError = validateResumeFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setUploadProgress(18);
    setIsAnalyzing(false);

    window.setTimeout(() => setUploadProgress(54), 300);
    window.setTimeout(() => {
      setUploadProgress(100);
      setIsAnalyzing(true);
    }, 850);
    handleCreateResume(file, uploadVersionName);
  }

  function handleUpdateStatus(id: string) {
    updateMutation.mutate(id, {
      onSuccess() {
        toast.success("Default resume updated successfully.");
        queryClient.invalidateQueries({ queryKey: ["resumes"] });
      },
      onError(error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message || "Unable to update default resume. Please try again.");
      },
    });
  }

  function toggleCompare(id: string) {
    setSelectedCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      return [...current.slice(-1), id];
    });
  }

  return (
    <div className="min-h-svh">
      <PageHeader
        actions={
          <>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-applytrack-primary px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#281BA8]"
              onClick={triggerFileInput}
              type="button"
            >
              <Plus className="h-4 w-4" />
              Upload resume
            </button>
          </>
        }
        description="Upload, compare, and tune multiple resume versions before attaching them to applications."
        eyebrow="Resumes"
        title="Manage resume versions"
      />

      <div className="grid gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
        <div className="space-y-5">
          <SurfaceCard className="p-5">
            <div className="mb-4">
              <ResumeVersionNameField
                inputRef={versionNameRef}
                value={versionName}
                onChange={(value) => {
                  setVersionName(value);
                  if (error === VERSION_NAME_REQUIRED) setError("");
                }}
              />
            </div>
            <ResumeUploadDropzone
              error={error}
              inputRef={inputRef}
              isAnalyzing={isAnalyzing}
              onBrowse={triggerFileInput}
              onFileSelected={handleFile}
              uploadProgress={uploadProgress}
            />
          </SurfaceCard>

          {resumes.length === 0 ? (
            <div className="flex flex-col items-center rounded-lg border border-dashed border-applytrack-outline bg-[#FAFBFF] px-4 py-10 text-center">
              <UploadIllustration />
              <h3 className="mt-5 text-base font-semibold text-applytrack-ink">
                No resume versions yet
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#646378]">
                Upload your first resume to get started
              </p>
              <div className="mt-5">
                <button
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-applytrack-primary px-4 text-sm font-semibold text-white transition hover:bg-[#281BA8]"
                  onClick={triggerFileInput}
                  type="button"
                >
                  <FileUp className="h-4 w-4" />
                  Upload resume
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {resumes.map((resume) => (
                <ResumeCard
                  visibleDeleteButton={visibleDeleteButton}
                  isDeleteing={() =>
                    resume._id === deleteMutation.variables?.id &&
                    deleteMutation.isPending
                  }
                  isSetDefaultPending={() =>
                    resume._id === updateMutation.variables &&
                    updateMutation.isPending
                  }
                  key={resume._id}
                  onCompare={() => toggleCompare(resume._id)}
                  onDelete={(id : string, force : boolean) => handleDelete(id, force)}
                  onSetDefault={() => handleUpdateStatus(resume._id)}
                  resume={resume}
                  selected={selectedCompareIds.includes(resume._id)}
                />
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <VersionHealthCard resumes={resumes} />
          <RecommendedChecksCard />
        </aside>
      </div>
    </div>
  );
}
