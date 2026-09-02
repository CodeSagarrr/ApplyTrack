import { memo, type ComponentType } from "react";
import type { InputOption } from "../../../types/ApiTypes";
import { SurfaceCard } from "../../../components/ui/PagePrimitives";
import { VscEditSparkle } from "react-icons/vsc";
import { BriefcaseBusiness, CheckCircle2, GraduationCap, MapPin, Phone, UserRound } from "lucide-react";

const visibleLinkLabels = {
  github: "GitHub",
  linkedin: "LinkedIn",
  portfolio: "Portfolio",
  twitter: "Twitter",
  leetcode: "LeetCode",
}

const PreviewRow = memo(function PreviewRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-applytrack-primary" />
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase text-[#77768A]">
          {label}
        </p>
        <p className="mt-1 wrap-break-word text-sm font-semibold text-applytrack-ink">
          {value || "Not added yet"}
        </p>
      </div>
    </div>
  );
});

export const ProfilePreview = memo(function ProfilePreview({
  data,
  avatarPreview,
}: {
  data: InputOption;
  avatarPreview: string | null;
}) {
  const location = [
    data.location.city,
    data.location.state,
    data.location.country,
  ]
    .filter(Boolean)
    .join(", ");
  const activeLinks = Object.entries(data.socialLinks).filter(([, value]) =>
    value.trim(),
  );
  const completionItems = [
    data.headline,
    data.preferredRole,
    data.about,
    location,
    data.skills.length ? "skills" : "",
  ];
  const completion = Math.round(
    (completionItems.filter(Boolean).length / completionItems.length) * 100,
  );

  return (
    <aside className="lg:sticky lg:top-6">
      <SurfaceCard className="overflow-hidden">
        <div className="border-b border-[#EEF0F5] bg-[#FAFBFF] px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-applytrack-primary">
                Live profile
              </p>
              <h2 className="mt-1 font-heading text-lg font-semibold text-applytrack-ink">
                Candidate preview
              </h2>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#D8D4FF] bg-[#F5F4FF]">
              <VscEditSparkle className="h-5 w-5 text-applytrack-primary" />
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-lg border border-[#E1E3EC] bg-[#FAFBFF]">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Candidate profile preview"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <UserRound className="h-8 w-8 text-[#77768A]" />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-heading text-xl font-semibold leading-tight text-applytrack-ink">
                {data.preferredRole || "Your preferred role"}
              </p>
              <p className="mt-2 text-sm leading-5 text-[#646378]">
                {data.headline || "Add a headline to introduce your profile."}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-[#646378]">
                Profile strength
              </span>
              <span className="text-sm font-semibold text-applytrack-ink">
                {completion}%
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EEF0F5]">
              <div
                className="h-full rounded-full bg-applytrack-primary transition-[width] duration-300"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <PreviewRow icon={MapPin} label="Location" value={location} />
            <PreviewRow icon={Phone} label="Phone" value={data.phone} />
            <PreviewRow
              icon={GraduationCap}
              label="College"
              value={data.collegeName}
            />
            <PreviewRow
              icon={BriefcaseBusiness}
              label="Experience"
              value={`${data.yearsOfExperience || 0} year${data.yearsOfExperience === 0 ? "" : "s"}`}
            />
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase text-[#77768A]">
              About
            </p>
            <p className="mt-2 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3 text-sm leading-6 text-[#646378]">
              {data.about || "Your summary will appear here as you type."}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase text-[#77768A]">
              Skills
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.skills.length ? (
                data.skills.map((skill) => (
                  <span
                    className="inline-flex h-8 items-center rounded-full border border-[#C9C6F5] bg-[#F5F4FF] px-3 text-xs font-semibold text-applytrack-primary"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-[#646378]">
                  Add skills to improve matching.
                </span>
              )}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase text-[#77768A]">
              Public links
            </p>
            <div className="mt-3 grid gap-2">
              {activeLinks.length ? (
                activeLinks.map(([key]) => (
                  <div
                    className="flex items-center gap-2 text-sm font-medium text-[#646378]"
                    key={key}
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#047857]" />
                    {visibleLinkLabels[key as keyof typeof visibleLinkLabels]}
                  </div>
                ))
              ) : (
                <span className="text-sm text-[#646378]">
                  No social links added yet.
                </span>
              )}
            </div>
          </div>
        </div>
      </SurfaceCard>
    </aside>
  );
});
