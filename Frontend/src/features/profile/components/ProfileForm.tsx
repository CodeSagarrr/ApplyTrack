import React, { memo, useRef, useState } from "react";
import { Camera, Plus, X } from "lucide-react";
import type {
  ProfileFieldProps,
  ProfileSectionProps,
  ProfileTextareaProps,
} from "../../../types/ApiTypes";

const inputClass =
  "h-11 w-full rounded-lg border border-[#D8DBE5] bg-white px-3.5 text-sm text-applytrack-ink outline-none transition placeholder:text-[#8B8A9B] hover:border-[#BFC4D3] focus:border-applytrack-primary focus:ring-4 focus:ring-[#E2DFFF]";

export const ProfileSection = memo(function ProfileSection({
  children,
  title,
  description,
}: ProfileSectionProps) {
  return (
    <section className="rounded-xl border border-[#E1E3EC] bg-white p-5 sm:p-6">
      <div className="mb-5 border-b border-[#EEF0F5] pb-5">
        <h2 className="font-heading text-base font-semibold text-applytrack-ink">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-5 text-[#646378]">{description}</p>
      </div>
      {children}
    </section>
  );
});

export const ProfileField = memo(function ProfileField({
  icon: Icon,
  value,
  label,
  name,
  placeholder,
  type = "text",
  handleChange,
}: ProfileFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#343447]">
        {label}
      </span>
      <span className="relative block">
        {Icon ? (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77768A]" />
        ) : null}
        <input
          className={`${inputClass} ${Icon ? "pl-10" : ""}`}
          name={name}
          value={value}
          placeholder={placeholder}
          type={type}
          onChange={handleChange}
        />
      </span>
    </label>
  );
});

export const ProfileTextarea = memo(function ProfileTextarea({
  label,
  value,
  name,
  placeholder,
  handleChange,
}: ProfileTextareaProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#343447]">
        {label}
      </span>
      <textarea
        className="min-h-30 w-full resize-y rounded-lg border border-[#D8DBE5] bg-white px-3.5 py-3 text-sm leading-6 text-applytrack-ink outline-none transition placeholder:text-[#8B8A9B] hover:border-[#BFC4D3] focus:border-applytrack-primary focus:ring-4 focus:ring-[#E2DFFF]"
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </label>
  );
});

export const AvatarPicker = memo(function AvatarPicker({
  handleFilePreview,
  avatarPreview,
}: {
  handleFilePreview: (e: React.ChangeEvent<HTMLInputElement>) => void;
  avatarPreview: string | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-dashed border-applytrack-outline bg-applytrack-surface p-4 sm:flex-row sm:items-center">
      <div className="grid h-18 w-18 shrink-0 place-items-center overflow-hidden rounded-xl border border-[#D8DBE5] bg-white text-[#77768A]">
        <input
          type="file"
          name="profileImage"
          id="pimage"
          className="hidden"
          accept="image/jpeg,image/jpg,image/png,image/gif"
          ref={inputRef}
          onChange={handleFilePreview}
        />
        {avatarPreview ? (
          <img
            src={avatarPreview}
            alt="Avatar preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <Camera className="h-6 w-6" />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-applytrack-ink">
          Profile photo
        </p>
        <p className="mt-1 text-sm leading-5 text-[#646378]">
          Use a clear, professional image. JPG, PNG, or GIF accepted.
        </p>
        <button
          className="mt-3 inline-flex h-9 items-center rounded-lg border border-applytrack-outline bg-white px-3 text-sm font-semibold text-applytrack-primary transition hover:border-applytrack-primary hover:bg-[#F5F4FF]"
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          Choose image
        </button>
      </div>
    </div>
  );
});

export const SkillPreview = memo(function SkillPreview({
  onAddSkill,
  onRemoveSkill,
  value,
}: {
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
  value: string[];
}) {
  const [text, setText] = useState("");
  const addSkill = () => {
    const nextSkill = text.trim();
    if (!nextSkill || value.includes(nextSkill)) return;
    onAddSkill(nextSkill);
    setText("");
  };

  return (
    <div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[#343447]">
          Skills
        </span>
        <span className="flex gap-2">
          <input
            className={inputClass}
            onChange={(event) => setText(event.target.value)}
            value={text}
            name="skills"
            placeholder="Add a skill, for example React"
            type="text"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addSkill();
              }
            }}
          />
          <button
            className="inline-flex h-11 shrink-0 items-center gap-1 rounded-lg bg-applytrack-primary px-4 text-sm font-semibold text-white transition hover:bg-[#281BA8]"
            type="button"
            onClick={addSkill}
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </span>
      </label>
      {value.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {value.map((skill) => (
            <button
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#C9C6F5] bg-[#F5F4FF] px-3 text-xs font-medium text-applytrack-primary transition hover:border-applytrack-primary"
              key={skill}
              type="button"
              onClick={() => onRemoveSkill(skill)}
            >
              {skill}
              <X className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
