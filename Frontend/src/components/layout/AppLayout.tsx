import { useState } from "react";
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  FileSearch,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { getUser } from "../../hooks/profile/useProfile";
import { useLogout } from "../../hooks/auth/useAuth";
import { toast } from "react-hot-toast/headless";

const navigationItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Applications", to: "/applications", icon: BriefcaseBusiness },
  { label: "Resumes", to: "/resumes", icon: FileSearch },
  { label: "Match Tool", to: "/match-tool", icon: Sparkles },
  { label: "Profile", to: "/profile/create", icon: UserRound },
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="flex min-w-0 items-center gap-3" to="/">
      <img src="/favicon.png" alt="ApplyTrack logo" className={`h-10 w-10 ${compact ? "hidden" : "block"}`} />
      {!compact ? (
        <span className="min-w-0">
          <span className="block truncate font-heading text-sm font-semibold bg-applytrack-surface">ApplyTrack</span>
          <span className="block truncate text-xs text-[#77768A]">Applicant workspace</span>
        </span>
      ) : null}
    </Link>
  );
}

function Navigation({ collapsed = false, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  return (
    <nav className="grid gap-1">
      {navigationItems.map((item) => (
        <NavLink
          className={({ isActive }) =>
            [
              "group relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition",
              collapsed ? "justify-center" : "",
              isActive ? "bg-[#F5F4FF] text-applytrack-primary" : "text-[#646378] hover:bg-applytrack-surface",
            ].join(" ")
          }
          key={item.to}
          onClick={onNavigate}
          title={collapsed ? item.label : undefined}
          to={item.to}
        >
          <item.icon className="h-4.5 w-4.5 shrink-0" />
          {!collapsed ? <span className="truncate">{item.label}</span> : null}
        </NavLink>
      ))}
    </nav>
  );
}

type CurrentUser = {
  _id: string;
  name?: string;
  email?: string;
  profileImage?: string;
  createdAt?: string;
  planTier?: string;
};

function getUserInitial(user?: CurrentUser) {
  return (user?.email?.trim().charAt(0) || user?.name?.trim().charAt(0) || "U").toUpperCase();
}

function ProfileAvatar({ user, size = "md" }: { user?: CurrentUser; size?: "md" | "lg" }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = user?.profileImage?.trim();
  const dimensions = size === "lg" ? "h-16 w-16 text-xl" : "h-10 w-10 text-sm";

  if (imageUrl && !imageFailed) {
    return (
      <img
        alt={user?.name ? `${user.name} profile` : "User profile"}
        className={`${dimensions} shrink-0 rounded-full border border-[#E1E3EC] object-cover`}
        onError={() => setImageFailed(true)}
        src={imageUrl}
      />
    );
  }

  return (
    <span className={`${dimensions} grid shrink-0 place-items-center rounded-full bg-applytrack-primary font-semibold text-white shadow-sm`}>
      {getUserInitial(user)}
    </span>
  );
}

function SidebarUserButton({ collapsed = false, user, onClick }: { collapsed?: boolean; user?: CurrentUser; onClick: () => void }) {
  const displayName = user?.name?.trim() || "User";
  const displayEmail = user?.email?.trim() || "No email";

  return (
    <button
      className={[
        "flex w-full items-center gap-2 rounded-lg border border-[#E1E3EC] bg-white p-3 text-left transition hover:border-applytrack-outline hover:bg-applytrack-surface",
        collapsed ? "justify-center p-2" : "",
      ].join(" ")}
      onClick={onClick}
      title={collapsed ? displayName : undefined}
      type="button"
    >
      <ProfileAvatar user={user} />
      {!collapsed ? (
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold bg-applytrack-surface">{displayName}</span>
          <span className="mt-0.5 block truncate text-xs text-[#77768A]">{displayEmail}</span>
        </span>
      ) : null}
    </button>
  );
}

function SidebarFooter({
  collapsed = false,
  user,
  onUserClick,
}: {
  collapsed?: boolean;
  user?: CurrentUser;
  onUserClick: () => void;
}) {
  return (
    <div className="border-t border-[#EEF0F5] p-3">
      <div className="space-y-3">
        <SidebarUserButton collapsed={collapsed} onClick={onUserClick} user={user} />
        <div className={`rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3 ${collapsed ? "grid place-items-center" : ""}`}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-applytrack-primary shadow-sm">
            <Sparkles className="h-4 w-4" />
          </span>
          {!collapsed ? (
            <div className="mt-3">
              <p className="text-xs font-semibold bg-applytrack-surface">ATS readiness</p>
              <p className="mt-1 text-xs leading-5 text-[#77768A]">Keep resumes tuned before every application.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function UserProfileModal({ user, onClose }: { user?: CurrentUser; onClose: () => void }) {
  const logoutMutation = useLogout();
  const displayName = user?.name?.trim() || "User";
  const displayEmail = user?.email?.trim() || "No email available";

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully");
        window.location.href = "/login";
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-applytrack-ink/35 px-4 py-6 backdrop-blur-sm">
      <button aria-label="Close user profile modal" className="absolute inset-0" onClick={onClose} type="button" />
      <section
        aria-modal="true"
        className="relative w-full max-w-sm rounded-lg border border-[#E1E3EC] bg-white p-5 shadow-2xl shadow-applytrack-ink/15"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <ProfileAvatar size="lg" user={user} />
            <div className="min-w-0">
              <h2 className="truncate font-heading text-lg font-semibold">{displayName}</h2>
              <p className="mt-1 truncate text-sm text-[#646378]">{user?.planTier ? `${user.planTier} plan` : "Account profile"}</p>
            </div>
          </div>
          <button
            aria-label="Close user profile"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#E1E3EC] text-[#646378] transition hover:border-applytrack-outline hover:text-applytrack-primary"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 rounded-lg border border-[#E1E3EC] bg-[#FAFBFF] p-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-applytrack-primary shadow-sm">
              <Mail className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase text-[#77768A]">Email</p>
              <p className="mt-1 truncate text-sm font-semibold bg-applytrack-surface">{displayEmail}</p>
            </div>
          </div>
        </div>

        <button
          className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#FCA5A5] bg-white px-4 text-sm font-semibold text-[#DC2626] transition hover:bg-[#FEF2F2]"
          type="button"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </section>
    </div>
  );
}

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: userResponse } = getUser();
  const user = userResponse?.data as CurrentUser | undefined;

  return (
    <div className="min-h-svh bg-applytrack-surface font-sans">
      <aside
        className={[
          "fixed inset-y-0 left-0 z-30 hidden border-r border-[#E1E3EC] bg-white transition-[width] duration-300 md:flex md:flex-col",
          collapsed ? "w-20" : "w-64",
        ].join(" ")}
      >
        <div className={`flex h-16 items-center ${collapsed ? "justify-center" : "justify-between"} border-b border-[#EEF0F5] px-4`}>
          <BrandMark compact={collapsed} />
          <button
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="grid h-8 w-8 place-items-center rounded-lg border border-[#E1E3EC] text-[#646378] transition hover:border-applytrack-outline hover:text-applytrack-primary"
            onClick={() => setCollapsed((value) => !value)}
            type="button"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <Navigation collapsed={collapsed} />
        </div>
        <SidebarFooter collapsed={collapsed} onUserClick={() => setProfileOpen(true)} user={user} />
      </aside>

      <div className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#E1E3EC] bg-white px-4 md:hidden">
        <BrandMark />
        <button
          aria-label="Open navigation"
          className="grid h-9 w-9 place-items-center rounded-lg border border-[#E1E3EC] bg-applytrack-ink"
          onClick={() => setDrawerOpen(true)}
          type="button"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button aria-label="Close navigation overlay" className="absolute inset-0 bg-applytrack-ink/30" onClick={() => setDrawerOpen(false)} type="button" />
          <aside className="absolute inset-y-0 left-0 flex w-[min(20rem,86vw)] flex-col border-r border-[#E1E3EC] bg-white shadow-xl">
            <div className="flex h-14 items-center justify-between border-b border-[#EEF0F5] px-4">
              <BrandMark />
              <button
                aria-label="Close navigation"
                className="grid h-9 w-9 place-items-center rounded-lg border border-[#E1E3EC] text-[#646378]"
                onClick={() => setDrawerOpen(false)}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-3 py-4">
              <Navigation onNavigate={() => setDrawerOpen(false)} />
            </div>
            <div className="mt-auto">
              <SidebarFooter
                onUserClick={() => {
                  setDrawerOpen(false);
                  setProfileOpen(true);
                }}
                user={user}
              />
            </div>
          </aside>
        </div>
      ) : null}

      {profileOpen ? <UserProfileModal onClose={() => setProfileOpen(false)} user={user} /> : null}

      <main className={`min-h-svh transition-[padding] duration-300 ${collapsed ? "md:pl-20" : "md:pl-64"}`}>
        <Outlet />
      </main>
    </div>
  );
}
