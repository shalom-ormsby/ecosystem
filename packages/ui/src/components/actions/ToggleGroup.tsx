"use client";
import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { toggleVariants } from "./Toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

const ToggleGroup = (
  {
    ref,
    className,
    variant,
    size,
    children,
    ...props
  }: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants> & {
    ref?: React.Ref<React.ElementRef<typeof ToggleGroupPrimitive.Root>>;
  }
) => (<ToggleGroupPrimitive.Root
  ref={ref}
  className={cn("flex items-center justify-center gap-1", className)}
  {...props}
>
  <ToggleGroupContext.Provider value={{ variant, size }}>
    {children}
  </ToggleGroupContext.Provider>
</ToggleGroupPrimitive.Root>)

const ToggleGroupItem = (
  {
    ref,
    className,
    children,
    variant,
    size,
    ...props
  }: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants> & {
    ref?: React.Ref<React.ElementRef<typeof ToggleGroupPrimitive.Item>>;
  }
) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
