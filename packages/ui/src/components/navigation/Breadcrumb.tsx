import * as React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "../../lib/utils"

const Breadcrumb = (
  {
    ref,
    ...props
  }: React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  } & {
    ref?: React.Ref<HTMLElement>;
  }
) => <nav ref={ref} aria-label="breadcrumb" {...props} />

const BreadcrumbList = (
  {
    ref,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"ol"> & {
    ref?: React.Ref<HTMLOListElement>;
  }
) => (<ol
  ref={ref}
  className={cn(
    "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
    className
  )}
  {...props}
/>)

const BreadcrumbItem = (
  {
    ref,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"li"> & {
    ref?: React.Ref<HTMLLIElement>;
  }
) => (<li
  ref={ref}
  className={cn("inline-flex items-center gap-1.5", className)}
  {...props}
/>)

const BreadcrumbLink = (
  {
    ref,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  } & {
    ref?: React.Ref<HTMLAnchorElement>;
  }
) => (<a
  ref={ref}
  className={cn("transition-colors hover:text-foreground", className)}
  {...props}
/>)

const BreadcrumbPage = (
  {
    ref,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"span"> & {
    ref?: React.Ref<HTMLSpanElement>;
  }
) => (<span
  ref={ref}
  aria-current="page"
  className={cn("font-normal text-foreground", className)}
  {...props}
/>)

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
