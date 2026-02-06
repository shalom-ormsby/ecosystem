"use client";
import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

import { cn } from "../../lib/utils"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = (
  {
    ref,
    className,
    children,
    ...props
  }: React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent> & {
    ref?: React.Ref<React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>>;
  }
) => (<CollapsiblePrimitive.CollapsibleContent
  ref={ref}
  className={cn(
    "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
    className
  )}
  {...props}
>
  {children}
</CollapsiblePrimitive.CollapsibleContent>)

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
