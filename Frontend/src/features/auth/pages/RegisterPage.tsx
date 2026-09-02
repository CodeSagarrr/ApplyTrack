import { Lock, Mail, User } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthCard, AuthField } from '../components/AuthCard'
import { AuthLayout } from '../components/AuthLayout'
import type { RegisterProps } from "../../../types/ApiTypes"
import { useRegister } from "../../../hooks/auth/useAuth"
import toast from 'react-hot-toast'
import type { AxiosError } from 'axios'

export function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const Mutation = useRegister();

  const handleChangeFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const submitFormData = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!formData.password || !formData.email) return

    const payLoad: RegisterProps = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    }
    Mutation.mutate(payLoad , {
      onSuccess() {
        toast.success("Account created successfully. Please log in.")
        setFormData({
          name : "",
          email : "",
          password :""
        })
      },
      onError(error) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(axiosError.response?.data?.message || "Unable to create account. Please try again.");
      }
    });
  }

  return (
    <AuthLayout
      eyebrow="Career success powered by AI"
      title="Your next career move starts here."
      subtitle="ApplyTrack helps professionals organize, score, and optimize every job application with precision."
    >
      <AuthCard
        title="Create your account"
        submitLabel="Sign up"
        footerText="Already have an account?"
        footerLink="/login"
        footerLabel="Log in"
        submitButtonLabel="Creating account"
        submitFormData={submitFormData}
        isPending = {Mutation.isPending}
        logintext='signup_with'
      >
        <div className="space-y-4">
          <AuthField
            icon={User}
            label="Full name"
            name="name"
            placeholder="John Doe"
            type="text"
            autoComplete="name"
            handleChangeValue={handleChangeFormData}
          />
          <AuthField
            icon={Mail}
            label="Email address"
            name="email"
            placeholder="name@company.com"
            type="email"
            autoComplete="email"
            handleChangeValue={handleChangeFormData}
          />
          <AuthField
            icon={Lock}
            label="Password"
            name="password"
            placeholder="Create a password"
            type="password"
            autoComplete="new-password"
            handleChangeValue={handleChangeFormData}
          />
          <label className="flex items-start gap-3 text-sm leading-6 text-[#A1A1AA]">
            <input className="mt-1 h-4 w-4 rounded border-[#27272A] accent-[#6366F1]" type="checkbox" />
            <span>
              I agree to the{' '}
              <Link className="font-semibold text-[#A855F7] transition hover:text-[#C084FC]" to="/">
                Terms
              </Link>{' '}
              and{' '}
              <Link className="font-semibold text-[#A855F7] transition hover:text-[#C084FC]" to="/">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
