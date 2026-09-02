type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type SpinnerTone = 'primary' | 'secondary' | 'white'

type LoadingSpinnerProps = {
  size?: SpinnerSize
  label?: string
  tone?: SpinnerTone
  className?: string
  fullScreen?: boolean
  ariaLabel?: string
}

const sizeClasses: Record<SpinnerSize, { container: string; border: string; label: string }> = {
  xs: {
    container: 'h-3.5 w-3.5',
    border: 'border-[2px]',
    label: 'text-[11px]',
  },
  sm: {
    container: 'h-4 w-4',
    border: 'border-[2px]',
    label: 'text-xs',
  },
  md: {
    container: 'h-5 w-5',
    border: 'border-[2px]',
    label: 'text-sm',
  },
  lg: {
    container: 'h-7 w-7',
    border: 'border-[3px]',
    label: 'text-base',
  },
  xl: {
    container: 'h-9 w-9',
    border: 'border-[3px]',
    label: 'text-lg',
  },
}

const toneClasses: Record<SpinnerTone, { base: string; accent: string; ring: string }> = {
  primary: {
    base: 'border-[#27272A]',
    accent: 'border-t-[#6366F1] border-r-[#A855F7]',
    ring: 'shadow-[0_0_14px_rgba(99,102,241,0.24)]',
  },
  secondary: {
    base: 'border-[#27272A]',
    accent: 'border-t-[#A855F7] border-r-[#6366F1]',
    ring: 'shadow-[0_0_14px_rgba(168,85,247,0.24)]',
  },
  white: {
    base: 'border-white/20',
    accent: 'border-t-white border-r-[#C084FC]',
    ring: 'shadow-[0_0_14px_rgba(255,255,255,0.14)]',
  },
}

export function LoadingSpinner({
  size = 'md',
  label,
  tone = 'primary',
  className = '',
  fullScreen = false,
  ariaLabel,
}: LoadingSpinnerProps) {
  const { container, border, label: labelSize } = sizeClasses[size]
  const { base, accent, ring } = toneClasses[tone]

  const spinner = (
    <div
      aria-live="polite"
      aria-label={ariaLabel ?? label ?? 'Loading'}
      className={`inline-flex items-center ${fullScreen ? 'justify-center' : ''} ${className}`}
      role="status"
    >
      <span className={`relative inline-flex items-center justify-center ${container}`}>
        <span
          className={`absolute inset-0 rounded-full ${border} ${base} ${accent} ${ring} animate-spin`}
          aria-hidden="true"
        />
        <span className={`absolute inset-[22%] rounded-full border ${base} bg-[#09090B]/90`} aria-hidden="true" />
        <span
          className={`relative h-[34%] w-[34%] rounded-full bg-linear-to-br from-[#6366F1] via-[#8B5CF6] to-[#A855F7] shadow-[0_0_12px_rgba(99,102,241,0.35)]`}
          aria-hidden="true"
        />
      </span>
      {label ? <span className={`ml-3 font-medium text-[#A1A1AA] ${labelSize}`}>{label}</span> : null}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="flex min-h-55 items-center justify-center rounded-3xl border border-[#27272A] bg-[#18181B]/70 px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur">
        {spinner}
      </div>
    )
  }

  return spinner
}

export function LoadingState({
  label = 'Loading your experience',
  description = 'Preparing the next screen with a polished look.',
  size = 'lg',
  tone = 'primary',
}: {
  label?: string
  description?: string
  size?: SpinnerSize
  tone?: SpinnerTone
}) {
  return (
    <div className="flex min-h-55 flex-col items-center justify-center gap-4 rounded-3xl border border-[#27272A] bg-[#18181B]/70 px-6 py-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur">
      <LoadingSpinner size={size} label={label} tone={tone} />
      <p className="max-w-sm text-sm leading-6 text-[#A1A1AA]">{description}</p>
    </div>
  )
}
