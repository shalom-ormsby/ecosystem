"use client";
import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "../../lib/utils"

const MenubarMenu: typeof MenubarPrimitive.Menu = MenubarPrimitive.Menu
const MenubarGroup: typeof MenubarPrimitive.Group = MenubarPrimitive.Group
const MenubarPortal: typeof MenubarPrimitive.Portal = MenubarPrimitive.Portal
const MenubarSub: typeof MenubarPrimitive.Sub = MenubarPrimitive.Sub
const MenubarRadioGroup: typeof MenubarPrimitive.RadioGroup = MenubarPrimitive.RadioGroup

const Menubar = (
  {
    ref,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> & {
    ref?: React.Ref<React.ElementRef<typeof MenubarPrimitive.Root>>;
  }
) => (<MenubarPrimitive.Root
  ref={ref}
  className={cn("flex h-9 items-center space-x-1 rounded-md border bg-background p-1", className)}
  {...props}
/>)

const MenubarTrigger = (
  {
    ref,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> & {
    ref?: React.Ref<React.ElementRef<typeof MenubarPrimitive.Trigger>>;
  }
) => (<MenubarPrimitive.Trigger
  ref={ref}
  className={cn("flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent data-[state=open]:bg-accent", className)}
  {...props}
/>)

const MenubarContent = (
  {
    ref,
    className,
    align = "start",
    alignOffset = -4,
    sideOffset = 8,
    ...props
  }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> & {
    ref?: React.Ref<React.ElementRef<typeof MenubarPrimitive.Content>>;
  }
) => (<MenubarPrimitive.Portal>
  <MenubarPrimitive.Content
    ref={ref}
    align={align}
    alignOffset={alignOffset}
    sideOffset={sideOffset}
    className={cn("z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", className)}
    {...props}
  />
</MenubarPrimitive.Portal>)

const MenubarItem = (
  {
    ref,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    ref?: React.Ref<React.ElementRef<typeof MenubarPrimitive.Item>>;
  }
) => (<MenubarPrimitive.Item
  ref={ref}
  className={cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)}
  {...props}
/>)

const MenubarSeparator = (
  {
    ref,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator> & {
    ref?: React.Ref<React.ElementRef<typeof MenubarPrimitive.Separator>>;
  }
) => (<MenubarPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />)

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
}
MenubarShortcut.displayName = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarGroup,
  MenubarPortal,
  MenubarSub,
  MenubarRadioGroup,
}
