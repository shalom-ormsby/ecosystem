"use client";
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "../../lib/utils"

const Avatar = (
    {
        ref,
        className,
        ...props
    }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
        ref?: React.Ref<React.ElementRef<typeof AvatarPrimitive.Root>>;
    }
) => (<AvatarPrimitive.Root
    ref={ref}
    className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
    )}
    {...props}
/>)

const AvatarImage = (
    {
        ref,
        className,
        ...props
    }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
        ref?: React.Ref<React.ElementRef<typeof AvatarPrimitive.Image>>;
    }
) => (<AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
/>)

const AvatarFallback = (
    {
        ref,
        className,
        ...props
    }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
        ref?: React.Ref<React.ElementRef<typeof AvatarPrimitive.Fallback>>;
    }
) => (<AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium",
        className
    )}
    {...props}
/>)

export { Avatar, AvatarImage, AvatarFallback }
