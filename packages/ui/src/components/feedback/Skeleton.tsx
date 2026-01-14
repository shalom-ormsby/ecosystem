import * as React from "react"
import { cn } from "../../lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Variant of the skeleton
   * @default "default"
   */
  variant?: "default" | "circular" | "rectangular" | "text"
  /**
   * Width of the skeleton (CSS value)
   */
  width?: string | number
  /**
   * Height of the skeleton (CSS value)
   */
  height?: string | number
}

function Skeleton({ className, variant = "default", width, height, style, ...props }: SkeletonProps) {
  const variantStyles = {
    default: "rounded-md",
    circular: "rounded-full",
    rectangular: "rounded-none",
    text: "rounded-sm h-4",
  }

  return (
    <div
      className={cn(
        "animate-pulse bg-muted",
        variantStyles[variant],
        className
      )}
      style={{
        width,
        height: variant === "text" ? undefined : height,
        ...style,
      }}
      {...props}
    />
  )
}

export { Skeleton }
