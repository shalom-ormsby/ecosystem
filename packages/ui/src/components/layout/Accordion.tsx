"use client";
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = (
  {
    ref,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    ref?: React.Ref<React.ElementRef<typeof AccordionPrimitive.Item>>;
  }
) => (<AccordionPrimitive.Item
  ref={ref}
  className={cn("border-b last:border-b-0", className)}
  {...props}
/>)

const AccordionTrigger = (
  {
    ref,
    className,
    children,
    ...props
  }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    ref?: React.Ref<React.ElementRef<typeof AccordionPrimitive.Trigger>>;
  }
) => (<AccordionPrimitive.Header className="flex">
  <AccordionPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium hover:underline outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="pointer-events-none h-4 w-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" />
  </AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>)

const AccordionContent = (
  {
    ref,
    className,
    children,
    ...props
  }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
    ref?: React.Ref<React.ElementRef<typeof AccordionPrimitive.Content>>;
  }
) => (<AccordionPrimitive.Content
  ref={ref}
  className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
  {...props}
>
  <div className={cn("pb-4 pt-0", className)}>{children}</div>
</AccordionPrimitive.Content>)

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
