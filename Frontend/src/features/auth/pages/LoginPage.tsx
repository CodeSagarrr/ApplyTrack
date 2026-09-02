import { Lock, Mail } from 'lucide-react'
import { AuthCard, AuthField } from '../components/AuthCard'
import { AuthLayout } from '../components/AuthLayout'
import { useState } from 'react'
import type { LoginProps } from '../../../types/ApiTypes';
import { useLogin } from '../../../hooks/auth/useAuth';
import toast from 'react-hot-toast';
import type { AxiosError } from "axios"

export function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const Mutation = useLogin();

  const formHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitFormData = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!formData.password || !formData.email) return
    const payLoad: LoginProps = {
      email: formData.email,
      password: formData.password
    }

    Mutation.mutate(payLoad, {
      onSuccess() {
        toast.success("Login successful. Welcome back.");
        setFormData({
          email: "",
          password: ""
        });
        navigation.navigate("/")
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(axiosError.response?.data?.message || "Login failed. Please check your credentials and try again.");
      }
    })
  }

  return (
    <AuthLayout
      eyebrow="AI career workspace"
      title="Welcome back to your search command center."
      subtitle="Review your pipeline, resume scores, and upcoming interviews from one focused ATS workspace."
    >
      <AuthCard
        title="Log in to your account"
        submitLabel="Log in"
        footerText="New to ApplyTrack?"
        footerLink="/register"
        footerLabel="Create account"
        submitButtonLabel="Signing in"
        submitFormData={submitFormData}
        isPending={Mutation.isPending}
        logintext='signin_with'
      >
        <div className="space-y-4">
          <AuthField
            icon={Mail}
            label="Email address"
            name="email"
            placeholder="name@company.com"
            type="email"
            autoComplete="email"
            handleChangeValue={formHandleChange}
          />
          <AuthField
            icon={Lock}
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
            autoComplete="current-password"
            handleChangeValue={formHandleChange}
          />
          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="inline-flex items-center gap-2 text-[#A1A1AA]">
              <input className="h-4 w-4 rounded border-[#27272A] accent-[#6366F1]" type="checkbox" />
              Remember me
            </label>
            <a className="font-semibold text-[#A855F7] transition hover:text-[#C084FC]" href="/">
              Forgot password?
            </a>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
