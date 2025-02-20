import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface LoadingStateProps {
  message?: string
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "subtle" | "minimal"
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
}

const variantClasses = {
  default: "bg-muted/50 backdrop-blur-sm",
  subtle: "bg-transparent",
  minimal: "",
}

export function LoadingState({
  message = "Loading...",
  className,
  size = "md",
  variant = "default",
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center p-4 rounded-lg",
        variantClasses[variant],
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className={cn("text-primary", sizeClasses[size])} />
        </motion.div>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-muted-foreground"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}

export function LoadingSpinner({
  className,
  size = "md",
}: {
  className?: string
  size?: "sm" | "md" | "lg"
}) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={className}
    >
      <Loader2 className={cn("text-primary", sizeClasses[size])} />
    </motion.div>
  )
}

export function LoadingDots() {
  return (
    <div className="space-x-1 text-primary">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.2,
          }}
        >
          •
        </motion.span>
      ))}
    </div>
  )
}

export function LoadingBar({
  progress,
  className,
}: {
  progress: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "h-1 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
    >
      <motion.div
        className="h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  )
} 