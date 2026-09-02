import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  FileSearch,
  Gauge,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../../assets/auth-workspace.jpg";
import { StatusBadge, SurfaceCard } from "../../../components/ui/PagePrimitives";

const features = [
  { title: "Application pipeline", description: "Track every opportunity from saved role to offer with clear status and next steps.", icon: BriefcaseBusiness },
  { title: "Resume intelligence", description: "Keep resume versions organized around the roles, companies, and keywords that matter.", icon: FileSearch },
  { title: "ATS scoring", description: "Prioritize applications with quick readability, keyword, and role-fit signals.", icon: Gauge },
];

const steps = [
  "Add a role and attach the resume you plan to use.",
  "Review the ATS score and missing keyword opportunities.",
  "Track interviews, follow-ups, and outcomes in one focused workspace.",
];

const testimonials = [
  { quote: "ApplyTrack replaced my spreadsheet and made follow-ups impossible to miss.", name: "Maya R.", role: "Product Designer" },
  { quote: "The ATS score view helped me tune each resume before applying.", name: "Daniel K.", role: "Software Engineer" },
  { quote: "It feels calm, fast, and built for people actively searching.", name: "Ari S.", role: "Data Analyst" },
];

export default function LandingPage() {
  return (
    <main className="min-h-svh bg-white font-sans text-applytrack-ink">
      <nav className="sticky top-0 z-20 border-b border-[#E6E8F0] bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <Link className="flex items-center gap-3" to="/">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-applytrack-primary text-sm font-bold text-white">AT</span>
            <span className="font-heading text-sm font-semibold">ApplyTrack</span>
          </Link>
          <div className="hidden items-center gap-6 text-sm font-medium text-[#646378] md:flex">
            <a className="transition hover:text-applytrack-primary" href="#features">Features</a>
            <a className="transition hover:text-applytrack-primary" href="#workflow">Workflow</a>
            <a className="transition hover:text-applytrack-primary" href="#pricing">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <Link className="hidden h-10 items-center rounded-lg px-3 text-sm font-semibold text-[#646378] transition hover:text-applytrack-primary sm:inline-flex" to="/login">
              Log in
            </Link>
            <Link className="inline-flex h-10 items-center gap-2 rounded-lg bg-applytrack-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#281BA8]" to="/dashboard">
              Open app
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      <section
        className="relative overflow-hidden border-b border-[#E6E8F0] bg-applytrack-surface"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(248,249,255,0.98) 0%, rgba(248,249,255,0.92) 46%, rgba(248,249,255,0.52) 100%), url(${heroImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <StatusBadge tone="purple">Modern ATS workspace</StatusBadge>
            <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-tight text-applytrack-ink sm:text-6xl">
              Run your job search like a focused hiring pipeline.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-applytrack-muted sm:text-lg">
              ApplyTrack helps candidates organize applications, compare ATS readiness, and keep every follow-up visible without the clutter of a generic spreadsheet.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-applytrack-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#281BA8]" to="/dashboard">
                View dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a className="inline-flex h-11 items-center justify-center rounded-lg border border-applytrack-outline bg-white px-5 text-sm font-semibold text-applytrack-primary transition hover:border-applytrack-primary hover:bg-[#F5F4FF]" href="#features">
                Explore features
              </a>
            </div>
          </div>
          <div className="mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
            {["42 applications tracked", "86 average ATS score", "9 follow-ups due"].map((item) => (
              <div className="rounded-lg border border-white/70 bg-white/85 p-4 shadow-sm backdrop-blur" key={item}>
                <p className="text-sm font-semibold text-applytrack-ink">{item}</p>
                <p className="mt-1 text-xs text-[#646378]">Live workspace signal</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="features">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-applytrack-primary">Features</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-applytrack-ink">Everything candidates need to stay precise.</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <SurfaceCard className="p-5" key={feature.title}>
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#F5F4FF] text-applytrack-primary">
                <feature.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#646378]">{feature.description}</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="border-y border-[#E6E8F0] bg-[#FAFBFF]" id="workflow">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold text-applytrack-primary">How it works</p>
            <h2 className="mt-2 font-heading text-3xl font-semibold">A clean workflow from role discovery to offer.</h2>
            <p className="mt-3 text-sm leading-6 text-[#646378]">ApplyTrack keeps the core job-search loop visible, lightweight, and easy to repeat.</p>
          </div>
          <div className="grid gap-3">
            {steps.map((step, index) => (
              <div className="flex gap-4 rounded-lg border border-[#E1E3EC] bg-white p-4" key={step}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-applytrack-primary text-sm font-semibold text-white">{index + 1}</span>
                <p className="pt-1 text-sm leading-6 text-[#343447]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold text-applytrack-primary">ATS showcase</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold">Spot the strongest application before you send it.</h2>
          <p className="mt-3 text-sm leading-6 text-[#646378]">Readable scoring, resume coverage, and role-fit notes help you move quickly while keeping quality high.</p>
          <div className="mt-6 grid gap-3">
            {["Keyword coverage across target roles", "Resume version history per application", "Follow-up reminders tied to status"].map((item) => (
              <div className="flex items-center gap-3 text-sm font-medium text-[#343447]" key={item}>
                <CheckCircle2 className="h-5 w-5 text-applytrack-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <SurfaceCard className="p-5">
          <div className="flex items-center justify-between border-b border-[#EEF0F5] pb-4">
            <div>
              <p className="text-sm font-semibold">Frontend Engineer</p>
              <p className="mt-1 text-xs text-[#77768A]">Stripe · Applied today</p>
            </div>
            <StatusBadge tone="green">ATS 92</StatusBadge>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              ["Keywords", "18/21"],
              ["Readability", "A"],
              ["Role fit", "High"],
            ].map(([label, value]) => (
              <div className="rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-4" key={label}>
                <p className="text-xs font-medium text-[#77768A]">{label}</p>
                <p className="mt-2 font-heading text-xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {["React", "TypeScript", "Design systems"].map((skill, index) => (
              <div className="grid grid-cols-[8rem_1fr] items-center gap-3 text-sm" key={skill}>
                <span className="text-[#646378]">{skill}</span>
                <span className="h-2 overflow-hidden rounded bg-[#EEF0F5]">
                  <span className="block h-full rounded bg-applytrack-primary" style={{ width: `${88 - index * 12}%` }} />
                </span>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section className="border-y border-[#E6E8F0] bg-[#FAFBFF]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <SurfaceCard className="p-5" key={testimonial.name}>
                <BadgeCheck className="h-5 w-5 text-applytrack-primary" />
                <p className="mt-4 text-sm leading-6 text-[#343447]">"{testimonial.quote}"</p>
                <p className="mt-5 text-sm font-semibold">{testimonial.name}</p>
                <p className="mt-1 text-xs text-[#77768A]">{testimonial.role}</p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="pricing">
        <SurfaceCard className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <StatusBadge tone="purple">Pricing preview</StatusBadge>
            <h2 className="mt-4 font-heading text-3xl font-semibold">Start organized, then grow into deeper matching.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#646378]">Free workspace for core tracking, with premium scoring and automation planned for advanced candidates.</p>
          </div>
          <div className="rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-5">
            <p className="text-sm font-semibold">Starter</p>
            <p className="mt-2 font-heading text-3xl font-semibold">$0</p>
            <p className="mt-1 text-sm text-[#646378]">Pipeline tracking and basic ATS views</p>
          </div>
        </SurfaceCard>
      </section>

      <section className="bg-applytrack-ink px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-semibold">Bring calm back to your job search.</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">Open the workspace and start tracking applications with a cleaner system today.</p>
          </div>
          <Link className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-applytrack-primary px-5 text-sm font-semibold text-white transition hover:bg-[#281BA8]" to="/dashboard">
            Go to dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#E6E8F0] bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-[#646378] sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-applytrack-ink">ApplyTrack</p>
          <p>Built for focused candidates and modern application workflows.</p>
        </div>
      </footer>
    </main>
  );
}
