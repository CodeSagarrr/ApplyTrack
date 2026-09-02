import type { ReactNode } from 'react'
import { ArrowLeft, BarChart3, BriefcaseBusiness, FileText, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import workspaceImage from '../../../assets/auth-workspace.jpg'

type AuthLayoutProps = {
  children: ReactNode
  eyebrow: string
  title: string
  subtitle: string
}

const highlights = [
  {
    icon: BarChart3,
    title: 'Smart analytics',
    description: 'Track applications, interviews, and offer momentum.',
  },
  {
    icon: FileText,
    title: 'Resume match',
    description: 'Tune every resume to the role before you apply.',
  },
]

export function AuthLayout({ children, eyebrow, title, subtitle }: AuthLayoutProps) {
  const navigate = useNavigate()

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/')
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-[#09090B] text-[#FAFAFA]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(250,250,250,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(250,250,250,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="pointer-events-none absolute left-[18%] top-[18%] h-72 w-72 rounded-full bg-[#A855F7]/20 blur-[110px]" />
      <div className="pointer-events-none absolute right-[22%] top-[8%] h-80 w-80 rounded-full bg-[#6366F1]/20 blur-[120px]" />

      <div className="relative grid min-h-svh grid-cols-1 lg:grid-cols-[minmax(320px,0.8fr)_minmax(420px,520px)_minmax(320px,0.82fr)]">
        {/* {Left content} */}
        <section className="flex items-end px-5 py-8 sm:px-8 lg:px-12 lg:py-14">
          <div className="w-full max-w-md">
            <button
              className="mb-10 inline-flex h-11 items-center gap-2 rounded-full border border-[#27272A] bg-[#18181B]/75 px-4 text-sm font-medium text-[#A1A1AA] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#6366F1] hover:text-[#FAFAFA]"
              type="button"
              onClick={goBack}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#27272A] bg-[#18181B]/80 px-3 py-2 text-xs font-semibold text-[#A1A1AA]">
              <Sparkles className="h-4 w-4 text-[#A855F7]" />
              {eyebrow}
            </div>

            <h1 className="font-heading text-4xl font-semibold leading-[1.02] text-[#FAFAFA] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-[#A1A1AA]">{subtitle}</p>

            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {highlights.map(({ icon: Icon, title: cardTitle, description }) => (
                <article
                  className="rounded-[22px] border border-[#27272A] bg-[#18181B]/80 p-5 shadow-2xl shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-[#6366F1]/70"
                  key={cardTitle}
                >
                  <Icon className="h-5 w-5 text-[#6366F1]" />
                  <h2 className="mt-4 text-sm font-semibold text-[#FAFAFA]">{cardTitle}</h2>
                  <p className="mt-1 text-xs leading-5 text-[#A1A1AA]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* {Form card} */}
        <section className="flex flex-col justify-center px-5 py-8 sm:px-8 lg:px-0">
          <div className="mx-auto mb-7 flex flex-col items-center text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#6366F1] shadow-[0_0_48px_rgba(99,102,241,0.45)]">
              <BriefcaseBusiness className="h-7 w-7 text-white" />
            </div>
            <strong className="mt-4 font-heading text-2xl font-semibold">ApplyTrack</strong>
            <span className="mt-1 text-sm text-[#A1A1AA]">Step into your professional future.</span>
          </div>

          {children}
        </section>

        {/* {Right content} */}
        <aside className="hidden min-h-svh overflow-hidden border-l border-[#27272A] lg:block">
          <img
            className="h-full w-full object-cover opacity-90 saturate-90"
            src={workspaceImage}
            alt=""
            loading="eager"
            decoding="async"
          />
        </aside>
      </div>
    </main>
  )
}
