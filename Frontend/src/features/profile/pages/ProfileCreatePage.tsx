import {
  ArrowLeft,
  BriefcaseBusiness,
  GraduationCap,
  Link as LinkIcon,
  MapPin,
  Phone,
  UserRound,
} from 'lucide-react'
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { TbBrandLeetcode } from "react-icons/tb";
import { useNavigate } from 'react-router-dom'
import {
  AvatarPicker,
  ProfileField,
  ProfileSection,
  ProfileTextarea,
  SkillPreview,
} from '../components/ProfileForm'
import { ProfilePreview } from '../components/ProfilePreview';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useUserProfile, getProfileserverData } from '../../../hooks/profile/useProfile';
import { appendFormData, isEmpty } from '../../../utils/HelperFunctions';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import {
  PageHeader,
  StatusBadge,
} from '../../../components/ui/PagePrimitives';
import type { InputOption } from '../../../types/ApiTypes';



const EMPTY_PROFILE_INPUT: InputOption = {
  headline: "",
  collegeName: "",
  phone: "",
  preferredRole: "",
  about: "",
  location: {
    city: "",
    state: "",
    country: "",
  },
  socialLinks: {
    github: "",
    linkedin: "",
    portfolio: "",
    twitter: "",
    leetcode: "",
  },
  skills: [],
  yearsOfExperience: 0,
}

const getInputOption = (profileData?: Partial<InputOption> & {
  yearsOfExperience?: string | number;
}): InputOption => ({
  headline: profileData?.headline ?? "",
  collegeName: profileData?.collegeName ?? "",
  phone: profileData?.phone ?? "",
  preferredRole: profileData?.preferredRole ?? "",
  about: profileData?.about ?? "",
  location: {
    city: profileData?.location?.city ?? "",
    state: profileData?.location?.state ?? "",
    country: profileData?.location?.country ?? "",
  },
  socialLinks: {
    github: profileData?.socialLinks?.github ?? "",
    linkedin: profileData?.socialLinks?.linkedin ?? "",
    portfolio: profileData?.socialLinks?.portfolio ?? "",
    twitter: profileData?.socialLinks?.twitter ?? "",
    leetcode: profileData?.socialLinks?.leetcode ?? "",
  },
  skills: profileData?.skills ?? [],
  yearsOfExperience:profileData?.yearsOfExperience ?? 0,
})

export function ProfileCreatePage() {
  const Mutation = useUserProfile();
  const { profile } = getProfileserverData();
  const [inputData, setInputData] = useState<InputOption>(EMPTY_PROFILE_INPUT);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate()
  const serverInputOption = useMemo(() => getInputOption(profile?.data), [profile]);

  useEffect(() => {
    if (!profile) return;

    queueMicrotask(() => {
      setInputData(serverInputOption);
      if (profile.data.profileImage) {
        setAvatarPreview(profile.data.profileImage)
      }
    })
  }, [profile, serverInputOption]);

  useEffect(() => {
    return () => {
      if (avatarPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview)
      }
    }
  }, [avatarPreview]);

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/')
  }

  const handleChangeFormData = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((current) => ({
      ...current,
      [name]: value
    }));
  }, []);

  const handleFilePreview = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (image) {
      setFile(image)
      setAvatarPreview(URL.createObjectURL(image))
    }
  }, [])

  const canSave = useMemo(() => !(isEmpty(inputData) && file === null), [inputData, file]);

  const addSkill = useCallback((skill: string) => {
    setInputData((current) => ({
      ...current,
      skills: [...current.skills, skill],
    }))
  }, [])

  const removeSkill = useCallback((skill: string) => {
    setInputData((current) => ({
      ...current,
      skills: current.skills.filter((currentSkill) => currentSkill !== skill),
    }))
  }, [])

  const handleSubmitProfileData = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = new FormData();
    appendFormData(data, inputData)
    if (file) {
      data.append("profileImage", file)
    }

    Mutation.mutate(data as unknown as Parameters<typeof Mutation.mutate>[0], {
      onSuccess() {
        toast.success("Profile updated successfully.")
      },
      onError(error) {
        const err = error as AxiosError<{ message: string }>
        toast.error(err.response?.data.message || "Unable to update profile. Please try again.")
      }
    })
  }, [Mutation, inputData, file])

  return (
    <main className="min-h-svh font-sans">
      <PageHeader
        eyebrow="Profile"
        title="Build a clean candidate profile"
        description="Keep the information sharp, searchable, and ready for resume and job matching workflows."
        actions={
          <>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-applytrack-outline bg-white px-3 text-sm font-semibold text-applytrack-primary transition hover:border-applytrack-primary hover:bg-[#F5F4FF]"
              onClick={goBack}
              type="button"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-applytrack-primary px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#281BA8] disabled:cursor-not-allowed disabled:opacity-70"
              type="button"
              disabled={!canSave}
              onClick={handleSubmitProfileData}
            >
              {Mutation.isPending ? <LoadingSpinner size='md' label='Updating' tone="white" /> : "Save profile"}
            </button>
          </>
        }
      />

      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-5">
          <StatusBadge tone="purple">
            <span className="inline-flex items-center gap-1.5">
              <UserRound className="h-3.5 w-3.5" />
              Candidate profile setup
            </span>
          </StatusBadge>
        </div>

        <form className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
          <div className="space-y-5">
            <ProfileSection title="Profile image" description="Upload a clean candidate photo for the profile preview.">
              <AvatarPicker handleFilePreview={handleFilePreview} avatarPreview={avatarPreview} />
            </ProfileSection>

            <ProfileSection
              title="Basic details"
              description="Add the core information that should appear at the top of the profile."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <ProfileField
                  value={inputData.headline ?? ""}
                  icon={BriefcaseBusiness}
                  label="Headline"
                  name="headline"
                  placeholder="Frontend Developer | MERN Stack"
                  handleChange={handleChangeFormData}
                />
                <ProfileField
                  icon={GraduationCap}
                  value={inputData.collegeName ?? ""}
                  label="College name"
                  name="collegeName"
                  placeholder="Your college or university"
                  handleChange={handleChangeFormData}
                />
                <ProfileField icon={Phone} label="Phone" name="phone" placeholder="+91 98765 43210" type="tel" handleChange={handleChangeFormData} value={inputData.phone ?? ""} />
                <ProfileField
                  icon={BriefcaseBusiness}
                  value={inputData.preferredRole}
                  label="Preferred role"
                  name="preferredRole"
                  placeholder="Software Engineer Intern"
                  handleChange={handleChangeFormData}
                />
              </div>

              <div className="mt-4">
                <ProfileTextarea
                value={inputData.about ?? ""}
                  label="About"
                  name="about"
                  placeholder="Write a concise summary of your background, strengths, and career focus."
                  handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputData({ ...inputData, about: e.target.value })}
                />
              </div>
            </ProfileSection>

            <ProfileSection title="Location" description="Use simple location details for profile matching and filtering.">
              <div className="grid gap-4 md:grid-cols-3">
                <ProfileField value={inputData?.location.city ?? ""} icon={MapPin} label="City" name="city" placeholder="Bengaluru" handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputData({ ...inputData, location: { ...inputData.location, city: e.target.value } })} />

                <ProfileField value={inputData.location.state ?? ""} label="State" name="state" placeholder="Karnataka" handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputData({ ...inputData, location: { ...inputData.location, state: e.target.value } })} />

                <ProfileField value={inputData.location.country ?? ""} label="Country" name="country" placeholder="India" handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputData({ ...inputData, location: { ...inputData.location, country: e.target.value } })} />
              </div>
            </ProfileSection>

            <ProfileSection title="Social links" description="Add public profiles that help validate work and activity.">
              <div className="grid gap-4 md:grid-cols-2">
                <ProfileField value={inputData.socialLinks.github ?? ""} icon={FaGithub} label="GitHub" name="github" placeholder="https://github.com/username" handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputData({ ...inputData, socialLinks: { ...inputData.socialLinks, github: e.target.value } })} />
                <ProfileField
                  icon={FaLinkedin}
                  value={inputData.socialLinks.linkedin ?? ""}
                  label="LinkedIn"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/username"
                  handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputData({ ...inputData, socialLinks: { ...inputData.socialLinks, linkedin: e.target.value } })}
                />
                <ProfileField value={inputData.socialLinks.portfolio ?? ""} icon={LinkIcon} label="Portfolio" name="portfolio" placeholder="https://yourdomain.dev" handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputData({ ...inputData, socialLinks: { ...inputData.socialLinks, portfolio: e.target.value } })} />

                <ProfileField value={inputData.socialLinks.twitter ?? ""} icon={FaXTwitter} label="Twitter" name="twitter" placeholder="https://twitter.com/username" handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputData({ ...inputData, socialLinks: { ...inputData.socialLinks, twitter: e.target.value } })} />

                <ProfileField value={inputData.socialLinks.leetcode ?? ""} icon={TbBrandLeetcode} label="LeetCode" name="leetcode" placeholder="https://leetcode.com/username" handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputData({ ...inputData, socialLinks: { ...inputData.socialLinks, leetcode: e.target.value } })} />
              </div>
            </ProfileSection>

            <ProfileSection title="Experience" description="Capture seniority and searchable technical keywords.">
              <div className="space-y-4">
                <ProfileField
                  value={inputData.yearsOfExperience}
                  label="Years of experience"
                  name="yearsOfExperience"
                  placeholder="0"
                  type="number"
                  handleChange={handleChangeFormData}
                />
                <SkillPreview onAddSkill={addSkill} onRemoveSkill={removeSkill} value={inputData.skills ?? []}/>
              </div>
            </ProfileSection>
          </div>

          <ProfilePreview data={inputData} avatarPreview={avatarPreview} />
        </form>
      </div>
    </main>
  )
}
