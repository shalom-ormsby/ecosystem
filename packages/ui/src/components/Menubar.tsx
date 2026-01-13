"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "../lib/utils"

const MenubarMenu: typeof MenubarPrimitive.Menu = MenubarPrimitive.Menu
const MenubarGroup: typeof MenubarPrimitive.Group = MenubarPrimitive.Group
const MenubarPortal: typeof MenubarPrimitive.Portal = MenubarPrimitive.Portal
const MenubarSub: typeof MenubarPrimitive.Sub = MenubarPrimitive.Sub
const MenubarRadioGroup: typeof MenubarPrimitive.RadioGroup = MenubarPrimitive.RadioGroup

const Menubar: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> & React.RefAttributes<React.ElementRef<typeof MenubarPrimitive.Root>>
> = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn("flex h-9 items-center space-x-1 rounded-md border bg-background p-1", className)}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> & React.RefAttributes<React.ElementRef<typeof MenubarPrimitive.Trigger>>
> = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn("flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent data-[state=open]:bg-accent", className)}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarContent: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> & React.RefAttributes<React.ElementRef<typeof MenubarPrimitive.Content>>
> = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn("z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", className)}
      {...props}
    />
  </MenubarPrimitive.Portal>
))
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & React.RefAttributes<React.ElementRef<typeof MenubarPrimitive.Item>>
> = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarSeparator: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator> & React.RefAttributes<React.ElementRef<typeof MenubarPrimitive.Separator>>
> = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

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
