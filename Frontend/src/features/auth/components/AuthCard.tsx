import type { ComponentType, ReactNode } from 'react'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner'
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google"
import { useGoogleLogin } from "../../../hooks/auth/useAuth"
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'

type AuthCardProps = {
  title: string
  children: ReactNode
  submitLabel: string
  footerText: string
  footerLink: string
  footerLabel: string
  submitButtonLabel?: string
  submitFormData: (e: React.SubmitEvent<HTMLFormElement>) => void
  isPending: boolean
  logintext : "signin_with" | "signup_with" | "continue_with" | "signin" | undefined
}

type AuthFieldProps = {
  icon: ComponentType<{ className?: string }>
  label: string
  name: string
  placeholder: string
  type: string
  autoComplete: string
  handleChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export const AuthField = React.memo(({ icon: Icon, label, name, placeholder, type, autoComplete, handleChangeValue }: AuthFieldProps) => {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#FAFAFA]">{label}</span>
      <span className="relative block">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1A1AA]" />
        <input
          className="h-12 w-full rounded-2xl border border-[#27272A] bg-[#09090B]/80 pl-12 pr-4 text-sm text-[#FAFAFA] outline-none transition placeholder:text-[#71717A] focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/15"
          name={name}
          placeholder={placeholder}
          type={type}
          autoComplete={autoComplete}
          onChange={handleChangeValue}
        />
      </span>
    </label>
  )
})

export const AuthCard = ({
  title,
  children,
  submitLabel,
  footerText,
  footerLink,
  footerLabel,
  submitButtonLabel,
  submitFormData,
  isPending,
  logintext,
}: AuthCardProps) => {

  const Mutation = useGoogleLogin();
  const GoogleLoginSuccess = (credentialResponse: CredentialResponse) => {

    Mutation.mutate(credentialResponse.credential as string, {
      onSuccess() {
        toast.success("Sign-in successful. Welcome.")
        navigation.navigate("/")
      },
      onError(error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Sign-in failed. Please try again.")
      },
    })

  }

  return (
    <div className="mx-auto w-full max-w-110">
      <form
        className="rounded-3xl border border-[#27272A] bg-[#18181B]/92 p-6 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-8"
        onSubmit={submitFormData}
      >
        <h2 className="font-heading text-xl font-semibold text-[#FAFAFA]">{title}</h2>

        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <GoogleLogin onSuccess={GoogleLoginSuccess} text={logintext}/>

          <button
            className=" cursor-pointer inline-flex h-10 min-w-45 items-center justify-between gap-2 rounded border border-[#dadce0] bg-white px-2 font-normal leading-5 shadow-none transition hover:bg-[#f8fafd] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20"
            onClick={() => {
              window.location.href =
                "http://localhost:8080/api/auth/github";
            }}
          >
            <FaGithub className="h-5 w-5 text-[#24292f]" />
            <span className="whitespace-nowrap pr-2 text-[14px] text-[#3c4043]">{logintext === "signin_with" ? "Sign in" : "Sign up"} with Github</span>
          </button>
        </div>

        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#A1A1AA]">
          <span className="h-px bg-[#27272A]" />
          or email
          <span className="h-px bg-[#27272A]" />
        </div>

        <div className="space-y-4">{children}</div>

        <button
          className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-[#6366F1] text-sm font-semibold text-white shadow-[0_16px_44px_rgba(99,102,241,0.32)] transition hover:-translate-y-0.5 hover:bg-[#5558E8] focus:outline-none focus:ring-4 focus:ring-[#6366F1]/25 disabled:cursor-not-allowed disabled:opacity-80"
          type="submit"
        >
          {isPending ? <LoadingSpinner size="sm" label={submitButtonLabel ?? submitLabel} tone="white" /> : submitLabel}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-[#A1A1AA]">
        {footerText}{' '}
        <Link className="font-semibold text-[#A855F7] transition hover:text-[#C084FC]" to={footerLink}>
          {footerLabel}
        </Link>
      </p>
    </div>
  )
}
